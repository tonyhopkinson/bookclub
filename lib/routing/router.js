const routes = require('../controllers/controllers');
const Utilities = require('../utilities');
const Response = require('../models/response');
const findRoute = function(request)
{
    var method = request.request.method;
    var controller = Utilities.getController(request.request.url);
    var data = Utilities.getData(request.request.url);
    if (routes.has(method))
    {
      if (routes.get(method).has(controller))
      {
        var action = routes.get(method).get(controller);
        request.response = new Response().route(action, data);
        return request;
      }
    }
    request.response = new Response().notFound();
    return request;
}
module.exports = findRoute;