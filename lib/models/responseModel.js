class ResponseModel
{
    constructor(requestModel)
    {
        this.requestModel = requestModel;
        this.controller = null;
        this.method = null;
        this.action = null;
        this.data = null;
        this.response = null;
        this.ok = false;
    };
    toString()
    {
        return `${this.requestModel.request.url} - ${this.requestModel.errorCodes}`;
    };
};
module.exports = ResponseModel;