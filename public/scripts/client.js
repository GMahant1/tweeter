/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {


//create html tweet element using tweet
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

//loop through tweets and create a container for each
const renderTweets = function (tweets) {
  $(`.tweet-container`).empty();
  for (tweet of tweets) {
    const $tweetElement = createTweetElement(tweet);
    $(`.tweet-container`).prepend($tweetElement)
  }
}


//ajax post request dependent on logic being fulfilled
$('#submit-tweet').submit(function(event) {
  //alert("Handler for .submit() called.")

  event.preventDefault();

  //clear error message on successful post request
  $("#error-message").slideUp("fast", function () {$(this).remove()});

  //user input 
  const tweetText = $("#tweet-text").val();

  //user input made safe and replaced
  const safeTweet = escape(tweetText);
  $("#tweet-text").val(safeTweet);

  if (safeTweet.length === 0) {
    //alert("Your tweet is empty.")
    displayErr("Your tweet is empty.");
    return;
  }

  if ($("#counter").val() < 0) {
    //alert("Your tweet is too long.")
    displayErr("Your tweet is too long.");
    return;
  }

    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $(this).serialize(),
    }).then(loadTweets);
    //console.log(data);
  

});

//ajax get request 
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

//make user text safe ( no code injections )
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//error element creation
const createErrorElement = function (Message) {
  const $error = 
    $(`<p id="error-message" class="error">
    <i class="fa-solid fa-circle-exclamation"></i>
    ${Message}
    <i class="fa-solid fa-circle-exclamation"></i>
    </p> `)

    return $error;
};

const displayErr = function (Message) {
  const $errorElement = createErrorElement(Message);
  $($errorElement).prependTo("#submit-tweet").hide().slideDown();
  //$("#submit-tweet").prepend($errorElement).hide().slideDown();
};

});