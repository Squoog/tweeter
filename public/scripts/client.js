/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const renderTweets = function(tweets) {
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
      <p class="tweet-content">${tweet.content.text}</p>
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
      renderTweets(tweets);
    })
  }

  loadTweets();

  $("#tweet-form").submit(function(event) {
    event.preventDefault();

    let newTweet = $(this).serialize();
    $.post("/tweets", newTweet);
  })
})

renderTweets(data);