var path = require('path');
var express = require('express');
var app = express();

var serverSettings = {
  client: path.resolve('./output/html')
};

app.use('/public', express.static(path.resolve('./public')));
app.use(express.static(path.resolve('output/html')));

// app.all(/^\/(?!api).*/, function(req, res){
//   res.sendFile('index.html', {root: path.resolve('./output/html') });
// });

app.get('/api', function(req, res){
  res.json({
    "name": "amin"
  })
});

/* client handle 404 */
app.all("/404", function(req, res, next) {
  res.sendFile("index.html", {root: serverSettings.client });
});

/* catch invalid requests */
app.get('*', function(req, res, next) {
 console.log("404: " + req.originalUrl + " was not found")
 res.status(404).redirect("/404");
});

var port = process.env.PORT || 8760;
app.listen(port, function () {
  console.log('listening on ' + port);
});
