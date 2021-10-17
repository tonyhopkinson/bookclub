const routes = require('../controllers/controllers');
const Utilities = require('../utilities');
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
        request.response.action = action;
        request.response.data = data;
        return request;
      }
    }
    request.response.status = 404;
    request.response.data = 'Not Found';
    request.response.type = 'text/text';
    return request;
}
module.exports = findRoute;