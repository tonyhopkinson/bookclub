const Middleware = require('./middleware');
const ParallelWare = require('./parallelWare');
const SerialWare = require('./serialWare');

function s1(data) { return data * 2;};
function s2(data) { return data * 4;};
var options = new Map([['logging', true]]);


async function test(input)
{
  var w1 = new SerialWare('Serial',null,null,[s1, s2]);
  var w2 = new ParallelWare('Parallel',null, null,[s1,s2]);
  var exampleWare = new Middleware('Test',[w1,w2],options);
  return await exampleWare.execute(input);
}
test(1).then(console.log);
