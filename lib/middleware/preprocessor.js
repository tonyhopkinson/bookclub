const SerialWare = require('./serialWare');
const RequestModel = require('../models/requestModel');
class preprocessor extends SerialWare
{
    transformInput(input)
    {
        return new RequestModel(input);
    };
    
};
module.exports = preprocessor;