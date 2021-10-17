const Utilities = require('../utilities');
const myConfig = require('../../config/configuration').Configuration;
const jwtFunction = require('jsonwebtoken');
const Response = require('../models/response');

const jwt = function authenticate(request)
{
  if (!Utilities.isNullOrUndefined(request.request.headers.authorization))
  {
      var token = request.request.headers.authorization.substring(6).trim();
      try
      {
          var authenticated = jwtFunction.verify(token,myConfig.secret);
          request.response.privileges = authenticated;
      }
      catch(ex)
      {
        request.response = new Response().notAuthorised();
        console.log(`Error authenticating : ${ex.message}`);  
      }
  }
  else
  {
    console.log('Error authenticating : No Bearer token');  
    request.response = new Response().badRequest();
  }
  return request;
};
module.exports = jwt;