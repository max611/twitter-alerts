$(function () {
	var socket = io();
	$('form').submit(function(e){
	  e.preventDefault(); // prevents page reloading
	  var clicked_btn = $(document.activeElement).attr('name');
	  checked_tweets = $('.tweets:checkbox:checked')
	  tweet_values = []
	  for (index = 0; index < checked_tweets.length; index++) { 
	  	console.log(checked_tweets)
	    tweet_values.push(checked_tweets[index].value)
		}
			console.log(tweet_values)
	    if(clicked_btn == 'show'){
	      socket.emit('tweet_url', tweet_values);
	      $('#sucess-banner').html(`${tweet_values.length} tweets sent to the browser source.`);
	      $("#sucess-banner").fadeIn(1000).delay(3000).fadeOut(1000)
	      tweet_values.forEach((tweet) => {
	      	tweet_id = tweet.split('/').pop()
	      	var checkbox = $(`#tweet-${tweet_id}`);
	      	$(`#${tweet_id}`).css('outline', '')
          $(`.tweet-list-${tweet_id}`).remove();
          checkbox.prop('checked', false);
          closeNav();
	      });
	      return false;
	  } else if (clicked_btn == 'add'){
	  	tweet_url = $('#tweet_url').val();
	  	$.post('/tweets_url/add', {tweet_url: tweet_url}).done(function(response){
			   location.reload();
			});
	  } else{
	  	if(tweet_values.length == 0){
	  		return;
	  	}
	  	$.post('/tweets_url/delete', {tweets: tweet_values}).done(function(response){
			   location.reload();
			});
	  }
	  
	});
});