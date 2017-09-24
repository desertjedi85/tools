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
const r = new snoowrap({
  userAgent: 'news-summary bot by /u/desertjedi85 v1.0',
  clientId: 'L9zd4fc4i0TjBQ',
  clientSecret: '37Ppkq6-oJzxp1pqtwIkhWB-3d4',
  username: 'news-summary',
  password: '**********'
});

// That's the entire setup process, now you can just make requests.

// Submitting a link to a subreddit
// r.getSubreddit('gifs').submitLink({
//   title: 'Mt. Cameramanjaro',
//   url: 'https://i.imgur.com/n5iOc72.gifv'
// });

// Printing a list of the titles on the front page
// r.g

r.getRising('news').map(post => post).forEach(function(postId, index) {
    var id = postId.id;
    var url = postId.url;

    request.post({
        // headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'getSummary.php',
        body:    "url=" + url
      }, function(error, response, body){
        console.log(body);
      });
});
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
