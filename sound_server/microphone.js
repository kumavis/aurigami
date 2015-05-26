var fs = require('fs')
var path = require('path')
var BinaryServer = require('binaryjs').BinaryServer
var lame = require('lame')
var hat = require('hat')
var extend = require('extend')
var EventEmitter = require('events').EventEmitter

module.exports = MicrophoneServer

/* example opts:
  {
    port: 5001,
    rootDir: 'audio',
  }
*/

function MicrophoneServer(opts) {
  this._initialize(opts)
}

MicrophoneServer.prototype._initialize = function(opts) {
  this.opts = opts
  extend(this, new EventEmitter())

  // setup websocket server
  var recordingPort = opts.port
  var websocketsServer = BinaryServer({port: recordingPort})
  this.websocketsServer = websocketsServer
  websocketsServer.on('connection', this._newConnection.bind(this))

  // console.log('websocketsServer: intialized')
}

MicrophoneServer.prototype._newConnection = function(client) {
  client.on('stream', this._newStream.bind(this))
  // console.log('websocketsServer: new connection')
}

MicrophoneServer.prototype._newStream = function(connection, meta) {
  var uuid = hat()
  var rootDir = this.opts.rootDir

  // setup writestream
  var filePath = path.join(rootDir, uuid+'.mp3')
  var writeStream = fs.createWriteStream(filePath)
  writeStream.on('error', function (err) {
    console.error('writeStream: '+err);
  });

  meta.uuid = uuid
  meta.filename = filePath

  // setup encoder
  encoder = new lame.Encoder({
    // input
    channels: 1,        // 1 channels (mono)
    bitDepth: 16,       // 16-bit samples
    sampleRate: 48000,  // 48,000 Hz sample rate
    // output
    bitRate: 128,
    outSampleRate: 22050,
    mode: lame.MONO,    // STEREO (default), JOINTSTEREO, DUALCHANNEL or MONO
  })

  // wire up the client to the fs
  connection
    .pipe(encoder)
    .pipe(writeStream)

  connection.on('end', this._closeStream.bind(this))

  // announce new recording
  this.emit('new_recording', meta)

  // console.log('websocketsServer: new stream')
  // console.log('websocketsServer - meta:', meta)
}

MicrophoneServer.prototype._closeStream = function() {
  // this.writeStream.end()
}

