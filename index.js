const JSONRPC = require('./jsonrpc');

/**
 * Aria2
 * https://aria2.github.io/manual/en/html/aria2c.html#rpc-interface
 */
class Aria2 extends JSONRPC {
  constructor(options) {
    super(Object.assign({
      seq: 0
    }, options));
  }
  get id() {
    return this.seq++;
  }
  /**
   * then
   * @param {*} resolve 
   * @param {*} reject 
   */
  then(resolve, reject) {
    const data = this.data;
    this.data = null;
    return this
      .send(data)
      .then(res => {
        if (Array.isArray(res))
          return res.map(r => r.result);
        return res.result;
      }).then(resolve, reject);
  }
  /**
   * call
   * @param {*} method 
   * @param  {...any} params 
   */
  call(method, ...params) {
    const { id, secret } = this;
    // https://aria2.github.io/manual/en/html/aria2c.html#rpc-authorization-secret-token
    secret && params.unshift(`token:${secret}`);
    // omit out undefined value
    params = params.filter(x => x !== void (0));
    const message = { id, method, params };
    this.data = this.data ? // batch request
      [].concat.call([], this.data, message) : message;
    return this;
  }
  /**
   * https://aria2.github.io/manual/en/html/aria2c.html#aria2.addUri
   * @param {*} uris 
   */
  addUri(uris) {
    return this.call('aria2.addUri', uris);
  }
  /**
   * https://aria2.github.io/manual/en/html/aria2c.html#aria2.addTorrent
   */
  addTorrent(torrent) {
    return this.call('aria2.addTorrent', torrent);
  }
  /**
   * https://aria2.github.io/manual/en/html/aria2c.html#aria2.addMetalink
   * @param {*} metalink 
   */
  addMetalink(metalink) {
    return this.call('aria2.addMetalink', metalink);
  }
  /**
   * https://aria2.github.io/manual/en/html/aria2c.html#aria2.remove
   * @param {*} gid 
   */
  remove(gid) {
    return this.call('aria2.remove', gid);
  }
  /**
   * forceRemove
   * @param {*} gid 
   */
  forceRemove(gid) {
    return this.call('aria2.forceRemove', gid);
  }
  /**
   * pause
   * @param {*} gid 
   */
  pause(gid) {
    return this.call('aria2.pause', gid);
  }
  /**
   * pauseAll
   */
  pauseAll() {
    return this.call('aria2.pauseAll');
  }
  /**
   * forcePause
   */
  forcePause() {
    return this.call('aria2.forcePause');
  }
  /**
   * forcePauseAll
   */
  forcePauseAll() {
    return this.call('aria2.forcePauseAll');
  }
  /**
   * unpause
   * @param {*} gid 
   */
  unpause(gid) {
    return this.call('aria2.unpause', gid);
  }
  /**
   * unpauseAll
   */
  unpauseAll() {
    return this.call('aria2.unpauseAll');
  }
  /**
   * https://aria2.github.io/manual/en/html/aria2c.html#aria2.tellStatus
   * @param {*} gid 
   * @param {*} keys 
   */
  tellStatus(gid, keys) {
    return this.call('aria2.tellStatus', gid, keys);
  }
  /**
   * getUris
   * @param {*} gid 
   */
  getUris(gid) {
    return this.call('aria2.getUris', gid);
  }
  /**
   * @docs https://aria2.github.io/manual/en/html/aria2c.html#aria2.getFiles
   * @param {*} gid 
   */
  getFiles(gid) {
    return this.call('aria2.getFiles', gid);
  }
  getPeers(gid) {
    return this.call('aria2.getPeers', gid);
  }
  getServers(gid) {
    return this.call('aria2.getServers', gid);
  }
  tellActive(keys) {
    return this.call('aria2.tellActive', keys);
  }
  tellWaiting(offset, num, keys) {
    return this.call('aria2.tellWaiting', offset, num, keys);
  }
  tellStopped(offset, num, keys) {
    return this.call('aria2.tellStopped', offset, num, keys);
  }
  changePosition(gid, pos, how) {
    return this.call('aria2.changePosition', gid, pos, how);
  }
  /**
   * https://aria2.github.io/manual/en/html/aria2c.html#aria2.changeUri
   */
  changeUri(gid, fileIndex, delUris, addUris, position) {
    return this.call('aria2.changeUri', gid, fileIndex, delUris, addUris, position);
  }
  getOption(gid) {
    return this.call('aria2.getOption', gid);
  }
  changeOption(gid, options) {
    return this.call('aria2.changeOption', gid, options);
  }
  getGlobalOption() {
    return this.call('aria2.getGlobalOption');
  }
  changeGlobalOption(options) {
    return this.call('aria2.changeGlobalOption', options);
  }
  getGlobalStat() {
    return this.call('aria2.getGlobalStat');
  }
  purgeDownloadResult() {
    return this.call('aria2.purgeDownloadResult');
  }
  removeDownloadResult(gid) {
    return this.call('aria2.removeDownloadResult', gid);
  }
  getVersion() {
    return this.call('aria2.getVersion');
  }
  getSessionInfo() {
    return this.call('aria2.getSessionInfo');
  }
  shutdown() {
    return this.call('aria2.shutdown');
  }
  forceShutdown() {
    return this.call('aria2.forceShutdown');
  }
  saveSession() {
    return this.call('aria2.saveSession');
  }
  multicall(methods) {
    // TODO:
  }
  listMethods() {
    return this.call('system.listMethods')
  }
  listNotifications() {
    return this.call('system.listNotifications');
  }
}

module.exports = Aria2;
