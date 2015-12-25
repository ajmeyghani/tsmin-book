var page = new WebPage();
var system = require("system");
var config = require('../config');
// change the paper size to letter, add some borders
// add a footer callback showing page numbers
page.paperSize = {
  format: "Letter",
  orientation: "portrait",
  // margin: {left:"0.1cm", right:"0.1cm", top:"0.1cm", bottom:"0.1cm"},
  header: {
    height: "0.4in",
    contents: phantom.callback(function(pageNum, numPages) {
      return "<div style='text-align:center;'><small>" + "</small></div>";
    })
  },
  footer: {
    height: "0.4in",
    contents: phantom.callback(function(pageNum, numPages) {
      return "<div style='text-align:center;'><small>" + "</small></div>";
    })
  }
};
page.zoomFactor = 1;
// assume the file is local, so we don't handle status errors
page.open(system.args[1], function (status) {
  // export to target (can be PNG, JPG or PDF!)
  page.render(system.args[2]);
  phantom.exit();
});
