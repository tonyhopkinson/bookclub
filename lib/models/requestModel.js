class RequestModel
{
    constructor(request)
    {
        this.request = request;
        this.errorCodes = [200];
        this.errors = [];
        this.privileges = [];
    };
    toString()
    {
        return `${this.request.url} - ${this.errorCodes}`;
    };
};
module.exports = RequestModel;