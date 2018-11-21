'use strict';

const restc = require('restc');

module.exports = function() {
  return restc.koa2({
    includes: '/data',
    excludes: '/api',
  });
};
