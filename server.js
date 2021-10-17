var http = require('http');
const myConfig = require('./config/configuration.js').Configuration;
const processor = require('./lib/processor');

http.createServer(async function (req, res) 
{
	await processor(req,res);
}).listen(myConfig.port);