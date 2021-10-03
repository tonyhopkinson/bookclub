var http = require('http');
const myConfig = require('./config/configuration.js').Configuration;
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/json'});
	res.end("{\"Response\":\"Nothing\"}");
}).listen(myConfig.port);