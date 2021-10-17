const Utilities = require('../utilities');
const myConfig = require('../../config/configuration').Configuration;
const jwtFunction = require('jsonwebtoken');

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
        request.response.status = 401;
        request.response.data = 'Not Authorised';
        request.response.type = 'text/text';
        console.log(`Error authenticating : ${ex.message}`);  
      }
  }
  else
  {
    console.log('Error authenticating : No Bearer token');  
    request.response.status = 403;
    request.response.data = 'Bad Request';
    request.response.type = 'text/text';
  }
  return request;
};
module.exports = jwt;