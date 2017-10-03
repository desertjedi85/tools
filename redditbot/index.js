'use strict';
const snoowrap = require('snoowrap');

const request = require('request');

var config = require("./config/config.json");


const r = new snoowrap({
    userAgent: 'news-summary bot by /u/desertjedi85 v2.0',
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    username: config.username,
    password: config.password
  });

var bodyParser = require('body-parser');

getPosts();
function getPosts() {
  request.post({
    url:     'http://localhost/tools/redditbot/getSubreddits.php'
    }, function(error, response, body){
      if(!error) {
        // console.log(response.statusCode);
        var subreddits = body.split("\n");
        subreddits.push("all");
        // var subreddits = ["all"];
        subreddits.forEach(function(subreddit) {
          if (subreddit.match("\w+|\d+")) {
            console.log("Retrieving subreddit " + subreddit);
            getNew(subreddit);
            getRising(subreddit);
            getControversial(subreddit);
            getTop(subreddit);
          }
        })
      } else {
        console.log("Error: " + error);
      }
    }
  );
}

function getSubreddits(subreddits) {
  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    // headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url:     'http://localhost/tools/redditbot/getSubreddits.php',
    body:    ""
    }, function(error, response, body){
      if(!error) {
          subreddits = body.split("\n");

          return subreddits;
      } else {
        console.log("Error: " + error);
      } 
    });
}

function getNew(subreddit) {
  r.getNew(subreddit).map(post => post).forEach(function(postId, index) {
    // console.log("\r\n" + subreddit + "\r\n");
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
            if (response.statusCode == 404 || response.statusCode == 503) {
              return;
            }
            var articleSummary = body;

            if (articleSummary.match(/Blacklisted url/) || articleSummary.match(/Already posted/) || articleSummary.match(/Article summary failed/) || articleSummary.match(/Article not found/) || articleSummary.match(/PHP Warning/i) || articleSummary.match(/PHP Fatal/i) || articleSummary.match(/Article length too long/i) || articleSummary.match(/\<\!DOCTYPE/)) {
              console.log("Article not submitted: " + id + ": " + url);
            } else {
              var string = "";
              string += "\r\n";
              string += "###Here is my best summary:";
              string += "\r\n";
              string += "\r\n";
              string += articleSummary;
              // string += "\r\n";
              // string += "\r\n";
              // string += "Powered by **[Search Current Events](http://www.searchcurrentevents.com)** Beep Beep Boop";
  
              // console.log(string);
              // console.log("\r\n");
              // console.log(string + "\r\n");
              // console.log(id + ": " + url + "\r\n");
              r.getSubmission(id).reply(string);
              console.log("Posting article: " + id);
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
            // console.log(response.statusCode);
            if (response.statusCode == 404 || response.statusCode == 503) {
              return;
            }
            var articleSummary = body;

            if (articleSummary.match(/Blacklisted url/) || articleSummary.match(/Already posted/) || articleSummary.match(/Article summary failed/) || articleSummary.match(/Article not found/) || articleSummary.match(/PHP Warning/i) || articleSummary.match(/PHP Fatal/i) || articleSummary.match(/Article length too long/i) || articleSummary.match(/\<\!DOCTYPE/)) {
              console.log("Article not submitted: " + id + ": " + url);
            } else {
              var string = "";
              string += "\r\n";
              string += "###Here is my best summary:";
              string += "\r\n";
              string += "\r\n";
              string += articleSummary;
              // string += "\r\n";
              // string += "\r\n";
              // string += "Powered by **[Search Current Events](http://www.searchcurrentevents.com)** Beep Beep Boop";
  
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
            if (response.statusCode == 404 || response.statusCode == 503) {
              return;
            }
            var articleSummary = body;

            if (articleSummary.match(/Blacklisted url/) || articleSummary.match(/Already posted/) || articleSummary.match(/Article summary failed/) || articleSummary.match(/Article not found/) || articleSummary.match(/PHP Warning/i) || articleSummary.match(/PHP Fatal/i) || articleSummary.match(/Article length too long/i) || articleSummary.match(/\<\!DOCTYPE/)) {
              console.log("Article not submitted: " + id + ": " + url);
            } else {
              var string = "";
              string += "\r\n";
              string += "###Here is my best summary:";
              string += "\r\n";
              string += "\r\n";
              string += articleSummary;
              // string += "\r\n";
              // string += "\r\n";
              // string += "Powered by **[Search Current Events](http://www.searchcurrentevents.com)** Beep Beep Boop";
  
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
            if (response.statusCode == 404 || response.statusCode == 503) {
              return;
            }
            var articleSummary = body;

            if (articleSummary.match(/Blacklisted url/) || articleSummary.match(/Already posted/) || articleSummary.match(/Article summary failed/) || articleSummary.match(/Article not found/) || articleSummary.match(/PHP Warning/i) || articleSummary.match(/PHP Fatal/i) || articleSummary.match(/Article length too long/i) || articleSummary.match(/\<\!DOCTYPE/)) {
              console.log("Article not submitted: " + id + ": " + url);
            } else {
              var string = "";
              string += "\r\n";
              string += "###Here is my best summary:";
              string += "\r\n";
              string += "\r\n";
              string += articleSummary;
              // string += "\r\n";
              // string += "\r\n";
              // string += "Powered by **[Search Current Events](http://www.searchcurrentevents.com)** Beep Beep Boop";
  
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
