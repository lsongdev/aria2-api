const Aria2 = require('..');

const aria2 = new Aria2({
  secret: 'xxxxxxxxxx',
  url: 'http://lsong.me:6800/jsonrpc',
});

(async () => {
  const res = await aria2
    .getVersion()
    .tellActive()
  // .saveSession()
  // .listMethods()
  // .getFiles()

  console.log(res);
})();