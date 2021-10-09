class RequestModel{
    constructor(req)
    {
        this.host = req.headers.host;
        this.url = req.url;
        this.method = req.method;
        this.error = false;
    }
};
module.exports = RequestModel;