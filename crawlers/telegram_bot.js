const TelegramBot = require('node-telegram-bot-api');
const crawlTopThreads = require('./app/simple_reddit_crawler');
const fs = require('fs');

// THE BOT NAME IN TELEGRAM IS IDWallGuilhermeBot
// THE BOT NAME IN TELEGRAM IS IDWallGuilhermeBot
// THE BOT NAME IN TELEGRAM IS IDWallGuilhermeBot
// THE BOT NAME IN TELEGRAM IS IDWallGuilhermeBot
// THE BOT NAME IN TELEGRAM IS IDWallGuilhermeBot


// replace the value below with the Telegram token you receive from @BotFather
const token = '480874552:AAEoWRfECHvTfn-Ic4P9udoHrF0f81fIg6I';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Responds to the desired command
bot.onText(/\/nadaprafazer (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  // Feedback is important
  bot.sendMessage(chatId, 'Vou trabalhar nisso. Só um segundinho!')
  // Does the crawling 
  getDataFromCrawler(chatId, match[1]);
});

function getDataFromCrawler(chatId, parameters) {
  
  let data = crawlTopThreads(parameters).then((data) => {

    if(data.length > 0) {
      // I couldn't/didn't have enough time to use an in-memory stream to create a file to send through the bot
      // So I had to create a temp file, send it and then delete it. All Synchronously (not proud of it)
      const fileName = 'ThreadsBombando.txt';  
      data.forEach(thread => { fs.appendFileSync(fileName, thread.toString() + '\n'); });

      bot.sendMessage(chatId, 'Pronto, aqui estão os resultados: ');
      bot.sendDocument(chatId, fileName);
      fs.unlinkSync(fileName);
      
    } else {
      bot.sendMessage(chatId, 'Não consegui obter informações. Por favor verifique o(s) subreddits.');      
    }
  }).catch((error) => {
    console.log(error);
    bot.sendMessage(chatId, 'Opa, ocorreu um erro no processamento');    
  });; 
}
