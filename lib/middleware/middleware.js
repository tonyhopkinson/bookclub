class Middleware
{
    get options() {return _options};
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

    constructor(name,wares, options)
    {
        this._options = null;
        this.name = name;
        this.wares = wares;
        this.options = options;
        for(const ware of wares)
        {
            ware.options = options;
        }
    }

    isNullOrUndefined(value)
    {
        return value == undefined || value == null;
    }

    async execute(input)
    {
        var data = await this.wares[0].execute(input);
        for(var i = 1; i < this.wares.length; i++ )
        {
            data = await this.wares[i].execute(data);
        }
        return data;
    }
}
module.exports = Middleware;