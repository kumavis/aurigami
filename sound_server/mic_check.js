//
// This is a demo that shows how to setup the MicrophoneServer
//

var request = require('request')
var MicrophoneServer = require('./microphone.js')


var mic = new MicrophoneServer({
  port: 5001,
  rootDir: 'audio',
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

//
// App Server
//

var express = require('express')

var app = express()
app.use(express.static(__dirname))
app.listen(5003)

