var ResponseModel = require('../models/responseModel');
//var RequestModel = require('./lib/models/requestModel');
var config = require('../../config/configuration').Configuration;
class Whitelist{
    authenticated(requestModel) {
        var aIndex = this.allowed.indexOf(requestModel.host);
        var dIndex = this.denied.indexOf(requestModel.host);
        var res = new ResponseModel();
        if(aIndex >= 0 && dIndex < 0)
        {
            res.valid = true;
        }
        else
        {
            res.valid = false;
            res.code = 401;
            res.error = "Unauthorised (whitelist)";
        }
        return res;
    }
    constructor()
    {
        this.allowed = config.allowedHosts;
        this.denied = config.deniedHosts;
    }
}
module.exports = Whitelist;