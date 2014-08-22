var MicrophoneServer = require('./microphone.js')


var mic = new MicrophoneServer({
  port: 5001,
  rootDir: 'audio',
})

mic.on('new_recording', function(data) {
  console.log('new_recording:', data)
})