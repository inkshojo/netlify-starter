const http = require('http');
const Waline = require('@waline/vercel');
const serverless = require('serverless-http');

const app = Waline({
  env: 'netlify',

  preSave(comment) {
    comment.ip = '';
    comment.location = '';
    comment.ua = '';
    return Promise.resolve(comment);
  },

  async postSave(comment) {
  },
});

module.exports.handler = serverless(http.createServer(app));
