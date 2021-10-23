const myConfig = require('../../config/configuration').Configuration;
const Response = require('../models/response');
const whitelist = function whitelist(request)
{
    var aIndex = myConfig.allowedHosts.indexOf(request.request.headers.host);
    var dIndex = myConfig.deniedHosts.indexOf(request.request.headers.host);
    if(aIndex < 0 || dIndex >= 0)
    {
        request.response = new Response().notAuthorised();
    }
    return request;
}
module.exports = whitelist;
