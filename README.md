# Twitter alerts

This project allows you to save and display tweets on an external browser source in real time. Can be used by production streams to display live tweets during an event.

### Example

Insert video

### How to
#### How to run the app
1. `npm install`
2. Start a redis server
3. Start a MySQL server
4. `npm start`
5. Visit `localhost:3000`

#### How to use the app
1. Create an account
2. Setup settings like duration and CSS in `/settings`
3. Add tweets on `/tweets` or `/custom_tweets` with the tweet URL like `https://twitter.com/elonmusk/status/1316454051693895680`.
4. Add the browser source available on the index page into your OBS, streamlab or favorite streaming application.
5. Display tweets by cliking on one or multiple tweets from the `/tweets` or `/custom_tweets` page and then cliking on `Show` on the right sidebar

#### Custom CSS
From the `settings` page, you can add custom CSS. Here's the default CSS.
```
.w3-blue, .w3-hover-blue:hover {
  background-color: #6d636c!important;
}

a {
  color: #ff929b;
}

img.avatar {
  border-radius: 50%;
  width: 50px;
  float: left;
  margin-left: -7px;
  margin-right: 10px;
  margin-top: 7px;
}

p {
  margin-block-end: 10px;
}

p.header {
  margin-top: 12px;
  line-height: 10px;   /* within paragraph */
  margin-bottom: 10px; /* between paragraphs */
}

img.avatar {
  border-radius: 50%;
  width: 50px;
  float: left;
  margin-left: -7px;
  margin-right: 10px;
  margin-top: 7px;
}

img.twitter {
	margin-top: 25px;
	filter: invert(1);
	width: 20px;
}

p.full_name {
  font-size: 20px;
}

p.header {
  margin-top: 15px;
  line-height: 10px;   /* within paragraph */
  margin-bottom: 6px; /* between paragraphs */
}

.content {
  background-color: #39373a!important;
  color: white;
}

.at {
  color: #e6e5e5;
}

p.content {
  margin-top: 10px;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
}

.tweet-div {
  pointer-events: none;
}
```

### Technologies

This works with the help of `socket.io`, the browser source is subscribed to the `tweet` event and simply fire events as soon as they are received.

## Contribute

Feel free to contribute to this project

## License

Released under [GPL-3.0](https://opensource.org/licenses/GPL-3.0)
