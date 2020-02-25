const test = require('./test');
const assert = require('assert');
const Aria2 = require('..');

const aria2 = new Aria2({
  secret: 'xxxxxxxxxx',
  url: 'http://lsong.me:6800/jsonrpc',
});

(async () => {

  await test('aria2#getVersion', async () => {
    const { version, enabledFeatures } = await aria2.getVersion();
    assert.ok(version);
    assert.ok(Array.isArray(enabledFeatures));
  });

  await test('aria2#listMethod', async () => {
    const methods = await aria2.listMethods();
    assert.ok(Array.isArray(methods));
  });

  await test('aria2#tellActive', async () => {
    const tasks = await aria2.tellActive();
    assert.ok(Array.isArray(tasks));
    const [ task ] = tasks;
    assert.ok(task.gid);
  });

})();