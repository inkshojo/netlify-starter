// netlify/functions/comment.js
const http = require('http');
const Waline = require('@waline/vercel');
const serverless = require('serverless-http');

const app = Waline({
  env: 'netlify',

  // 保存前去除隐私信息
  async preSave(comment) {
    try {
      comment.ip = '';
      comment.location = '';
      comment.ua = '';
      return comment;
    } catch (e) {
      console.error('preSave error:', e);
      return comment;
    }
  },
});

module.exports.handler = serverless(http.createServer(app));
