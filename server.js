var fs = require('fs')
var path = require('path')
var http = require('http')
var express = require('express')
var BinaryServer = require('binaryjs').BinaryServer
var lame = require('lame')
var hat = require('hat')
var ThroughStream = require('through')

//
// Config
//

var appPort = 3700
var recordingPort = 9001
var audioPort = 9002

// Listen on a web port and respond with a chunked response header.
var server = http.createServer(function(req, res){
  console.log('Client connected streaming')
  res.writeHead(200,{
    'Content-Type': 'audio/mpeg',
    'Transfer-Encoding': 'chunked',
  })
  // Add the response to the clients array to receive streaming
  var readStream = randomAudioReadStream()
  // var readStream = endlessRandomStream()
  readStream.pipe(res)
})

function randomAudioReadStream() {
  var files = fs.readdirSync('audio')
  var randomIndex = Math.floor(files.length*Math.random())
  var randomFile = files[randomIndex]
  var filePath = path.join('audio', randomFile)
  var readStream = fs.createReadStream(filePath)
  return readStream
}

function endlessRandomStream() {
  // create a dummy stream
  var throughStream = ThroughStream(function write(data) {
    this.emit('data', data)
  }, function end(data) {
    this.emit('end')
  }, {autoDestroy: false})

  var oldStream;
  function nextStream() {
    // cleanup
    // if (oldStream) oldStream.end()
    // new stream
    var readStream = randomAudioReadStream()
    oldStream = readStream
    readStream.on('end', nextStream)
    readStream.pipe(throughStream)
  }

  nextStream()
  return throughStream
}

server.listen(audioPort, '127.0.0.1')
console.log('Audio server running at http://127.0.0.1:'+audioPort)


//
// Recording Server
//

var app = express()
app.use(express.static(__dirname))
app.listen(appPort)

binaryServer = BinaryServer({port: recordingPort})

binaryServer.on('connection', function(client) {

  console.log('new connection')

  var uuid = hat()
  var filePath = path.join('audio', uuid+'.mp3')
  var writeStream = fs.createWriteStream(filePath)
  // This is here incase any errors occur
  writeStream.on('error', function (err) {
    console.error('writeStream: '+err);
  });

  var encoder = new lame.Encoder({
    // input
    channels: 1,        // 1 channels (mono)
    bitDepth: 16,       // 16-bit samples
    sampleRate: 48000,  // 48,000 Hz sample rate

    // output
    bitRate: 128,
    outSampleRate: 22050,
    mode: lame.MONO,    // STEREO (default), JOINTSTEREO, DUALCHANNEL or MONO
  })

  client.on('stream', function(connection, meta) {
    console.log('new stream')
    console.log('meta:',meta)
    connection
      .pipe(encoder)
      .pipe(writeStream)

    connection.on('end', function() {
      writeStream.end()
    })
  })
})