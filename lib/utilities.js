function isNullOrUndefined(value)
{
    return value == undefined || value == null;
};
function isBlank(value)
{
    return value == undefined || value == null || value.trim() == '';
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
    var qPos = parts[0].indexOf('?');
    if (qPos < 1)
    {
        return parts[0].toLowerCase();
    }
    else
    {
        return parts[0].substring(0,qPos).toLowerCase();
    }
}    
function getData(url)
{
    var parts = splitUrl(url);
    if (parts.length > 1)
    {
        return parts[1];
    }
    var qPos = parts[0].indexOf('?');
    if (qPos >= 0)
    {
        return parts[0].substring(qPos+1);
    }
    return null;
}

module.exports = {
    'isNullOrUndefined' : isNullOrUndefined, 
    'defaultIfNullOrUndefined' : defaultIfNullOrUndefined,
    'echo': echo,
    'getController': getController,
    'getData': getData,
    'isBlank' : isBlank
};
