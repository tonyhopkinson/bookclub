const Parallelware = require('../middleware/parallelWare');
const Utilities = require('../../lib/utilities');
const collator = function (results) 
{
    for(const result of results)
    {
        if (Utilities.isNullOrUndefined(result.error))
        {
            continue;
        }
        return result;
    };
    return {'request':results[0].request, 'error':null};
}

const whiteListAuthenticator = function (request) 
{
    return {'request':request, 'error':null};
}

const jwtAuthenticator = function (request) 
{
    return {'request':request, 'error':null};
}

class AuthenticatorWare extends Parallelware
{
    constructor(options)
    {
        super('Authentication',null,null,[whiteListAuthenticator, jwtAuthenticator],options,collator);
    }
}
module.exports = AuthenticatorWare;