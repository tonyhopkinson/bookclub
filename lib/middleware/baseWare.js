class baseWare
{
    constructor(name)
    {
        this.name = name;
        this.children = [];
    }

    register(child)
    {
        this.children.push(child);
    }

    execute(input)
    {
        var data = this.transformInput(input);
        data = this.executeChildren(data);
        return this.transformOutput(data);
    }

    executeChildren(data)
    {
        return data;
    }

    transformInput(input)
    {
        return input;
    }

    transformOutput(data)
    {
        return data;
    }
}
module.exports = baseWare;