/*
 * read md files, create -content.html and .html files
*/
var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs-extra');
var filewalker = require('filewalker');
var async = require('async');

/* input */
var inputFolder = 'mdfiles';

/* copy public to output/public */
fs.ensureDir('output/html', function () {
  exec('cp -r public output/html', function(copyErr, stdout, stderr) {
    if (copyErr) { return console.log(copyErr); }
  });
});

/* make standalone html */
async.waterfall([
  function(makeHtmlStandalone) {
    var mydirs = [];
    var files = [];
    filewalker('./mdfiles')
      .on('file', function(p, s) {files.push(p);})
      .on('dir', function (dir) { mydirs.push(dir); })
      .on('error', function(err) { return console.error(err); })
      .on('done', function() {
        var cleanFiles = files.filter(function (file) {
          var filename = file.split('/').pop();
          return !/^\./.test(file) && !/^\./.test(filename) && /\.md$/.test(filename);
        })
        .map(function (file) { return inputFolder + '/' + file });
          makeHtmlStandalone(null, cleanFiles, mydirs);
      })
      .walk();
  },
  function(inputMdFiles, mydirs, callback) {
    var standaloneHtml = function (contentOnlyFile, mainTemplate, pageTitle) {
      fs.readFile(contentOnlyFile, 'utf-8', function (readErr, htmlFragment) {
        if (readErr) { console.log(readErr); }
        var standaloneContent = mainTemplate.replace(/@content/, htmlFragment).replace(/@title/, pageTitle);
        var nestCount = contentOnlyFile.replace('output/html/', '').split('/').length;
        var newPublicPath = function () {
          var publicPath = '';
          if (nestCount === 1) { publicPath += './'; }
          else { for (var i = 0; i < nestCount - 1; i++ ) { publicPath += '../'; } }
          publicPath = publicPath + 'public/';
          return publicPath;
        };
        standaloneContent = standaloneContent.replace(/public\//g, newPublicPath());
        var outputPath = contentOnlyFile.replace('-content.html', '.html');
        fs.writeFile(outputPath, standaloneContent, function (writeErr) {
          if (writeErr) {return console.log(writeErr);}
        });
      });
    };
    fs.readFile('./main.html', 'utf-8', function (tplReadErr, mainTemplate) {
      if (tplReadErr) { return console.log(tplReadErr); }
      inputMdFiles.forEach(function (mdFile) {
        var filePaths = mdFile.split('/');
        var filename = filePaths[filePaths.length - 1];
        var outputFolder = filePaths.slice(1, filePaths.length - 1).join('/');
        var dest = path.join('output/html', outputFolder);
        var writePath = path.join(dest, filename.replace('.md', '-content.html'));
        fs.readFile(mdFile, 'utf-8', function (errReadMd, mdContent) {
          var pageTitleRegx = new RegExp('[\s\S]*#\s*(.*)');
          var pageTitle = (mdContent.match(pageTitleRegx)) ? mdContent.match(pageTitleRegx)[1].trim() : '';
          if (errReadMd) { return console.log(errReadMd);}
          fs.ensureDir(dest, function (enErr) {
            var htmlFragmentCmd = 'pandoc --to=html ' + mdFile + ' -o ' + writePath;
            if (enErr) { return console.log(enErr);}
            exec(htmlFragmentCmd, function(contentErr, stdout, stderr) {
              if (contentErr) { return console.log(contentErr); }
              standaloneHtml(writePath, mainTemplate, pageTitle);
            });
          });
        });
      });
    });
  }
], function (err, result) {
   console.log('done creating the html main files');
});
