# spawn-wrapper [![Build Status](https://travis-ci.org/bendrucker/spawn-wrapper.svg?branch=master)](https://travis-ci.org/bendrucker/spawn-wrapper)

> Spawn a child_process to run while another process is running


## Install

```
$ npm install --save spawn-wrapper
```


## Usage

```js
var spawnWrapper = require('spawn-wrapper')
var child = require('child_process')

var download = child.spawn('curl', ['http://my/file'])

spawnWrapper(download, [
  'say',
  ['-v', 'karen', 'downloading']
])
// #=> say "downloading" until curl finishes
```

## API

#### `spawnWrapper(spawned, args)` -> `object`

Returns `{stdout, stderr}` streams from the spawned wrapper process.

##### spawned

*Required*  
Type: `object`

A spawned child from `child_process.spawn`.

##### args

*Required*  
Type: `array`

Arguments to pass to `child_process.spawn` to create the wrapper process.


## License

MIT © [Ben Drucker](http://bendrucker.me)
