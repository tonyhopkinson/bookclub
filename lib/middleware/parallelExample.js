const ParallelWare = require('./parallelWare');
function s1(data) { return data * 2;};
function s2(data) { return data * 4;};
var options = new Map([['logging', true]]);
async function test(input)
{
    var exampleWare = new ParallelWare('Test',null, null,[s1,s2],options,null);
    return await exampleWare.execute(input);
}
test(1).then(console.log);