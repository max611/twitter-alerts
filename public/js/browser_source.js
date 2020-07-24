function enable_socket(settings) {
	var socket = io();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const room = urlParams.get('room')

  socket.on(`tweet-${room}`, function(tweets){
  	for (const tweet of tweets) {
  		$("#tweet").fadeOut(1000, function() {
  			$('#tweet').html("");
			  twttr.widgets.createTweet(
				  tweet,
				  document.getElementById('tweet'),
				  {
				    theme: 'light',
	          conversation: 'none',
	          cards: 'hidden',
	          width: 550,
				  }
				);
			}).fadeIn(settings.fade_in).delay(settings.delay).fadeOut(settings.fade_out).delay(1000);
    };
  });
}