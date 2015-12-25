var path = require('path');
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;
var mdFolder = process.argv[2]; /* folder containing all the html files files */
var fs = require('fs-extra');

/* read output/file.html not output/file-conten.html and run the pdf for each */
execFile('find', [ 'output/html' ], function(err, stdout, stderr) {
  var fileList = stdout.split('\n');
  var htmlfiles = fileList.filter(function (file) {
    var filename = file.split('/').pop();
    // does not start with `.`, does not content `-content` and ends with `.html`
    return !/^\./.test(file) && !/^\./.test(filename) &&
              file.search('public') === -1 && file.search('-content.html') === -1 &&
              /\.html$/.test(filename);
  })
  .map(function (file) {return path.resolve(file); })
  .filter(function (file) { return !/public/.test(file); });
  console.log('Converting to PDF: ', htmlfiles);
  htmlfiles.forEach(function (htmlFilePath) {
    var outputFilePath = htmlFilePath.match(/output\/html\/(.*)/)[1].replace('.html', '.pdf');
    var makePdf = 'phantomjs bin/render.js ' + htmlFilePath + ' ' + path.join('output/pdf', outputFilePath) ;
    exec(makePdf, function(pdfErr, stdout, stderr) {
      if (pdfErr) { return console.log(pdfErr);}
    });
  });
});
