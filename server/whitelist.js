const { FunctionResponse } = require('./models/functionresponse');
const fs = require('fs');

let rawdata = fs.readFileSync('student.json');
let student = JSON.parse(rawdata);
console.log(student);
var exports=module.exports={};
exports.CanHandle=function(req)
{
    
    if (req.headers.host == 'localhost:8080'){
        return new FunctionResponse(true,null);
    }
    else{
        return new FunctionResponse(false, "Who are you go away!");    
    }
}