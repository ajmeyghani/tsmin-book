var fs = require('fs-extra');
var cheerio = require('cheerio');
var path = require('path');

var divReById = function (id) {
  return new RegExp('<div\\s*id="' + id + '">[\\s\\S]*?</div>', 'igm');
};
var getDiv = function (id, data) {
  return data.match(divReById('header'))[0];
};

fs.readFile('./output/tsmin.html', {encoding: 'utf-8'}, function (err, data) {
  if (err) {return console.log(err);}
  var $ = cheerio.load(data);
  var toc = $.html('#TOC').replace(/<div\s*id="toc">/i, '<div id="TOC" class="l-toc">');
  var header = $.html('#header');
  var bodyContent = $('body').html()
             .replace(divReById('header'), '')
             .replace(divReById('toc'), '');

  $('body').text('\n').append($(header+'\n')).append($(toc+'\n'))
           .append($('<div class="l-main-content" id="main-content"></div>'));
  $('#main-content').append($(bodyContent));
  var htmlWitTocDiv = $.html('html');
  fs.writeFile(path.join('output/tsmin.html'), htmlWitTocDiv, function (writeErr) {
    if (writeErr) { return console.log(writeErr);}
  });
});
