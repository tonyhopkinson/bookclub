const Utilities = require('../utilities');
const Serialware = require('../middleware/serialWare');
const ResponseModel = require('../models/responseModel');

const pathFinder = function(request)
{
    var response = new ResponseModel(request);
    if (request.errorCodes = [])
    {
        response.method = request.request.method;
        var parts = Utilities.parseUrl(request.request.url);
    }
    else
    {
        response.response = request.errorCodes[0];
    }
    return response;
}

const responder = function (request) 
{
    return request;    
}

const route = function (request) 
{
    return request;    
}

class Routerware extends Serialware
{
    constructor()
    {
        super('Routing',pathFinder,responder,[route],null);
    }
}
module.exports = Routerware;