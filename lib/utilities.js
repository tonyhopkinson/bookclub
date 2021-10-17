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
function splitUrl(url)
{
    var parts = url.split('/');
    if ((parts.length > 1) && (parts[0] == ''))
    {
        parts = parts.slice(1,parts.length);
    }
    return parts;
}

function getController(url)
{
    var parts = splitUrl(url);
    return parts[0].toLowerCase();
}    
function getData(url)
{
    var parts = splitUrl(url);
    if (parts.length > 1)
    {
        return parts[1];
    }
    return null;
}

module.exports = {
    'isNullOrUndefined' : isNullOrUndefined, 
    'defaultIfNullOrUndefined' : defaultIfNullOrUndefined,
    'echo': echo,
    'getController': getController,
    'getData': getData
};
