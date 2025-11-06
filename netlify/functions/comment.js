const http = require('http');
const Waline = require('@waline/vercel');
const serverless = require('serverless-http');

const app = Waline({
  env: 'netlify',
  async postSave(comment) {
    // do what ever you want after save comment
    comment.ip = '';
    comment.location = '';
    comment.ua = '';
    return comment;
  },
});

module.exports.handler = serverless(http.createServer(app));
