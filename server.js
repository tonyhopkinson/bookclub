var http = require('http');
var requestModel = require('./lib/requestModel');
const myConfig = require('./config/configuration.js').Configuration;
http.createServer(function (req, res) {
	//test
	const rm = new requestModel.RequestModel(req);
	console.log(rm.host);
	//end of test
	res.writeHead(200, {'Content-Type': 'text/json'});
	res.end("{\"Response\":\"Nothing\"}");
}).listen(myConfig.port);