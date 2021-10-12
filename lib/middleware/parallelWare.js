const BaseWare = require('./baseWare');
const Utilities = require('../../lib/utilities');
class Parallelware extends BaseWare
{
    constructor(name, inputTransform, outputTransform, links, options, collator)
    {
        super(name, inputTransform,outputTransform, links, options);
        this.collator = Utilities.defaultIfNullOrUndefined(collator, Utilities.echo);
    }

    async executeChildren(data)
    {
        var results = await Promise.allSettled([this.links[0](data), this.links[1](data)]);
        if (this.options.has('logging'))
        {
            console.log(`${this.name} collating ${results}`);
        }
        return this.collator(results);
    }
}
module.exports = Parallelware;