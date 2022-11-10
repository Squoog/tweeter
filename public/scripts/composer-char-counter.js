$(document).ready(function() {

  $("#tweet-text").on("input", function(){
    console.log("Egg");

    let inputTweetLength = $(this).val().length;
    let count = 140 - inputTweetLength;

    let counter = $(this).parent().find(".counter")

    if (count < 0) {
      counter.css("color", "#800000")
    }
    else {
      counter.css("color", "#777777");
    }
  })
});