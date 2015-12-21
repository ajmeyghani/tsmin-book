/* specific to http://alexgorbatchev.com/SyntaxHighlighter/
reads the generated html from `htx.js` and then:
- Replaces the <code> generated to empty string
- replaces <pre class="typescript" with <pre class="typescript brush:ts"
- replaces </code></pre> with </pre>
*/

var path = require('path');
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;
var mdFolder = process.argv[2]; /* folder containing all the html files files */
var fs = require('fs-extra');

/* TODO: this function can be put into in its own module */
execFile('find', [ 'output' ], function(err, stdout, stderr) {
  var fileList = stdout.split('\n');
  var htmlfiles = fileList.filter(function (file) {
    var filename = file.split('/').pop();
    /* does not start with `.`, does not content `-content` and ends with `.html` */
    return /^[^.](?!.*-content)\w+\.html$/igm.test(filename);
  })
  .map(function (file) {return path.resolve(file) });
  console.log('Highlighting html: ', htmlfiles);
  htmlfiles.forEach(function (htmlFilePath) {
    var filename = htmlFilePath.split('/').pop().replace('.html', '.html');
    fs.readFile(htmlFilePath, {encoding: 'utf-8'}, function (err, data) {
      if (err) {return console.log(err);}
      var toWrite = data.replace(/<pre class="typescript"><code>/g, '<pre class="typescript brush:ts">')
                        .replace(/<\/code><\/pre>/g, '</pre>');
    fs.writeFile(htmlFilePath, toWrite, function (writeErr) {
      if(writeErr) {
        return console.log(writeErr);
      }
    });
    });
  });
});
