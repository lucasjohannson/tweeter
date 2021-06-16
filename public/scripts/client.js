/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){

//   const data = [
//     {
//       "user": {
//         "name": "Newton",
//         "avatars": "https://i.imgur.com/73hZDYK.png"
//         ,
//         "handle": "@SirIsaac"
//       },
//       "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//       "created_at": 1461116232227
//     },
//     {
//       "user": {
//         "name": "Descartes",
//         "avatars": "https://i.imgur.com/nlhLi3I.png",
//         "handle": "@rd" },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1461113959088
//     }
//   ]

  const renderTweets = function(tweets) {
    // loops through tweets
    for(let i = 0; i < tweets.length; i ++){
      const $newTweet = createTweetElement(tweets[i]);
      $('.new-tweet').append($newTweet); 

    }
  }

  const loadTweets = function () {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: 'GET',
      success: function(res) {
        renderTweets(res);
      }
    });
  }

  loadTweets();


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
      <p class = "tweet">${obj.content.text}</p>
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

  $( ".target" ).submit(function( event ) {
    event.preventDefault();
    //const target = event.currentTarget;
    console.log($(this).serialize());
    console.log($('#tweet-text').val())

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize(),
    })
    .then (() => {
      this.reset();
      loadTweets();
    })

  });

});


