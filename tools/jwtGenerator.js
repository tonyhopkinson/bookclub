const jwt = require('jsonwebtoken');
const config = require('../config/configuration').Configuration;
var token = jwt.sign({admin:true, read:true,update:true,create:true,delete:true},config.secret, );
console.log(token);

var verified = jwt.verify(token,config.secret,true);
console.log(verified);