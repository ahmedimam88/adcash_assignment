'use strict';

var dbm;
var type;
var seed;
var fs = require('fs')
var path = require('path')
var Promise

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;

};

exports.up = function(db) {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa",__dirname)

  const filePath = path.join(__dirname, 'sqls', '20200407143344-seed-data_up.sql')
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa",filePath)

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err)
      resolve(data);
    })
  })
  .then((data) => {
    return db.runSql(data)
  })
};

exports.down = function(db) {
  const filePath = path.join(__dirname, 'sqls', '20200407143344-seed-data_down.sql')
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err)
      resolve(data);
    })
  })
  .then((data) => {
    return db.runSql(data)
  })
};


exports._meta = {
  "version": 1
};
