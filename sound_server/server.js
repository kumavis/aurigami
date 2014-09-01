//
// This is a demo that shows how to setup the MicrophoneServer + JukeboxServer
//

var request = require('request')
var MicrophoneServer = require('./microphone.js')
var JukeboxServer = require('./jukebox.js')


var mic = new MicrophoneServer({
  port: 5001,
  rootDir: '../audio',
})

var jukebox = new JukeboxServer({
  port: 5002,
  rootDir: '../audio',
})

var apiServer = 'http://localhost:5000/posts'

mic.on('new_recording', function(data) {
  console.log('new_recording:', data)

  // tell the api that we have a new recording
  request.post({uri: apiServer, form: {post: data}}, function(err, res, body) {
    console.log(err)
    console.log(body)
  })
})