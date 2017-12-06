let SimpleCrawler = require('./app/simple_reddit_crawler');
let fs = require('fs');

SimpleCrawler('cars;cats;askreddit;worldnews;pics').then((data) => {
  data.forEach(thread => {
    console.log(thread.toString());
  });
});