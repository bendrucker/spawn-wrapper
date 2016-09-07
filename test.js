'use strict'

const test = require('tape')
const spawn = require('child_process').spawn
const path = require('path')
const eos = require('end-of-stream')
const wrap = require('./')

const fixtures = {
  short: path.resolve(__dirname, 'fixtures/short'),
  medium: path.resolve(__dirname, 'fixtures/medium'),
  long: path.resolve(__dirname, 'fixtures/long')
}

test('follower is longer', function (t) {
  t.plan(1)

  const outputs = []
  const push = outputs.push.bind(outputs)

  const leader = spawn('node', [fixtures.short])

  const follower = wrap(leader, [
    'node',
    [fixtures.long]
  ])

  leader.stdout.on('data', push)
  follower.stdout.on('data', push)

  eos(leader, function () {
    t.deepEqual(outputs.map(String).map(trim), [
      '10'
    ])
  })
})

test('leader is slightly longer', function (t) {
  t.plan(1)

  const outputs = []
  const push = outputs.push.bind(outputs)

  const leader = spawn('node', [fixtures.medium])

  const follower = wrap(leader, [
    'node',
    [fixtures.short]
  ])

  leader.stdout.on('data', push)
  follower.stdout.on('data', push)

  eos(leader, function () {
    t.deepEqual(outputs.map(String).map(trim), [
      '10',
      '50'
    ])
  })
})

test('leader is much longer', function (t) {
  t.plan(1)

  const outputs = []
  const push = outputs.push.bind(outputs)

  const leader = spawn('node', [fixtures.long])

  const follower = wrap(leader, [
    'node',
    [fixtures.short]
  ])

  leader.stdout.on('data', push)
  follower.stdout.on('data', push)

  eos(leader, function () {
    t.ok(outputs.length > 5)
  })
})

function trim (string) {
  return string.trim()
}
