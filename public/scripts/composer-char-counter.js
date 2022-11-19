$(document).ready(function() {
  const startCount = $(".counter").val();
  $("#tweet-text").on("input", function() {
    // console.log("hello");
    // console.log(startCount);
    const tweetLength = $(this).val().length;
    const counter = $("output.counter");
    // console.log(startCount - tweetLength);
    let remainingSpace = startCount - tweetLength;
    $(".counter").text(remainingSpace);
    if (remainingSpace < 0) {
      $(".counter").css("color", "red");  
    } else {
      $(".counter").css("color", "");
    }
  })
});
