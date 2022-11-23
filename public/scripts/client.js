/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {

const createTweetElement = function (tweet) {
  const timeAgo = timeago.format(tweet.created_at - 11 * 1000 * 60 * 60);
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
              <span>${timeAgo}</span>
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

//renderTweets(data);

$('#submit-tweet').submit(function(event) {
  alert("Handler for .submit() called.")

  event.preventDefault();

  if ($(this).serialize() === null) {
    alert("Your tweet is empty.")
  }

  if ($("#counter").val() < 0) {
    alert("Your tweet is too long.")
  }

  else {
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $(this).serialize(),
      success: function(data) {},
    });
    //console.log(data);
  }
  
});

const loadTweets = function () {
  $.ajax({
    type: 'GET',
    url: '/tweets',
    success: function(res) {
      renderTweets(res);
    },
  });
};

loadTweets();

});