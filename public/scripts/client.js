/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  // Encoding user's input to deal with cross-site scripting
  const escape = function(input) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(input));
    return div.innerHTML;
  }

  // Adds Tweet inputs to the existing collection of Tweets in the container
  const renderTweets = function(tweets) {

    // Empties elements of tweets container so that Tweets are added only once
    $(".tweets-container").empty();

    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      const tweetElement = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $(".tweets-container").append(tweetElement);
    }
  };
  
  const createTweetElement = function(tweet) {
    return $(`<article class="tweet">
      <header class="tweet-header">
        <div class="tweet-header-user">
          <img src=${tweet.user.avatars} />
          <span>${tweet.user.name}</span>
        </div>
        <span class="tweet-header-handle">${tweet.user.handle}</span>
      </header>
      <p class="tweet-content">${escape(tweet.content.text)}</p>
      <footer class="tweet-footer">
        <p class="tweet-footer-date">${timeago.format(tweet.created_at)}</p>
        <div class="tweet-footer-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`);

    return $tweet;
  }

  const loadTweets = () => {
    $.get("/tweets", (tweets) => {
      renderTweets(tweets.reverse());
    })
  }

  loadTweets();

  $("#tweet-form").submit(function(event) {
    event.preventDefault();



    let inputLength = $(this).find("#tweet-text").val().length;
    if (!inputLength) {
      $(".errorExceedMaximum").hide();
      $(".errorNoTweet").slideDown("slow", function() { 
        $(this).css('display', 'flex');
      });
    }
    else if (inputLength > 140) {
      console.log(inputLength);
      $(".errorNoTweet").hide();
      $(".errorExceedMaximum").slideDown("slow", function() { 
        $(this).css('display', 'flex');
      });

    }
    else {
      let newTweet = $(this).serialize();
      $.post("/tweets", newTweet, (resolve) => {
        $(this).get(0).reset();
        $(this).find(".counter").val(140);
        loadTweets();
      });
    }

  })
})

renderTweets(data);