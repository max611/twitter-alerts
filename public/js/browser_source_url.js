async function enable_socket(settings) {
	var socket = io();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const room = urlParams.get('room')

  socket.on(`tweetUrl-${room}`, function(tweets){
  	for (const tweet of tweets) {
  		$("#tweet").fadeOut(1000, function() {
  			$(`#tweet-text`).html( "");
        $(`#tweet-author`).html( "");
			  $.ajax({
          url: "https://publish.twitter.com/oembed?url=" + tweet,
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
            $(`#tweet-text`).html(text);
            $(`#tweet-author`).html(author.replace(`(${at})`,''));
            $(`#tweet-at`).html(at);
            $(`#tweet-img`).attr("src", image);
          }
        });
			}).fadeIn(settings.fade_in).delay(settings.delay).fadeOut(settings.fade_out).delay(1000);
    };
  });
}