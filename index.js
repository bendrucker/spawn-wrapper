'use strict'

const PassThrough = require('stream').PassThrough
const child = require('child_process')
const eos = require('end-of-stream')

module.exports = spawnWrapper

function spawnWrapper (leader, args) {
  var follower = null
  var ended = false

  var outputs = {
    stdout: new PassThrough(),
    stderr: new PassThrough()
  }

  spawn()

  eos(leader, function () {
    follower.kill()
    ended = true
  })

  return outputs

  function spawn () {
    follower = child.spawn.apply(child, args)

    follower.stdout.on('data', outputs.stdout.write.bind(outputs.stdout))
    follower.stderr.on('data', outputs.stderr.write.bind(outputs.stderr))

    eos(follower, function (err) {
      if (!err && !ended) spawn()
    })
  }
}
