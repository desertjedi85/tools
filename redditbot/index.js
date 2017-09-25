'use strict';
const snoowrap = require('snoowrap');

const request = require('request');
// NOTE: The following examples illustrate how to use snoowrap. However, hardcoding
// credentials directly into your source code is generally a bad idea in practice (especially
// if you're also making your source code public). Instead, it's better to either (a) use a separate
// config file that isn't committed into version control, or (b) use environment variables.

// Create a new snoowrap requester with OAuth credentials.
// For more information on getting credentials, see here: https://github.com/not-an-aardvark/reddit-oauth-helper
// const r = new snoowrap({
//   userAgent: 'put your user-agent string here',
//   clientId: 'put your client id here',
//   clientSecret: 'put your client secret here',
//   refreshToken: 'put your refresh token here'
// });

// Alternatively, just pass in a username and password for script-type apps.
var config = require("./config/config.json");


const r = new snoowrap({
    userAgent: 'news-summary bot by /u/desertjedi85 v1.0',
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    username: config.username,
    password: config.password
  });



// That's the entire setup process, now you can just make requests.

// Submitting a link to a subreddit
// r.getSubreddit('gifs').submitLink({
//   title: 'Mt. Cameramanjaro',
//   url: 'https://i.imgur.com/n5iOc72.gifv'
// });

// Printing a list of the titles on the front page
// r.g
var bodyParser = require('body-parser');
// var subreddits = ["legalnews"];
var subreddits = ["worldevents", "upliftingnews", "truereddit", "funny", "nottheonion", "psychology", "newsbotbot", "autonewspaper", "energy", "environment", "US Politics", "World Politics", "tech", "the_donald", "apandreuters", "livenews", "forgottennews", "legalnews"];
// Subreddits: worldevents, upliftingnews, truereddit, funny, nottheonion, psychology, newsbotbot, energy, environment, US Politics, World Politics, tech, the_donald, apandreuters, livenews, legalnews
// Subreddits banned from: worldnews, businessnews, usanews, news, politics
subreddits.forEach(function(subreddit) {
  getNew(subreddit);
  getRising(subreddit);
  getControversial(subreddit);
  getTop(subreddit);
  // console.log(subreddit);
});
// r.searchSubreddits({query: 'news'}).then(
  // console.log()
    // getNew(subreddit),
    // getRising(subreddit),
    // getControversial(subreddit),
    // getTop(subreddit)
// )

function getNew(subreddit) {
  r.getNew(subreddit).map(post => post).forEach(function(postId, index) {
    console.log("\r\n" + subreddit + "\r\n");
    var id = postId.id;
    var url = postId.url;
    // console.log(url);
    request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        // headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://localhost/tools/redditbot/getSummary.php',
        body:    "url=" + url + "&id=" + id
        }, function(error, response, body){
          if(!error) {
            var articleSummary = body;

            if (articleSummary.match(/Blacklisted url/) || articleSummary.match(/Already posted/) || articleSummary.match(/Article summary failed/) || articleSummary.match(/Article not found/) || articleSummary.match(/PHP Warning/i) || articleSummary.match(/PHP Fatal/i) || articleSummary.match(/Article length too long/i) || articleSummary.match(/\<\!DOCTYPE HTML PUBLIC/)) {
              console.log("Article not submitted: " + id + ": " + url);
            } else {
              var string = "";
              string += "\r\n";
              string += "#Here is my best summary:";
              string += "\r\n";
              string += "\r\n";
              string += articleSummary;
              string += "\r\n";
              string += "\r\n";
              string += "#Powered by [Search Current Events](http://www.searchcurrentevents.com) Beep Beep Boop";
  
              // console.log(string);
              console.log("\r\n");
              console.log(string + "\r\n");
              // console.log(id + ": " + url + "\r\n");
              if (string.match(/Article length too long/ig)) {
                return;
              } else {
                r.getSubmission(id).reply(string);
              }
              
              
            }
          } else {
            console.log("Error: " + error);
          } 
        });
  });
}

