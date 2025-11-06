const http = require('http');
const { Waline } = require('@waline/vercel');
const serverless = require('serverless-http');

// Waline 配置
const app = Waline({
  env: 'netlify',

  // 保存前清除敏感信息
  async preSave(comment) {
    // 删除 IP、地理位置、UA
    comment.ip = '';
    comment.location = '';
    comment.ua = '';
    return comment;
  },

  // 保存后（可选）
  async postSave(comment) {
    // 保存后你想执行的逻辑（可留空）
  },
});

module.exports.handler = serverless(http.createServer(app));
