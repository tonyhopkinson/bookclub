const Response = require('./response');
class RequestResponse
{
    constructor(req)
    {
        this.request = req;
        this.response = new Response();
    }
}
module.exports = RequestResponse;