import { HTTPClient }  from './http.js';
/**
 * JSON-RPC
 */
export class JSONRPC extends HTTPClient {
  constructor(options) {
    super(Object.assign({
      jsonrpc: '2.0',
      method: 'post'
    }, options));
  }
  send(payload) {
    const { method, jsonrpc } = this;
    if(Array.isArray(payload)){
      payload = payload.map(x => {
        x.jsonrpc = jsonrpc;
        return x;
      });
    } else {
      payload.jsonrpc = jsonrpc;
    }
    if(/^get$/i.test(method)) {
      if(Array.isArray(payload))
        payload = { params: payload };
      const str = JSON.stringify(payload.params);
      payload.params = Buffer.from(str).toString('base64');
      return this.get(payload);
    }
    return this.post(payload);
  }
}