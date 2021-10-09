var http = require('http');
const Serialware = require("./lib/middleware/serialWare");
const Middleware = require("./lib/middleware/middleware");
const myConfig = require('./config/configuration.js').Configuration;
async function process(input)
{
  var w1 = new Serialware('Test',null,null,[function (a) { return a;}]);
//	  var w2 = new ParallelWare('Parallel',null, null,[s1,s2]);
  var processor = new Middleware('Test',[w1]);
  return await processor.execute(input);
}

http.createServer(async function (req, res) 
{
	var response = await process(req);
    res.writeHead(200, {'Content-Type': 'text/json'});
	res.end(response.toString());
}).listen(myConfig.port);