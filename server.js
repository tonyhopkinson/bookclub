var http = require('http');
const Authenticatorware = require("./lib/authenticators/authenticatorWare");
const Middleware = require("./lib/middleware/middleware");
const myConfig = require('./config/configuration.js').Configuration;
const options = new Map([['logging', true]]);
async function process(input)
{
  var w1 = new Authenticatorware(options);
  var processor = new Middleware('Test',[w1]);
  return await processor.execute(input);
}

http.createServer(async function (req, res) 
{
	var response = await process(req);
    res.writeHead(200, {'Content-Type': 'text/json'});
	res.end(response.toString());
}).listen(myConfig.port);