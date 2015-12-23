var fs = require('fs-extra');
fs.readFile('./output/book-toc.html', {encoding: 'utf-8'}, function (err, data) {
  if (err) {return console.log(err);}
  var cheerio = require('cheerio'),
      $ = cheerio.load(data);
  var toc = $('#TOC');
  var html = $.html();
  console.log(toc.html());
  // => <h2 class="title welcome">Hello there!</h2>
});
