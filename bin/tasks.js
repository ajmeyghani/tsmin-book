/*
* generate package json tasks section
*/
var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs-extra');
var filewalker = require('filewalker');
var async = require('async');
var config = require('../config');

fs.readFile('package.tpl.json', 'utf-8', function (readErr, packageContent) {
  packageContent = packageContent.replace(/@name/g, config.name)
  .replace(/@input/g, config.input)
  .replace(/@out/g, config.output);
  fs.writeFile('package.json', packageContent, function (writeErr) {
    if (writeErr) { return console.log(writeErr);}
  });
});
