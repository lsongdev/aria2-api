import assert from 'assert'
import { Aria2 } from '../index.js'

const aria2 = new Aria2({
  token: 'xxxxxxxxxx',
  url: 'http://lsong.one:6800/jsonrpc',
});

const test = async (name, fn) => {
  try {
    await fn();
    console.log(("✓ " + name));
  } catch (err) {
    console.error(("✗ " + name));
    throw err;
  }
};

test('aria2#getVersion', async () => {
  const { version, enabledFeatures } = await aria2.getVersion();
  assert.ok(version);
  assert.equal(version, '1.36.0');
  assert.ok(Array.isArray(enabledFeatures));
});

test('aria2#listMethod', async () => {
  const methods = await aria2.listMethods();
  assert.ok(Array.isArray(methods));
});

test('aria2#tellActive', async () => {
  const tasks = await aria2.tellActive();
  assert.ok(Array.isArray(tasks));
  const [task] = tasks;
  assert.ok(task.gid);
});


test('aria2#getGlobalStat', async () => {
  const states = await aria2.getGlobalStat();
  assert.equal(typeof states, 'object');
});