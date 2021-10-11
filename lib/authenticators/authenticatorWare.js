const Parallelware = require('../middleware/parallelWare');
const RequestModel = require('../models/requestModel')
const config = require('../../config/configuration').Configuration;
const jwt = require('jsonwebtoken');
const Utilities = require('../utilities');
const collator = function (results) 
{
    var collated = new RequestModel(results[0].request);
    for(const result of results)
    {
        collated.privileges.push(result.privileges);
        collated.errors.push(result.errors);
        collated.errorCodes.push(result.errorCodes);
    };
    collated.privileges = collated.privileges.flat();
    collated.errorCodes = collated.errorCodes.flat();
    collated.errors = collated.errors.flat();
    return collated;
}

const whiteListAuthenticator = function (request) 
{
    var result = new RequestModel(request.request);
    var aIndex = config.allowedHosts.indexOf(request.request.headers.host);
    var dIndex = config.deniedHosts.indexOf(request.request.headers.host);
    if(aIndex < 0 || dIndex >= 0)
    {
        result.errorCodes.push(401);
        result.errors.push("Unauthorised (whitelist)");
    }
    return result;
}

const jwtAuthenticator = function (request) 
{
    var result = new RequestModel(request.request);
    if (!Utilities.isNullOrUndefined(request.request.headers.authorization))
    {
        var token = request.request.headers.authorization.substring(6).trim();
        try
        {
            var authenticated = jwt.verify(token,config.secret);
            result.privileges.push(authenticated);
        }
        catch(ex)
        {
            result.errorCodes.push(401);
            result.errors.push(`Unauthorized (${ex.message})`)
        }
    }
    else
    {
        result.errorCodes.push(401);
        result.errors.push("Unauthorized (Bearer token missing)")
    }
    return result;
}

const transform = function(request)
{
    return new RequestModel(request);
}

class AuthenticatorWare extends Parallelware
{
    constructor()
    {
        super('Authentication',transform,null,[whiteListAuthenticator, jwtAuthenticator],null,collator);
    }
}
module.exports = AuthenticatorWare;