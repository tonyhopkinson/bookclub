var http = require('http');
const myConfig = require('./config/configuration.js').Configuration;
const authenticate = require('./lib/authentication/authenticate');
const router = require('./lib/routing/router');
const RequestResponse = require('./lib/models/requestResponse');
function process(req, res)
{
  var requestResponse = new RequestResponse(req);
  requestResponse =  authenticate(requestResponse);
  if (requestResponse.response.Ok())
  {
    requestResponse = router(requestResponse);
  }
  if (requestResponse.response.Ok())
  {
    requestResponse = requestResponse.response.action(requestResponse);
  }
  res.writeHead(requestResponse.response.status, {'Content-Type': requestResponse.response.type});
  res.end(requestResponse.response.data);
}

http.createServer(async function (req, res) 
{
	process(req,res);
}).listen(myConfig.port);