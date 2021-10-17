var http = require('http');
const myConfig = require('./config/configuration.js').Configuration;
const options = new Map([['logging', true]]);
const jwt = require('jsonwebtoken');
const Utilities = require('./lib/utilities');
var Controllers = require('./lib/controllers/booksController');
var routes = null;

function whitelist(request)
{
  var aIndex = myConfig.allowedHosts.indexOf(request.headers.host);
  var dIndex = myConfig.deniedHosts.indexOf(request.headers.host);
  if(aIndex < 0 || dIndex >= 0)
  {
      return false;
  }
  return true;
}

function authenticate(request)
{
  if (!Utilities.isNullOrUndefined(request.headers.authorization))
  {
      var token = request.headers.authorization.substring(6).trim();
      try
      {
          var authenticated = jwt.verify(token,myConfig.secret);
          return true;
          //          result.privileges.push(authenticated);
      }
      catch(ex)
      {
        console.log(`Error authenticating : ${ex.message}`);  
      }
  }
  else
  {
    console.log('Error authenticating : No Bearer token');  
  }
  return false;
}

function buildRoutes(controllerClasses)
{
  var result = new Map();
  for(const controller of controllerClasses)  
  {
    var c = new controller();
    for(const action of c.actions)
    {
      if (!result.has(action.method))
      {
        result.set(action.method , new Map());
      }
      var children = result.get(action.method);  
      if (!children.has(action.name))
      {
        children.set(action.name, action.action);
      }
    }
  }
  return result;
}

function findController(req)
{
  if (routes == null)
  {
    routes = buildRoutes(Controllers.Controllers);  
  }
  var method = req.method;
  var controller = Utilities.getController(req.url);
  var data = Utilities.getData(req.url);
  if (routes.has(method))
  {
    if (routes.get(method).has(controller))
    {
      return {method : routes.get(method).get(controller), data : data};
    }
  }
  return null;
}

function process(req, res)
{
  var processing = true;
  if (!whitelist(req))
  {
    res.writeHead(401, {'Content-Type': 'text/text'});
    res.end('Not Authorised');
    processing = false;
  }
  if (processing && !authenticate(req))
  {
    res.writeHead(401, {'Content-Type': 'text/text'});
    res.end('Still not Authorised');
    processing = false;
  }
  if (processing)
  {
    var controller = findController(req);
    if (controller == null)
    {
      res.writeHead(404, {'Content-Type': 'text/text'});
      res.end('Not found');
      processing = false;
    }
    if (processing)
    {
      var response = controller.method(controller.data);
      res.writeHead(200, {'Content-Type': 'text/json'});
      res.end(JSON.stringify(response));
    }
  }
}

http.createServer(async function (req, res) 
{
	process(req,res);
}).listen(myConfig.port);