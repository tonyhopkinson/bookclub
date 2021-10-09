class BaseWare
{
    
    get options() 
    {
        return this._options
    };
    
    set options(value) 
    {
        if (this.isNullOrUndefined(value))
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
        this.defaultFunction = function (a) { return a;};
        this.name = name;
        this.options = options;
        this.inputTransform = this.defaultIfNullOrUndefined(inputTransform);
        this.outputTransform = this.defaultIfNullOrUndefined(outputTransform);
        if (this.isNullOrUndefined(links))
        {
            this.links = [];
        }
        else
        {
            this.links = links;
        }
    }

    isNullOrUndefined(value)
    {
        return value == undefined || value == null;
    }

    defaultIfNullOrUndefined(value)
    {
        if (this.isNullOrUndefined(value))
        {
            return this.defaultFunction;
        }
        return value;
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