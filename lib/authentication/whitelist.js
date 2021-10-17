const myConfig = require('../../config/configuration').Configuration;
const whitelist = function whitelist(request)
{
    var aIndex = myConfig.allowedHosts.indexOf(request.request.headers.host);
    var dIndex = myConfig.deniedHosts.indexOf(request.request.headers.host);
    if(aIndex < 0 || dIndex >= 0)
    {
        request.response.status = 401;
        request.response.data = 'Not Authorised';
        request.response.type = 'text/text';    
    }
    return request;
}
module.exports = whitelist;
