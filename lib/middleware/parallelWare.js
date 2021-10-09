const BaseWare = require('./baseWare');
class ParallelwareWare extends BaseWare
{
    constructor(name, inputTransform, outputTransform, links, options, collator)
    {
        super(name, inputTransform,outputTransform, links, options);
        this.collator = this.defaultIfNullOrUndefined(collator);
    }

    async executeChildren(data)
    {
        var results = [];
        for(const link of this.links)
        {
            results.push(await link(data));
        }
        if (this.options.has('logging'))
        {
            console.log(`${this.name} collating ${results}`);
        }
        return this.collator(results);
    }
}
module.exports = ParallelwareWare;