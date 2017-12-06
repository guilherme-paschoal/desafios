'use strict'

const request = require('request');
const cheerio = require('cheerio');
const RedditThread = require('./model/reddit_thread');
const redditUrl = 'https://www.reddit.com';
const subRedditUrlPrefix = redditUrl + '/r/';

const topScoreParam = 5000;

let promiseArray = [];

// A Few Informations: 
// - This crawler only scrapes through the first pages of each subreddit passed as a parameter
// - Reddit's default sorting is 'hot' first, so I think it's enough for this simple use case
// - In case a subreddit that doesn't exist is access, reddit doesn't return a 404, making it harder to handle an error, so, in this case we just won't crawl anything

// Filters the DOM body to get each thread link element and puts them into an array
function extractThreadsFromBody(body) {

  let threads = [];
  
  // Make stuff more familiar
  const $ = cheerio.load(body);
  
  // Every thread item in reddit is a div with class "link"
  $('div#siteTable > div.link').filter((index, element) => {
    return $(element).data('score') >= topScoreParam;
  }).each((index, element) => {
    // Creates a new instance of RedditThread class for each filtered item
    threads.push(new RedditThread(
      $(element).data('score'),
      $(element).data('subreddit'),
      $(element).find('p.title > a').text(),
      redditUrl + $(element).data('permalink'),
      $(element).data('url')
    ));
  });

  return threads;
    
}

// Starts the job
const crawlTopThreads = function(subreddits) {

  const subs = subreddits.split(';');

  subs.forEach(item => {

    let promise = new Promise((resolve, reject) => { 
      request(subRedditUrlPrefix + item , function(error, response, body) { 
        resolve(extractThreadsFromBody(body)); 
      });
    });

    promiseArray.push(promise);
  });

  return new Promise((resolve, reject) => {
    Promise.all(promiseArray).then((data) => {
      let result = [];

      data.forEach((subreddit) => {
        subreddit.forEach((thread) => {
          result.push(thread.toString());
        });
      });

      resolve(result);
    }); 
  });
}

module.exports = crawlTopThreads;