var baseWare = require('./baseWare');
class serialWare extends baseWare
{
    async executeChildren(data)
    {
        for(const child of this.children)
        {
            data = child.execute(data);
        }
        return data;
    }
}
module.exports = serialWare;