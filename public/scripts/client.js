/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = function (tweet) {
  let $tweet = $(`<article class="tweet-article">
            <header class="tweet-header">
              <div>
              <img src=${tweet.user.avatars}>
              <span>${tweet.user.name}</span>
              </div>
              <span class="feed-username">${tweet.user.handle}</span>
            </header>
            <p>
              ${tweet.content.text}            
            </p>  
            <footer class="tweet-footer">
              <span>${tweet.created_at}</span>
              <div>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
              <i class="fa-solid fa-flag"></i>
              </div>
            </footer>  
          </article>`)

          return $tweet;
};


const renderTweets = function (tweets) {
  for (tweet of tweets) {
    const $tweetElement = createTweetElement(tweet);
    $(`.tweet-container`).append($tweetElement)
  }
}

renderTweets(data);

});