#!/usr/bin/env node

import * as program from 'kelp-cli';
import { Aria2 } from '../index.js'
import { name, version } from '../package.json';

const { ARIA2_RPC, ARIA2_TOKEN } = process.env;
const aria2 = new Aria2({
  url: ARIA2_RPC,
  token: ARIA2_TOKEN,
});

const showFiles = files => {
  for (const file of files) {
    console.log('  File:', file.path);
  }
};

program()
  .command('new', async ({ _: [url] }) => {
    const gid = await aria2.addUri(url);
    const files = await aria2.getFiles(gid);
    console.log();
    console.log('Task ID:', gid);
    showFiles(files);
  })
  .command('list', async () => {
    const tasks = await aria2.tellActive();
    for (const task of tasks) {
      console.log();
      console.log('Task ID:', task.gid);
      showFiles(task.files);
    }
  })
  .command('help', () => {
    console.log();
    console.log(`  ${name} v${version}`);
    console.log();
    console.log('  Usage:');
    console.log();
    console.log('    $ aria2c [options]');
    console.log();
    console.log('  Options:');
    console.log();
    console.log('    -h, --help');
    console.log('    -V, --version');
    console.log();
  })
  .parse();