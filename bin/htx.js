var path = require('path');
var execFile = require('child_process').execFile;
var mdFolder = process.argv[2]; /* folder containing all the md files */
var exec = require('child_process').exec;
var fs = require('fs-extra');

var getFiles = function (inputFiles, fn) {
  execFile('find', [ inputFiles ], function(err, stdout, stderr) {
    var fileList = stdout.split('\n');
    var cleanList = fileList.filter(function (file) {
      var filename = file.split('/').pop();
      return (filename !== '' && filename.match(/^\./) === null);
    }).slice(1)
    .map(function (file) {return path.resolve(file); });
    fn(cleanList);
  });
};

var makeContentHtml = function (convertFn) {
  getFiles(mdFolder || 'mdfiles', function (files) {
    /* read all the md files and then convert them to html. */
    files.forEach(function (mdfilePath) {
      var filename = mdfilePath.split('/').pop();
      var htmlContent = 'pandoc --to=html ' + mdfilePath + ' -o ' + 'output/' + filename.replace('.md', '-content.html');
      fs.ensureDir('output', function (err) {
        if (err) { return console.log(err); }
        exec(htmlContent, function(contentErr, stdout, stderr) {
          if (contentErr) { return console.log(contentErr); }
          convertFn(filename);
        });
      })
    });
  });
};

makeContentHtml(function (filename) {
  var htmlContentFile = filename.replace('.md', '-content.html');
  fs.readFile('./main.html', {encoding: 'utf-8'}, function (mainErr, mainData) {
    if (mainErr) { return console.log(mainErr); }
    fs.readFile(path.resolve('output', htmlContentFile), {encoding: 'utf-8'}, function (err, contentData) {
      if (err) { return console.log(err); }
      var toWrite = mainData.replace(/@content/, contentData);
      fs.writeFile(path.resolve('output', filename.replace('.md', '.html')), toWrite, function (writeErr) {
        if (writeErr) { return console.log(writeErr); }
      });
    });
  });
});
