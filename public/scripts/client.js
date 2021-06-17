/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){
  //hide the error message when the doc is loaded 
  $(".error-msg" ).hide();

  //render tweets function 
  const renderTweets = function(tweets) {
    // empty the array
    $(".postedTweets").empty();
    // loops through tweets
    tweets.forEach(tweet => {
      //call createTweetElement on the looped tweet
      const $newTweet = createTweetElement(tweet);
      //prepent the tweet to the posted tweets html section 
      $('.postedTweets').prepend($newTweet);
    });
  }

  //loadTweets function 
  const loadTweets = function () {
    //ajax get request
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: 'GET',
      success: function(res) {
        //on sucessful get request render the tweets
        renderTweets(res);
      }
    });
  }
  //load the tweets to the page 
  loadTweets();

  //createTweetElemnt function 
  const createTweetElement = function (obj) { 
  //return the html format with string literals to obtain info from the submitted form object 
    
    return $(
    `
    <article id= "art" class= "t1">
      <header class = "tweethead">
        <div class = "profile">
          <div class= "info">
            <img src = ${obj.user.avatars} />
            <p> ${obj.user.name} </p>
          </div>
            <p> ${obj.user.handle} </p>
        </div>
      </header>
      <p class = "tweet">${escape(obj.content.text)}</p>
      <div class = "floor">
        <p id = "time">${timeago.format(obj.created_at)}</p>
        <div class = "icons">
          <div class = "i1">
            <i class="fas fa-flag"></i>
          </div>
          <div class = "i2">
            <i class="fas fa-retweet"></i>
          </div>
          <div class = "i3">
            <i class="fas fa-heart"></i>
          </div>
        </div>
      </div>

    </article> 
    <br/>


  `
  )}
  
  //escape function to ensure that the input is safe from running script
  // taken from compass 
  const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
  };

  //Stretch when the arrow button below write a tweet is clicked then the form will be displayed 
  $(".target").hide();
  $('.arrow').click(function (){
    if ( $(".target").first().is( ":hidden" ) ) {
      $( ".target" ).slideDown( "slow" );
    }
  })

  //handler for the tweet Submission 
  $( ".target" ).submit(function( event ) {
    //prevent the page from being reloaded 
    event.preventDefault();
    //check if the length of the tweet is 0 
    if($('#tweet-text').val().length < 1){
      //create html element in the error id section
      $("#error").html("Invalid input").addClass("error-msg").hide();
      //if the error message is hidden then show with a slide animation 
      if ( $(".error-msg").first().is( ":hidden" ) ) {
        $( ".error-msg" ).slideDown( "slow" );
      //if the message is not hidden then hide it 
      } else {
        $(".error-msg" ).hide();
      }
    // next check if the tweet length is greater that 140 chars
    } else if ($('#tweet-text').val().length > 140){
      //if so do same error handling as the first case 
      $("#error").html("Too Many Characters").addClass("error-msg").hide(); // chained methods
      if ( $(".error-msg").first().is( ":hidden" ) ) {
        $( ".error-msg" ).slideDown( "slow" );
      } else {
        $(".error-msg" ).hide();
      }
    //there are no errors in the tweet then post the serialized event to /tweets and load the tweet
    } else {
      $(".error-msg" ).hide();
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(),
      })
      .then (() => {
        this.reset();
        loadTweets();
      })
    }

  });

});


