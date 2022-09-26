## aria2c

[![aria2c](https://img.shields.io/npm/v/aria2c.svg)](https://npmjs.org/aria2c)
[![Build Status](https://travis-ci.org/song940/aria2c.svg?branch=master)](https://travis-ci.org/song940/aria2c)

> Aria2 RPC Library in Node.js

### Installation

```bash
$ npm install aria2c
```

### Example

```js
const Aria2 = require('aria2c');

const aria2 = new Aria2({
  token: 'YOUR-ARIA2-TOKEN',
  url: 'http://192.168.1.1:6800/jsonrpc',
});

(async () => {
  
  const res = await aria2.getVersion()
  console.log(res);

})();

```

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### MIT

This work is licensed under the [MIT license](./LICENSE).

---