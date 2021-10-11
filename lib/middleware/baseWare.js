const Utilities = require('../../lib/utilities');

class BaseWare
{
    
    get options() 
    {
        return this._options
    };
    
    set options(value) 
    {
        if (Utilities.isNullOrUndefined(value))
        {
            this._options = new Map();
        }
        else
        {
            this._options = value;
        }
    };
    constructor(name, inputTransform, outputTransform, links, options)
    {
        this._options = null;
        this.name = name;
        this.options = options;
        this.inputTransform = Utilities.defaultIfNullOrUndefined(inputTransform, Utilities.echo);
        this.outputTransform = Utilities.defaultIfNullOrUndefined(outputTransform, Utilities.echo);
        if (Utilities.isNullOrUndefined(links))
        {
            this.links = [];
        }
        else
        {
            this.links = links;
        }
    }

    async execute(input)
    {
        if (this.options.has('logging'))
        {
            console.log(`Executing ${this.name}.inputTransform with ${input}`);
        }
        var data = this.inputTransform(input);
        if (this.options.has('logging'))
        {
            console.log(`Executing ${this.name} with ${data}`);
        }
        data = await this.executeChildren(data);
        if (this.options.has('logging'))
        {
            console.log(`Executed ${this.name} and got ${data}`);
        }
        var result = this.outputTransform(data);
        if (this.options.has('logging'))
        {
            console.log(`Executed ${this.name}.outputTransform and got ${result}`);
        }
        return result;
    }

    async executeChildren(data)
    {
        return data;
    }
}
module.exports = BaseWare;