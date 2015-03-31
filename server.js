/**
 * Small node server for development.
 * Start with optional --port=
 */

var argv = require('optimist').argv;
var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');

var port = argv.port || 8337;

var serve = serveStatic('demo', {'index': ['index.html']});
var server = http.createServer(function(req, res){
    var done = finalhandler(req, res);
    serve(req, res, done);
});

server.listen(port);
console.log('Server listening at port ' + port);
