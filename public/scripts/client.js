/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){
  $(".error-msg" ).hide();

  const renderTweets = function(tweets) {
    console.log("🚀 ~ file: client.js ~ line 10 ~ renderTweets ~ tweets", tweets)
    // loops through tweets
    $(".postedTweets").empty();
    tweets.forEach(tweet => {
      const $newTweet = createTweetElement(tweet);
      $('.postedTweets').prepend($newTweet);
    });
  }

  const loadTweets = function () {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: 'GET',
      success: function(res) {
      console.log("🚀 ~ file: client.js ~ line 25 ~ loadTweets ~ res", res)
        //$newTweet = createTweetElement(res[res.length -1]);
        //$('.postedTweets').append($newTweet);
        renderTweets(res);
      }
    });
  }

  //loadTweets();


  const createTweetElement = function (obj) { return $(
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

  const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
  };

  $( ".target" ).submit(function( event ) {
    event.preventDefault();
    const target = event.currentTarget;
    console.log($(this).serialize());
    const text = $('#tweet-text').val();
    if($('#tweet-text').val().length < 1){
      $("#error").html("Invalid input").addClass("error-msg").hide(); // chained methods
      if ( $(".error-msg").first().is( ":hidden" ) ) {
        $( ".error-msg" ).slideDown( "slow" );
      } else {
        $(".error-msg" ).hide();
      }
    } else if ($('#tweet-text').val().length > 140){
      $("#error").html("Tweet Cannot be longer than 140 characters").addClass("error-msg").hide(); // chained methods
      if ( $(".error-msg").first().is( ":hidden" ) ) {
        $( ".error-msg" ).slideDown( "slow" );
      } else {
        $(".error-msg" ).hide();
      }
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


