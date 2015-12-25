var fs = require('fs-extra');
var path = require('path');
var config = require('../config');
var filewalker = require('filewalker');
var toc = function (operate) {
  var files = [];
  var doesStartWithDot = new RegExp('^\\.');
  filewalker('./output/html')
    .on('file', function(p, s) { files.push(p); })
    .on('error', function(err) { console.error(err); })
    .on('done', function() {
      // console.log('%d dirs, %d files, %d bytes', this.dirs, this.files, this.bytes);
      var cleanFiles = files.filter(function (file) {
        var filename = file.split('/').pop();
        var htmlFile =  !/^public/.test(file) &&
                        !doesStartWithDot.test(file) && !doesStartWithDot.test(filename) &&
                        file.search('-content') === -1;
        return htmlFile;
      });

      operate(cleanFiles);
    })
  .walk();
};

toc(function (filePaths) {
  var originalToc = filePaths.sort(function (a, b) {
    return a > b;
  });
  // console.log(originalToc);
  /* for each file path, generate relative toc */

  /* pick an element, calculate the relative path of other elements to this element */
  var alltocs = originalToc.map(function (item, idx) {
    return {
      file: item,
      tocs: originalToc
    };
  });
  var getPathRelativeTo = function (file, tocs) {
    var splitFile = file.split('/');
    var depthCount = splitFile.length;

    var newToc = [];
    tocs.forEach(function (toc) {
      var pathPrefix = '';
      if (splitFile.length === 1) {
        pathPrefix = './';
      } else {
        for (var i = 0; i < depthCount - 1; i++) {
          pathPrefix += '../'
        }
      }
      newToc.push(pathPrefix + toc);
    });
    return newToc;
  }
  var newTocs = alltocs.map(function (tocObj) {
    var relToc;
    tocObj.tocs.forEach(function (toc) {
            if (tocObj.file === 'index.html' ) {
              relToc = tocObj.tocs;
            } else {
              var file = tocObj.file;
              var theTocs = tocObj.tocs;
              var relativeToc = getPathRelativeTo(file, theTocs);
              relToc = relativeToc;
            }
          });
      return {
        file: tocObj.file,
        toc: relToc
      };
  });

  var makeTocUl = function (items, file) {
    var tocUl = '<ul>\n';
    var list = items.map(function (tocPath) {
      var name = tocPath.split('/').pop().replace('.html', '');
      name = name.substring(0,1).toUpperCase() + name.toLowerCase().substring(1, name.length);
      return '<li><a href="' + tocPath + '">' + name + '</a></li>\n';
    }).join('');
    return tocUl + list + '</ul>';
  }
  newTocs.forEach(function (tocObj) {
    var inputFile = path.join(config.output + '/html', tocObj.file);
    fs.readFile(inputFile, 'utf-8', function (readErr, htmlContent) {
      if (readErr) { return console.log(readErr);}

      htmlContent = htmlContent.replace(/<!-- @toc -->/g, makeTocUl(tocObj.toc, tocObj.file));
      var outputPath = path.join(config.output + '/html', tocObj.file);
      fs.outputFile(outputPath, htmlContent, function (writeErr) {
        if (writeErr) { return console.log(writeErr);}
      });
    });
  });
});
