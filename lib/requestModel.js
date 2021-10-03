class RequestModel{
    constructor(req)
    {
        this.host = req.headers.host;
        this.url = req.url;
        this.method = req.method;
    }
};
module.exports.RequestModel = RequestModel;