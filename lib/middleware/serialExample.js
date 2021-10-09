const SerialWare = require('./serialWare');
var s1 = function(data) 
{
    return data * 2;   
}
var s2 = function(data) 
{
    return data * 4;   
}
var options = new Map([['logging',true]]);
async function test(input)
{
  var exampleWare = new SerialWare('Test',null,null,[s1, s2],options);
  return await exampleWare.execute(input);
}
test(1).then(console.log);