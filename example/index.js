const Aria2 = require('..');

const aria2 = new Aria2({
  secret: 'xxxxxxxxxx',
  url: 'http://192.168.88.100:6800/jsonrpc',
});

aria2.on('open', async () => {

  console.log('client opened');

  const res = await aria2
    .getVersion()
    // .tellActive()
    // .saveSession()
    // .listMethods()
    // .getFiles()

    console.log(res);

});