/* converts ```codeblocks to pandoc fenced blocks */
var filewalker = require('filewalker');
var fs = require('fs-extra');
var path = require('path');
var files = [];
var inputFolder = 'mdfiles';


var converToMdx = function (convert) {
  filewalker('./mdfiles')
    // .on('dir', function(p) {
    //   console.log('dir:  %s', p);
    // })
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
      // console.log(cleanFiles);
      convert(cleanFiles);
    })
  .walk();
};

/* read in mdfiles and convert blocks to fenced block
  write to output/mdx */
converToMdx(function (files) {
  var language = {
    from: 'typescript',
    to: 'java'
  };
  var toFencedBlock = '~~~~ {.numberLines .' + language.to + ' language=' + language.to + ' startFrom="1"}';
  var regex = {
    from: new RegExp('```' + language.from, 'g')
  };

  files.forEach(function (file) {
    var filePaths = file.replace('mdfiles', 'output/mdx').split('/');
    var filename = filePaths[filePaths.length - 1];
    var outputPathDirs = filePaths.slice(0, filePaths.length - 1).join('/');
    var filePathToWrite = path.join(outputPathDirs, filename);
    // console.log('Writing: ', filePathToWrite);
    fs.readFile(file, 'utf-8', function (err, data) {
      if (err) {return console.log(err);}
      data = data.replace(regex.from, toFencedBlock)
                 .replace(/```/g, '~~~~~~~~~');
      fs.ensureDir(outputPathDirs, function (enErr) {
        if (enErr) { return console.log(enErr);}
        fs.writeFile(filePathToWrite, data, function (writeErr) {
          if (writeErr) { return console.log(writeErr); }
        });
      });
    });
  });

});
