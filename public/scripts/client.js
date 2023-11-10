/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escapeFunc = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function(tweets, callback) {
  let newTweet;
  for (let data in tweets) {
    newTweet = callback(tweets[data]);
    $(newTweet).insertAfter(".tweets");
    attachButtonLogic();
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
  ${escapeFunc(tweetData.content.text)}
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

const attachButtonLogic = function(){
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
}

$(document).ready(function() {
  // --- our code goes here ---
  console.log("Ready!")
  loadTweets();
  $("form").on("submit", function(event) {
    let outputData = $("form").serialize();
    if (outputData.length >= 146) {
      $(".error").text("Error: This tweet is too long!");
      $(".error").animate({height: 'show'});
    }
    if (outputData.length <= 5 || outputData === null || outputData === undefined) {
      $(".error").text("Error: There is no input!");
      $(".error").animate({height: 'show'});
    }
    event.preventDefault();
    if (outputData.length < 146 && outputData.length > 5) {
      $(".error").animate({height: 'hide'})
      $.ajax({
        type: 'POST',
        url: '/tweets/',
        data: outputData,
      }).then((data) => { loadTweets(); console.log("GOOD!"); });
    }
  });
});


