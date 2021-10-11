function isNullOrUndefined(value)
{
    return value == undefined || value == null;
};

function defaultIfNullOrUndefined(value, defaultValue)
{
    if (this.isNullOrUndefined(value))
    {
        return defaultValue;
    }
    return value;
};
function echo(value) { return value;};
    
module.exports = {
    'isNullOrUndefined' : isNullOrUndefined, 
    'defaultIfNullOrUndefined' : defaultIfNullOrUndefined,
    'echo': echo
};