function getRising(subreddit) {
  r.getRising(subreddit).map(post => post).forEach(function(postId, index) {
    var id = postId.id;
    var url = postId.url;
    // console.log(url);
    request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        // headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://localhost/tools/redditbot/getSummary.php',
        body:    "url=" + url + "&id=" + id
        }, function(error, response, body){
          if(!error) {
            var articleSummary = body;

            if (articleSummary.match(/Blacklisted url/) || articleSummary.match(/Already posted/) || articleSummary.match(/Article summary failed/) || articleSummary.match(/Article not found/) || articleSummary.match(/PHP Warning/i) || articleSummary.match(/PHP Fatal/i)) {
              console.log("Article not submitted: " + id + ": " + url);
            } else {
              var string = "";
              string += "\r\n";
              string += "#Here is my best summary:";
              string += "\r\n";
              string += "\r\n";
              string += articleSummary;
              string += "\r\n";
              string += "\r\n";
              string += "#Powered by [Search Current Events](http://www.searchcurrentevents.com) Beep Beep Boop";
  
              // console.log(string);
              console.log("\r\n");
              console.log(string + "\r\n");
              // console.log(id + ": " + url + "\r\n");
              r.getSubmission(id).reply(string);
              
            }
          } else {
            console.log("Error: " + error);
          } 
        });
  });
}

function getControversial(subreddit) {
  r.getControversial(subreddit).map(post => post).forEach(function(postId, index) {
    console.log("\r\n" + subreddit + "\r\n");
    var id = postId.id;
    var url = postId.url;
    // console.log(url);
    request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        // headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://localhost/tools/redditbot/getSummary.php',
        body:    "url=" + url + "&id=" + id
        }, function(error, response, body){
          if(!error) {
            var articleSummary = body;

            if (articleSummary.match(/Blacklisted url/) || articleSummary.match(/Already posted/) || articleSummary.match(/Article summary failed/) || articleSummary.match(/Article not found/) || articleSummary.match(/PHP Warning/i) || articleSummary.match(/PHP Fatal/i)) {
              console.log("Article not submitted: " + id + ": " + url);
            } else {
              var string = "";
              string += "\r\n";
              string += "#Here is my best summary:";
              string += "\r\n";
              string += "\r\n";
              string += articleSummary;
              string += "\r\n";
              string += "\r\n";
              string += "#Powered by [Search Current Events](http://www.searchcurrentevents.com) Beep Beep Boop";
  
              // console.log(string);
              console.log("\r\n");
              console.log(string + "\r\n");
              // console.log(id + ": " + url + "\r\n");
              r.getSubmission(id).reply(string);
              
            }
          } else {
            console.log("Error: " + error);
          } 
        });
  });
}

function getTop(subreddit) {
  r.getTop(subreddit).map(post => post).forEach(function(postId, index) {
    console.log("\r\n" + subreddit + "\r\n");
    var id = postId.id;
    var url = postId.url;
    // console.log(url);
    request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        // headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://localhost/tools/redditbot/getSummary.php',
        body:    "url=" + url + "&id=" + id
        }, function(error, response, body){
          if(!error) {
            var articleSummary = body;

            if (articleSummary.match(/Blacklisted url/) || articleSummary.match(/Already posted/) || articleSummary.match(/Article summary failed/) || articleSummary.match(/Article not found/) || articleSummary.match(/PHP Warning/i) || articleSummary.match(/PHP Fatal/i)) {
              console.log("Article not submitted: " + id + ": " + url);
            } else {
              var string = "";
              string += "\r\n";
              string += "#Here is my best summary:";
              string += "\r\n";
              string += "\r\n";
              string += articleSummary;
              string += "\r\n";
              string += "\r\n";
              string += "#Powered by [Search Current Events](http://www.searchcurrentevents.com) Beep Beep Boop";
  
              // console.log(string);
              console.log("\r\n");
              console.log(string + "\r\n");
              // console.log(id + ": " + url + "\r\n");
              r.getSubmission(id).reply(string);
              
            }
          } else {
            console.log("Error: " + error);
          } 
        });
  });
}

// console.log(JSON.stringify(posts));

// r.getRising('news').then({
//     console.log(posts.id);
// });

// Extracting every comment on a thread
// r.getSubmission('4j8p6d').expandReplies({limit: Infinity, depth: Infinity}).then(console.log)

// Automating moderation tasks
// r.getSubreddit('some_subreddit_name').getModqueue({limit: 100}).filter(someRemovalCondition).forEach(flaggedItem => {
//   flaggedItem.remove();
//   flaggedItem.subreddit.banUser(flaggedItem.author);
// });

// Automatically creating a stickied thread for a moderated subreddit
// r.getSubreddit('some_subreddit_name')
//   .submitSelfpost({title: 'Daily thread', text: 'Discuss things here'})
//   .sticky()
//   .distinguish()
//   .approve()
//   .assignFlair({text: 'Daily Thread flair text', css_class: 'daily-thread'})
//   .reply('This is a comment that appears on that daily thread');
  // etc. etc.

// Printing the content of a wiki page
// r.getSubreddit('AskReddit').getWikiPage('bestof').content_md.then(console.log);
