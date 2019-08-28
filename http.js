const http = require('http');
const { URI } = require('url');
const EventEmitter = require('events');

const readStream = stream => {
  const buffer = [];
  return new Promise((resolve, reject) => {
    stream
      .on('error', reject)
      .on('data', chunk => buffer.push(chunk))
      .on('end', () => resolve(Buffer.concat(buffer)))
  });
};

class HTTP extends EventEmitter {
  constructor(options){
    super();
    Object.assign(this, {
      method: 'get'
    }, options);
  }
  request(method, url, payload, headers) {
    return new Promise((resolve, reject) => {
      const req = http.request(url, {
        method,
        headers
      }, resolve);
      req.on('error', reject);
      req.end(payload);
    })
    .then(readStream)
    .then(JSON.parse);
  }
  get(query) {
    const { method, url } = this;
    const u = new URI(url);
    for(const q of query)
      u.searchParams.append(q, query[q]);
    return this.request(method, u);
  }
  post(payload) {
    const { method, url } = this;
    return this.request(method, url, JSON.stringify(payload));
  }
}

module.exports = HTTP;