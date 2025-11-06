// netlify/functions/comment.js
const http = require('http');
const Waline = require('@waline/vercel');
const serverless = require('serverless-http');

const app = Waline({
  env: 'netlify',

  // -----------------------------
  // 1. Disable automatic geolocation
  // -----------------------------
  useIPLocation: false,   // prevents location from being computed from IP

  // -----------------------------
  // 2. Clear sensitive fields before saving
  // -----------------------------
  preSave(comment) {
    // Remove IP, UA, location for privacy
    comment.ip = '';
    comment.ua = '';
    comment.location = '';
    // Return a resolved promise to avoid Netlify async issues
    return Promise.resolve(comment);
  },

  // -----------------------------
  // 3. Optional postSave hook
  // -----------------------------
  postSave(comment) {
    // For analytics/logging only if needed
  },
});

module.exports.handler = serverless(http.createServer(app));
