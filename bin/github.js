/* generate the toc for github in readme */
var fs = require('fs-extra');
var cheerio = require('cheerio');
var path = require('path');

fs.readFile('./output/tsmin.html', {encoding: 'utf-8'}, function (err, data) {
  if (err) {return console.log(err);}
  var $ = cheerio.load(data);
  var toc = $.html('#TOC');
  var root = '<div> <h1> Table of Contents </h1> </div>';
  root = $(root).append(toc);

  fs.readFile('readme.tpl.md', 'utf-8', function (mdreadErr, readmeContent) {
    if (mdreadErr) { return console.log(mdreadErr);}
    var readmeWithToc = readmeContent.replace('@toc', root);
    fs.writeFile('readme.md', readmeWithToc, function (mdWriteErr) {
      if (mdWriteErr) { return console.log(mdWriteErr);}
    });
  });

});

console.log('...');
