var baseService = require('./baseService');
var parallelWare = require('./parallelWare');
class service1 extends baseService
{
    execute(data)
    {
        return data * 2;
    }
};
class service2 extends baseService
{
    execute(data)
    {
        return data * 4;
    }
};

async function test(input)
{
    var exampleWare = new parallelWare('Test');
    exampleWare.register(new service1('s1'));
    exampleWare.register(new service2('s2'));
    return await exampleWare.execute(input);
}
test(1).then(console.log);