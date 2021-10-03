var http = require('http');
var handler = require('./whitelist');
http.createServer(function (req, res) {
	var handled = handler.CanHandle(req);
	if (handled.success){	
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end("Hello World");
	}
	else{
		res.writeHead(401, {'Content-Type': 'text/html'});
		res.end(handled.error);
	}
}).listen(8080);