const whitelist = require('./whitelist');
const jwt = require('./jwt');
const authenticate = function(request)
{
    var request = whitelist(request);
    if (request.response.Ok())
    {
        request = jwt(request);
    }
    return request;
}
module.exports = authenticate;