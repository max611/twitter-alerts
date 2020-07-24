$(function () {
	var socket = io();
	$('form').submit(function(e){
	  e.preventDefault(); // prevents page reloading
	  var clicked_btn = $(document.activeElement).attr('name');
	  checked_tweets = $('.tweets:checkbox:checked')
	  tweet_values = []
	  for (index = 0; index < checked_tweets.length; index++) { 
	    tweet_values.push(checked_tweets[index].value)
		}
	    if(clicked_btn == 'show'){
	      socket.emit('sendTweet', {room: window.user, tweets: tweet_values});
	      $('#sucess-banner').html(`${tweet_values.length} tweets sent to the browser source.`);
	      $("#sucess-banner").fadeIn(1000).delay(3000).fadeOut(1000)
	      tweet_values.forEach((tweet_id) => {
	      	var checkbox = $(`#tweet-${tweet_id}`);
	      	$(`#${tweet_id}`).css('outline', '')
          $(`.tweet-list-${tweet_id}`).remove();
          checkbox.prop('checked', false);
          closeNav();
	      });
	      return false;
	  } else if (clicked_btn == 'add'){
	  	tweet_url = $('#tweet_url').val();
	  	$.post('/tweets/add', {tweet_url: tweet_url}).done(function(response){
			   location.reload();
			});
	  } else{
	  	if(tweet_values.length == 0){
	  		return;
	  	}
	  	$.post('/tweets/delete', {tweets: tweet_values}).done(function(response){
			   location.reload();
			});
	  }
	  
	});
});

async function show_tweets(tweets) {
  for (var i = 0; i < tweets.length; i++) {
    var tweet_id = tweets[i].url.split('/').pop();
    twttr.widgets.createTweet(
      tweet_id,
      document.getElementById(tweet_id),
      {
        theme: 'light',
        conversation: 'none',
        cards: 'hidden',
        width: 550,
      }
    );
    $(`#${tweet_id}`).on('click', function(){
      tweet_id = $(this).attr('id')
      var checkbox = $(`#tweet-${tweet_id}`);
      if(!checkbox.prop("checked")){
        $(`#${tweet_id}`).css('outline', '2px solid blue')
        $(".tweet-list").append(`<li class="list-group-item tweet-list-${tweet_id}">tweet id ${tweet_id} </li>`);
        openNav();
        checkbox.prop('checked', true);
      } else {
        $(`#${tweet_id}`).css('outline', '')
        $(`.tweet-list-${tweet_id}`).remove();
        checkbox.prop('checked', false);
        if ( $('#sidebar ul li').length == 0 ) {
          closeNav();
        }
      }
    });
  };
}

function openNav() {
  document.getElementById("sidebar").style.width = "250px";
}

function closeNav() {
  document.getElementById("sidebar").style.width = "0";
}