
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/pos/:text', routes.pos);
app.get('/lj/search/:term', routes.searchLJ);
app.get('/lj/:username', routes.loadLJ);
// app.get('/lj/:username/questions', routes.loadLJQuestions);
// app.get('/lj/:username/selfReferences', routes.loadLJSelfReferences);
// app.get('/lj/:username/sentences', routes.loadLJSentences);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});