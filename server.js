var http = require('http');
var RequestModel = require('./lib/models/requestModel');
const myConfig = require('./config/configuration.js').Configuration;
var Whitelist = require('./lib/authenticators/whitelist');
http.createServer(function (req, res) {
	//test
	const rm = new RequestModel(req);
	const rs = new Whitelist().authenticated(rm);
	if (rs.valid)
	{
		res.writeHead(200, {'Content-Type': 'text/json'});
		res.end("{\"Response\":\"Nothing\"}");
	}
	else
	{
		res.writeHead(401);
		res.end(rs.error);
	}
}).listen(myConfig.port);