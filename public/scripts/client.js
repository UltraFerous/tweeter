/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets, callback) {
  let tweet = {};
  for (let data in tweets) {
    newTweet = callback(tweets[data]);
    $(newTweet).insertAfter(".tweets");
    // $(".container").prepend(newTweet);
  }
};

const createTweetElement = function(tweetData) {
  let $tweetElement =
    `<article class="tweet">
  <header>
    <div>
      <img src="${tweetData.user.avatars}" alt="profile picture">
      <div>
      ${tweetData.user.name}  
      </div>
    </div>
  ${tweetData.user.handle}  
  </header>
  <div class="tweet-text-data">
  ${tweetData.content.text}  
  </div>
  <footer>
  ${timeago.format(tweetData.created_at, 'en_US')}
    <div>
      <div class="report">
        <i class="fa-solid fa-flag"></i>
      </div>
      <div class="retweet">
        <i class="fa-solid fa-retweet"></i>
      </div>
      <div class="like">
        <i class="fa-solid fa-heart"></i>
      </div>
    </div>
  </footer>
</article>`;
  return $tweetElement;
};

const loadTweets = function() {
  $.ajax({
    type: 'GET',
    url: '/tweets/',
  }).then(function(data) {
    console.log("DATA RECIVED!");
    renderTweets(data, createTweetElement);
  });
};

$(document).ready(function() {
  // --- our code goes here ---
  loadTweets();
  $("form").on("submit", function(event) {
    let outputData = $("form").serialize();
    event.preventDefault();
    if (outputData.length < 146 && outputData.length > 5) {
      $.ajax({
        type: 'POST',
        url: '/tweets/',
        data: outputData,
      }).then((data) => { console.log("GOOD!"); });
    }
    if (outputData.length >= 146) {
      alert("Tweets must be less than 140 characters!");
    }
    if (outputData.length <= 5 || outputData === null || outputData === undefined) {
      alert("Please include text to tweet!");
    }
  });

  $(".report").hover(function() {
    $(this).css('color', '#BC586E');
  }, function() {
    $(this).css('color', '#545149');
  });

  $(".retweet").hover(function() {
    $(this).css('color', '#BC586E');
  }, function() {
    $(this).css('color', '#545149');
  });

  $(".like").hover(function() {
    $(this).css('color', '#BC586E');
  }, function() {
    $(this).css('color', '#545149');
  });
});


