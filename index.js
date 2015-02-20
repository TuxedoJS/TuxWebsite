var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/client/style', express.static(__dirname + '/client/style'));
app.use('/client', express.static(__dirname + '/client'));

app.all('/*', function (req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('index.html', { root: __dirname });
});

app.listen(app.get('port'), function () {
  console.log("TuxedoJS is running at localhost:" + app.get('port'));
});
