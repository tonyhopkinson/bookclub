const RequestResponse = require('./models/requestResponse');
const authenticate = require('./authentication/authenticate');
const router = require('./routing/router');

const processor = function(req, res)
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
 module.exports = processor;