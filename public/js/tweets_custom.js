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
	      socket.emit('sendTweetUrl', {room: window.user, tweets: tweet_values});
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
	  	$.post('/tweets_custom/add', {tweet_url: tweet_url}).done(function(response){
			   location.reload();
			});
	  } else{
	  	if(tweet_values.length == 0){
	  		return;
	  	}
	  	$.post('/tweets_custom/delete', {tweets: tweet_values}).done(function(response){
			   location.reload();
			});
	  }
	  
	});
});

async function show_tweets(tweets) {
  let data = "";
  for (var i = 0; i < tweets.length; i++) {
    tweet_url = tweets[i].url
  	tweet = tweet_url.split('/').pop()

    try {
      await $.ajax({
        url: "https://publish.twitter.com/oembed?url=" + tweet_url,
        dataType: "jsonp",
        success: function(data) {
          new_html = data.html.replace(/<script.*?<\/script>/g, '');
          new_html = new_html.replace(/(\<a)(?!.*\<a).*<\/a>/, "");
          new_html = new_html.replace(/<blockquote .*?>/g, '');
  				new_html = new_html.replace(/<\/blockquote>.*?/g, '');
          text = new_html.split('&mdash;')[0]
          text = text.split('pic.twitter')[0]
          author = new_html.split('&mdash;')[1]
          at = author.match(/\(([^)]+)\)/)[1]
          image = `https://res.cloudinary.com/max611/image/twitter_name/${at.substring(1)}.jpg`
          $(`#${tweet}-text`).html(text);
					$(`#${tweet}-author`).html(author.replace(`(${at})`,''));
          $(`#${tweet}-at`).html(at);
          $(`#${tweet}-img`).attr("src", image);
        }
      });
    } catch(err){
      $(`#${tweet}-text`).html();
      $(`#${tweet}-author`).html();
      $(`#${tweet}-at`).html();
    }
    $(`#${tweet}`).on('click', function(){
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