// remove vendor-prefix
getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia).bind(navigator)
AudioContext = (window.AudioContext || window.webkitAudioContext).bind(window)

var client = new BinaryClient('ws://localhost:5001')

client.on('open', function() {

  console.log('open connection')


  var connection = null
  var isRecording = false

  //
  // initialize audio recording
  //

  if (getUserMedia) {
    getUserMedia({audio:true}, setupSuccess, setupFail.bind('Error capturing audio.'))
  } else {
    setupFail('getUserMedia not supported in this browser.')
  }

  //
  // DOM event listeners
  //

  window.toggleRecording = function() {
    clearConnection()

    if (isRecording) {

      isRecording = false

    } else {

      var parentId = $(event.target).data('parent-id')

      var data = {
        parentId: parentId,
        authorName: 'DJ Bazooka',
      }

      connection = client.createStream(data)
      isRecording = true
    }
  }

  //
  // Private Audio
  //

  function clearConnection() {
    if (connection) {
      connection.end()
      connection = null
    }
  }

  function setupSuccess(event) {
    console.log('setup great success')

    var audioContext = new AudioContext()

    // the sample rate is in audioContext.sampleRate
    var audioInput = audioContext.createMediaStreamSource(event)
    var bufferSize = 2048

    recorder = audioContext.createScriptProcessor(bufferSize, 1, 1)
    recorder.onaudioprocess = nextAudioFrame

    audioInput.connect(recorder)
    recorder.connect(audioContext.destination)
  }

  function setupFail(message) {
    console.error(message)
  }

  function nextAudioFrame(event) {
    // abort if not record or not connected
    if (!isRecording || !connection) return

    console.log('recording')
    // encode audio and send to server
    var left = event.inputBuffer.getChannelData(0)
    connection.write(convertoFloat32ToInt16(left))
  }

})

//
// Utility
//

function convertoFloat32ToInt16(buffer) {
  var l = buffer.length
  var buf = new Int16Array(l)

  while (l--) {
    //convert to 16 bit
    buf[l] = buffer[l]*0xFFFF
  }
  return buf.buffer
}