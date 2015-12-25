var fs = require('fs-extra');
var path = require('path');
var config = require('../config');
var bookHtmlFile = path.join(config.output + '/' + config.name + '.html');
fs.readFile(bookHtmlFile, 'utf-8', function (readErr, bookContent) {
  if (readErr) { return console.log(readErr); }
  var hjsContent = bookContent.replace(/<pre class="typescript"><code>/g, '<pre class="typescript brush:ts">')
                    .replace(/<\/code><\/pre>/g, '</pre>');
  var hjsHtmlPath = path.join(config.output + '/' + config.name + '.html');
  fs.writeFile(hjsHtmlPath, hjsContent, function (writeErr) {
    if (writeErr) {return console.log(writeErr);}
  });
});
