const BaseWare = require('./baseWare');
class SerialWare extends BaseWare
{
    constructor(name, inputTransform, outputTransform, links, options)
    {
        super(name, inputTransform, outputTransform, links, options);
    }

    async executeChildren(data)
    {
        for(const link of this.links)
        {
            if (this.options.has('logging'))
            {
                console.log(`${this.name} executing with ${data}`);
            }
            data = link(data);
            if (data.error != undefined)
            {
                if (data.error)
                {
                    break;
                }
            }
        }
        return data;
    }
}
module.exports = SerialWare;