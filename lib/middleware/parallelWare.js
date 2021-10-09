var baseWare = require('./baseWare');
class parallelwareWare extends baseWare
{
    collate(results)
    {
        return results;
    }

    async executeChildren(data)
    {
        var results = [];
        for(const child of this.children)
        {
            results.push(await child.execute(data));
        }
        return this.collate(results);
    }
}
module.exports = parallelwareWare;