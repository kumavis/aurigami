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
  // Add the response to the clients array to receive streaming
  var readStream = this.getAudioReadStream(req)
  if (readStream) {
    // Write the header for a streamed response
    res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Transfer-Encoding': 'chunked',
    })
    readStream.pipe(res)
  } else {
    res.writeHead(404, {
      'Content-Type': 'audio/mpeg',
    })
    res.end('no such file')
  }
}

JukeboxServer.prototype.getAudioReadStream = function(req) {
  var uuid = req.url.slice(1)
  var rootDir = this.opts.rootDir
  var filePath = path.join(rootDir, uuid+'.mp3')
  // ignore requests for missing files
  if (fs.existsSync(filePath)) {
    var readStream = fs.createReadStream(filePath)
    return readStream
  } else {
    return null
  }
}

JukeboxServer.prototype._closeStream = function() {

}