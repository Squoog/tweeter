$(document).ready(function() {

  $("#tweet-text").on("input", function(){

    // Tracks the amount of remaining characters
    let inputTweetLength = $(this).val().length;
    let count = 140 - inputTweetLength;

    let counter = $(this).parent().find(".counter")

    // Displays remaining character count
    counter.text("remaining characters: " + count);

    // Changes text colour when user goes beyond the character limit
    if (count < 0) {
      counter.css("color", "#800000")
    }
    else {
      counter.css("color", "#777777");
    }
  })
});
