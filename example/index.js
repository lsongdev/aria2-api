const Aria2 = require('..');

const aria2 = new Aria2({
  url: 'http://lsong.me:6800/jsonrpc',
  token: 'xxxxxxxxxx',
});

(async () => {
  const { version, enabledFeatures } = await aria2.getVersion();
  console.log(version, enabledFeatures);

  // .tellActive()
  // .saveSession()
  // .listMethods()
  // .getFiles()

})();