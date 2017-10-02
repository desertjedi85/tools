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
    userAgent: 'news-summary bot by /u/desertjedi85 v2.0',
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

getPosts();
function getPosts() {
  request.post({
    // headers: {'content-type' : 'application/x-www-form-urlencoded'},
    // headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url:     'http://localhost/tools/redditbot/getSubreddits.php'
    }, function(error, response, body){
      if(!error) {
        // console.log(response.statusCode);
        var subreddits = body.split("\n");
        subreddits.forEach(function(subreddit) {
          if (subreddit.match("\w+|\w+")) {
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


// function getPosts(subreddit) {
//   getNew(subreddit);
//   getRising(subreddit);
//   getControversial(subreddit);
//   getTop(subreddit);
// }
// var fs = require("fs");
// var content;
// fs.readFile('./includes/subreddits.csv', function read(err, data) {
//     if (err) {
//         throw err;
//     }
//     content = data;
//     console.log(content);
// });
// var subreddits = new Array();
// // const rp = require('request-promise');
// const cheerio = require('cheerio');
// // const options = {
// //   uri: `http://redditlist.com/sfw`,
// //   transform: function (body) {
// //     return cheerio.load(body);
// //   }
// // };
// var url = 'http://redditlist.com/sfw';
// // rp(options)
// //   .then(($) => {
//   request('http://redditlist.com/sfw', (function(subreddits){
//     // console.log(subreddits);
//     return function(error, response, body){
//       if(!error) {
//         $ = cheerio.load(body);
//         console.log($);
//     // console.log($);
//         $('.subreddit-url').each(function(i, elem) {
//           subreddit = $(this).text();
//           subreddits[i] = subreddit;
//           // console.log(subreddit);
//           // console.log($(this).text());
          
          
//           // getPosts(subreddit);
//         });
        
//       } else {
//         console.log("Error: " + err);
//       }
//     };
//     subreddits.forEach(function(subreddit) {
//       getPosts(subreddit);
//     });
//   }));
  // .catch((err) => {
  //   console.log(err);
  // });
  // console.log(subreddits);
  


// getSubreddits(subreddits);
// console.log(subreddits.length);
// subreddits.forEach(function(subreddit) {
//   console.log(subreddit);
// });
// var subreddits = text.split("\n");

// var subreddits = ["sports"];
// var subreddits = ["worldevents", "upliftingnews", "truereddit", "funny", "psychology", "newsbotbot", "autonewspaper", "energy", "environment", "US Politics", "World Politics", "tech", "apandreuters", "livenews", "forgottennews", "legalnews", "sports", "all"];
// var subreddits = ["AskReddit ","politics ","The_Donald ","funny ","nba ","worldnews ","videos ","pics ","news ","todayilearned ","nfl ","soccer ","gaming ","gifs ","leagueoflegends ","aww ","BlackPeopleTwitter ","SquaredCircle ","movies ","DestinyTheGame ","rickandmorty ","dankmemes ","television ","relationships ","me_irl ","Overwatch ","WTF ","AdviceAnimals ","nottheonion ","Jokes ","fantasyfootball ","Showerthoughts ","hockey ","anime ","rupaulsdragrace ","technology ","DotA2 ","mildlyinteresting ","GlobalOffensive ","Games ","CFB ","IAmA ","europe ","Tinder ","hiphopheads ","CringeAnarchy ","freefolk ","NintendoSwitch ","baseball ","interestingasfuck ","CollegeBasketball ","quityourbullshit ","PUBATTLEGROUNDS ","MMA ","OldSchoolCool ","hearthstone ","2007scape ","science ","PrequelMemes ","trashy ","CrappyDesign ","pcmasterrace ","sports ","Rainbow6 ","PoliticalHumor ","de ","gameofthrones ","Ice_Poseidon ","trees ","FireEmblemHeroes ","startrek ","canada ","ProgrammerHumor ","youtubehaiku ","wholesomememes ","BigBrother ","UpliftingNews ","JUSTNOMIL ","iamverysmart ","Android ","conspiracy ","TwoXChromosomes ","Unexpected ","legaladvice ","Futurology ","StarWars ","starterpacks ","food ","TumblrInAction ","wow ","4chan ","ComedyCemetery ","formula1 ","Music ","tumblr ","KotakuInAction ","ukpolitics ","LifeProTips ","LivestreamFail ","Guildwars2 ","PublicFreakout ","photoshopbattles ","facepalm ","oddlysatisfying ","apple ","xboxone ","ATBGE ","australia ","LateStageCapitalism ","cowboys ","SubredditDrama ","bestof ","DIY ","personalfinance ","Competitiveoverwatch ","woahdude ","magicTCG ","cars ","india ","tifu ","oldpeoplefacebook ","therewasanattempt ","StarWarsBattlefront ","memes ","unitedkingdom ","funny ","AskReddit ","todayilearned ","science ","worldnews ","pics ","IAmA ","gaming ","videos ","movies ","aww ","Music ","gifs ","news ","explainlikeimfive ","askscience ","EarthPorn ","books ","television ","LifeProTips ","mildlyinteresting ","space ","Showerthoughts ","DIY ","Jokes ","sports ","gadgets ","tifu ","nottheonion ","InternetIsBeautiful ","photoshopbattles ","food ","history ","Futurology ","Documentaries ","dataisbeautiful ","listentothis ","UpliftingNews ","personalfinance ","GetMotivated ","OldSchoolCool ","philosophy ","Art ","nosleep ","creepy ","WritingPrompts ","TwoXChromosomes ","Fitness ","technology ","WTF ","bestof ","AdviceAnimals ","politics ","atheism ","europe ","interestingasfuck ","woahdude ","gameofthrones ","leagueoflegends ","pcmasterrace ","BlackPeopleTwitter ","reactiongifs ","trees ","Unexpected ","Overwatch ","oddlysatisfying ","Android ","wholesomememes ","programming ","Games ","facepalm ","nba ","4chan ","me_irl ","relationships ","cringepics ","lifehacks ","fffffffuuuuuuuuuuuu ","pokemon ","sex ","tattoos ","comics ","soccer ","Frugal ","pokemongo ","CrappyDesign ","OutOfTheLoop ","malefashionadvice ","StarWars ","buildapc ","YouShouldKnow ","dankmemes ","nfl ","HistoryPorn ","AskHistorians ","rickandmorty ","RoastMe ","loseit ","AnimalsBeingJerks ","FoodPorn ","NatureIsFuckingLit ","Whatcouldgowrong ","cringe ","travel ","PS4 ","baseball ","FiftyFifty ","Eyebleach ","RoomPorn ","hiphopheads ","wheredidthesodago ","mildlyinfuriating ","hearthstone ","anime ","Cooking ","GlobalOffensive ","freebies ","GifRecipes ","xboxone ","Tinder ","HighQualityGifs ","youtubehaiku ","bodyweightfitness ","AnimalsBeingBros ","comicbooks ","FortNiteBR ","SuperMindsofReddit ","subrivals ","TFABAARBI ","AccidentalAnime ","settlethisforme ","HeatSignature ","TheMaquis ","accidentalsurrealism ","ParanormalPSBattles ","FindMeFood ","BigBirdGifs ","waltonchain ","AmItheAsshole ","EvelynnMains ","StarTrekDiscovery ","iamveryrandom ","AmericanVandal ","magnetfishing ","MagicArena ","kybernetwork ","miniSNES ","comedyhomicide ","DestinyFashion ","2healthbars ","AccidentalSlapStick ","antiMLM ","eden ","LostLandsMusicFest ","saiyanpeopletwitter ","SugarPine7 ","Catswithjobs ","iamveryrich ","TheGoodPlace ","KinFoundation ","ABoringDystopia ","TheDeuceHBO ","DivinityOriginalSin ","KemonoFriends ","lgv30 ","rick_and_morty ","angrycatpics ","AdmiralBulldog ","FORTnITE ","kingsman ","IncrediblesMemes ","May2018Bumpers ","TheOrville ","Gross_Gore ","RPClipsGTA ","R6ProLeague ","Whatthefuckgetitoffme ","dontyouknowwhoiam ","Ice_Poseidon2 ","shockwaveporn ","CanadaPublicServants ","ToothAndTail ","azirmains ","600euro ","MadeInAbyss ","mvci ","hentai411 ","Siestakey ","INEEEEDIT ","Destiny_2 ","AreYouTheOne ","onionheadlines ","GeometryIsNeat ","SouthParkPhone ","bingingwithbabish ","perfectlycutscreams ","Superbowl ","electricdaisycarnival ","marijuanaenthusiasts ","tombstoning ","UnethicalLifeProTips ","Thinking ","coaxedintoasnafu ","Emma_Roberts ","LoveNikki ","MoviePassClub ","likeus ","hamptonbrandon ","ExpandDong ","CatastrophicFailure ","NavCoin ","InternetStars ","TbsPeopleofEarth ","conspiracyundone ","Death_By_SnuSnu ","nsfw_showerthoughts ","PinkOmega ","lossedits ","ihavesex ","gay_irl ","Bossfight ","GalaxyNote8 ","AprilBumpers2018 ","TenX ","Alt_Hapa ","AMADisasters ","assholedesign ","destiny2 ","The_Mueller ","CatTaps ","bladerunner ","freefolk ","Memes_Of_The_Dank ","IncelTears ","confusing_perspective ","ArkEcosystem ","raidsecrets ","TapTitans2 ","MUAontheCheap ","Xanaxcartel ","TerraBattle ","Animalsthatlovemagic ","KittenMittens ","WeWantPlates ","ChoosingBeggars ","antimeme ","iOS11 ","Prematurecelebration ","sploot ","Kings_Raid"];
// subreddits.forEach(function(subreddit) {
//   getNew(subreddit);
//   getRising(subreddit);
//   getControversial(subreddit);
//   getTop(subreddit);
//   // console.log(subreddit);
// });


// r.searchSubreddits({query: 'news'}).then(
  // console.log()
    // getNew(subreddit),
    // getRising(subreddit),
    // getControversial(subreddit),
    // getTop(subreddit)
// )

function getSubreddits(subreddits) {
  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    // headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url:     'http://localhost/tools/redditbot/getSubreddits.php',
    body:    ""
    }, function(error, response, body){
      if(!error) {
        
        // var articleSummary = body;

        // if (articleSummary.match(/Blacklisted url/) || articleSummary.match(/Already posted/) || articleSummary.match(/Article summary failed/) || articleSummary.match(/Article not found/) || articleSummary.match(/PHP Warning/i) || articleSummary.match(/PHP Fatal/i) || articleSummary.match(/Article length too long/i)) {
        //   console.log("Article not submitted: " + id + ": " + url);
        // } else {
        //   var string = "";
        //   string += "\r\n";
        //   string += "###Here is my best summary:";
        //   string += "\r\n";
        //   string += "\r\n";
        //   string += articleSummary;
        //   string += "\r\n";
        //   string += "\r\n";
        //   string += "Powered by **[Search Current Events](http://www.searchcurrentevents.com)** Beep Beep Boop";

        //   // console.log(string);
        //   // console.log("\r\n");
        //   // console.log(string + "\r\n");
        //   // console.log(id + ": " + url + "\r\n");
        //   r.getSubmission(id).reply(string);
          
          subreddits = body.split("\n");
          // console.log(subreddits.length);
          // subreddits.forEach(function(subreddit) {
            // if (subreddit.length != "") {
            //   console.log(subreddit);
            // }
          // });
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
            if (response.statusCode == 404) {
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
              string += "\r\n";
              string += "\r\n";
              string += "Powered by **[Search Current Events](http://www.searchcurrentevents.com)** Beep Beep Boop";
  
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
            if (response.statusCode == 404) {
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
              string += "\r\n";
              string += "\r\n";
              string += "Powered by **[Search Current Events](http://www.searchcurrentevents.com)** Beep Beep Boop";
  
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
            if (response.statusCode == 404) {
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
              string += "\r\n";
              string += "\r\n";
              string += "Powered by **[Search Current Events](http://www.searchcurrentevents.com)** Beep Beep Boop";
  
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
            if (response.statusCode == 404) {
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
              string += "\r\n";
              string += "\r\n";
              string += "Powered by **[Search Current Events](http://www.searchcurrentevents.com)** Beep Beep Boop";
  
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
