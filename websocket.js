const WebSocket = require('ws');

WebSocket.prototype.write = WebSocket.prototype.send;

class WebSocketRPC extends WebSocket {
  constructor(options){
    const { url } = options;
    super(url);
    Object.assign(this, {
      
    }, options);
    this.on('message', message => {
      console.log(JSON.parse(message));
    });
  }
  send(payload) {
    const str = JSON.stringify(payload);
    return new Promise((resolve, reject) => {
      this.write(str, err => {
        if(err) reject(err);
        // resolve();
      });
    });
  }
}

module.exports = WebSocketRPC;
