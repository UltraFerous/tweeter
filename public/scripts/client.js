/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // --- our code goes here ---
  console.log("READY!");

  $("article").hover(function() {
    $(this).css('box-shadow', '10px 10px 0px #586ebc');
  }, function() {
    $(this).css('box-shadow', '0px 0px 0px #586ebc');
  });

  $(".report").hover(function() {
    $(this).css('color', '#BC586E');
  }, function() {
    $(this).css('color', '#586ebc');
  });

  $(".retweet").hover(function() {
    $(this).css('color', '#BC586E');
  }, function() {
    $(this).css('color', '#586ebc');
  });

  $(".like").hover(function() {
    $(this).css('color', '#BC586E');
  }, function() {
    $(this).css('color', '#586ebc');
  });
});
