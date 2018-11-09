'use strict';

const path = require('path');
const _ = require('xutil');

const databasePath = path.join(process.env.HOME, '.datahub-server');
_.mkdir(databasePath);

module.exports = {
  dialect: 'sqlite',
  storage: process.env.DATAHUB_DATABASE || path.join(databasePath, 'datahub-server.data'),
  logging: false,
  operatorsAliases: false,
  dialectModulePath: require.resolve('sqlite3'),
};
