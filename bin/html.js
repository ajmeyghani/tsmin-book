/* reads md files, and create htm files by
using main.html as the template and replacing
`@content` with the content of html created by pandoc
*/
var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs-extra');
var filewalker = require('filewalker');

var files = [];
var mydirs = [];
var inputFolder = 'mdfiles';

var getFiles = function (convert) {
  filewalker('./mdfiles')
    .on('dir', function(p) {
      // console.log('dir:  %s', p);
      mydirs.push(p);
    })
    .on('file', function(p, s) {
      // console.log('file: %s, %d bytes', p, s.size);
      files.push(p);
    })
    .on('error', function(err) {
      console.error(err);
    })
    .on('done', function() {
      // console.log('%d dirs, %d files, %d bytes', this.dirs, this.files, this.bytes);
      var cleanFiles = files.filter(function (file) {
        var filename = file.split('/').pop();
        return !/^\./.test(file) && !/^\./.test(filename) && /\.md$/.test(filename);
      }).map(function (file) { return inputFolder + '/' + file });
      convert(cleanFiles, mydirs);
    })
  .walk();
};

var wrapHtmlContent = function (makeHtml) {
  getFiles(function (files, dirs) {
    var toWriteFileNames = [];
    fs.readFile('./main.html', 'utf-8', function (tplReadErr, template) {
      if (tplReadErr) { return console.log(tplReadErr); }
      files.forEach(function (file) {
        var filePaths = file.split('/');
        var filename = filePaths[filePaths.length - 1];
        var outputFolder = filePaths.slice(1, filePaths.length - 1).join('/');
        var dest = path.join('output/html', outputFolder);
        var toWriteFileName = path.join(dest, filename.replace('.md', '-content.html'));
        toWriteFileNames.push(toWriteFileName);
        fs.readFile(file, 'utf-8', function (errReadMd, mdContent) {
          if (errReadMd) { return console.log(errReadMd);}
          fs.ensureDir(dest, function (enErr) {
            var htmlContent = 'pandoc --to=html ' + file + ' -o ' + toWriteFileName;
            if (enErr) { return console.log(enErr);}
            exec(htmlContent, function(contentErr, stdout, stderr) {
              if (contentErr) { return console.log(contentErr); }
              var pageTitleRegx = new RegExp('^[-]+[\\n\\rc\\r]+\\s*title:(.*)');
              var pageTitle;
              if (mdContent.match(pageTitleRegx) !== null) {
                pageTitle = mdContent.match(pageTitleRegx)[1].trim();
              } else {
                pageTitle = '';
              }
              makeHtml(toWriteFileName, template, pageTitle);
            });
          });
        });
      });
    });
  });
};

wrapHtmlContent(function (theFilePath, template, pageTitle) {
  fs.readFile(theFilePath, 'utf-8', function (readErr, htmlContent) {
    if (readErr) { console.log(readErr);}
    var toWrite = template.replace(/@content/, htmlContent).replace(/@title/, pageTitle);
    /* replace the public path */
    var pathRealtiveToHtml = theFilePath.replace('output/html/', '');
    var nestCount = pathRealtiveToHtml.split('/').length;
    var newPublicPath = function () {
      var publicPath = '';
      if (nestCount === 1) {
        publicPath += './';
      } else {
        for (var i = 0; i < nestCount - 1; i++ ) {
          publicPath += '../';
        }
      }
      publicPath = publicPath + 'public/';
      return publicPath;
    };
    toWrite = toWrite.replace(/public\//g, newPublicPath());
    var newFilePath = theFilePath.replace('-content.html', '.html');
    fs.writeFile(newFilePath, toWrite, function (writeErr) {
      if (writeErr) {return console.log(writeErr);}
    });
  });
});

/* copy public to output/public */
fs.ensureDir('output/html', function () {
  exec('cp -r public output/html', function(copyErr, stdout, stderr) {
    if (copyErr) { return console.log(copyErr); }
  });
});
