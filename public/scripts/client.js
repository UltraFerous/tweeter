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
    $(".tweets").prepend(newTweet)
    // $(newTweet).appendChild$(".tweets");
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
    $('.tweets').empty();
    renderTweets(data, createTweetElement);
  });
};

const attachButtonLogic = function() {
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
  $(".tweet").hover(function() {
    $(this).addClass("hoverShadow");
  }, function() {
    $(this).removeClass("hoverShadow");
  });
};

$(document).ready(function() {
  // --- our code goes here ---
  loadTweets();
  $("form").on("submit", function(event) {
    event.preventDefault();
    let outputData = $("form").serialize();
    let tweetLength = event.target.elements[0].value;
    if (tweetLength.length > 140) {
      $(".error").text("Error: This tweet is too long!");
      $(".error").animate({ height: 'show' });
    }
    if (tweetLength.length <= 0 || tweetLength === null || tweetLength === undefined) {
      $(".error").text("Error: There is no input!");
      $(".error").animate({ height: 'show' });
    }
    if (tweetLength.length <= 140 && tweetLength.length > 0) {
      $(".error").animate({ height: 'hide' });
      $.ajax({
        type: 'POST',
        url: '/tweets/',
        data: outputData,
      }).then((data) => { 

        console.log(data);
        loadTweets(); });
    }
  });
});


