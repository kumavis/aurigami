var fs = require('fs')
var path = require('path')
var http = require('http')
var extend = require('extend')
var EventEmitter = require('events').EventEmitter

module.exports = JukeboxServer

/* example opts:
  {
    port: 5001,
    rootDir: 'audio',
  }
*/

function JukeboxServer(opts) {
  this._initialize(opts)
}

JukeboxServer.prototype._initialize = function(opts) {
  this.opts = opts
  extend(this, new EventEmitter())

  var port = this.opts.port
  this.server = http.createServer(this._newConnection.bind(this))
  this.server.listen(port, '127.0.0.1')
}

JukeboxServer.prototype._newConnection = function(req, res) {
  console.log('Client connected streaming')
  // Write the header for a streamed response
  res.writeHead(200,{
    'Content-Type': 'audio/mpeg',
    'Transfer-Encoding': 'chunked',
  })
  // Add the response to the clients array to receive streaming
  var readStream = this.getAudioReadStream(req)
  readStream.pipe(res)
}

JukeboxServer.prototype.getAudioReadStream = function(req) {
  console.log('getAudioReadStream:')
  console.dir(req)
  var uuid = '2b267787b5703361050ee787a8d2bbfb'
  var rootDir = this.opts.rootDir
  var filePath = path.join(rootDir, uuid+'.mp3')
  var readStream = fs.createReadStream(filePath)
  return readStream
}

JukeboxServer.prototype._closeStream = function() {

}