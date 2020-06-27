# Twitter alerts

This is a small project to allow to save and display tweets on an external page for streamers.

### How to run it
1. `npm install`
2. Visit `localhost:3000`

### How it works
Everything is currently saved in Redis.

- You add tweets on `/tweets` with the tweet id, something like `1256226129561686016`
- You visit `admin` and select the tweets that you want to send to the browser source
- `/browser_source` will display the tweets one after one.

This works with the help of `socket.io`, the browser source is subscribed to the `tweet` event and simply fire events as soon as they are received.