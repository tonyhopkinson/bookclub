class Response
{
    constructor()
    {
        this.status = 200;
        this.data = null;
        this.privileges = null;
        this.type = 'text/text';
        this.action = null;
    }

    Ok()
    {
        return (this.status >= 200) && (this.status < 400);
    }
    notFound()
    {
        var result = new Response();
        result.status = 404;
        result.type = 'text/text';
        result.data = 'Not found';
        return result;
    }
    okObject(content,type)
    {
        var result = new Response();
        result.status = 200;
        result.type = type;
        result.data = content;
        return result;
    }
    json(content)
    {
        var result = new Response();
        result.status = 200;
        result.type = 'text/json';
        result.data = JSON.stringify(content);
        return result;
    }
    route(action, data)
    {
        var result = new Response();
        result.status = 200;
        result.action = action;
        result.data = data;
        return result;
    }
    badRequest()
    {
        var result = new Response();
        result.status = 403;
        result.type = 'text/text';
        result.data = 'Bad request';
        return result;
    }
    notAuthorised()
    {
        var result = new Response();
        result.status = 401;
        result.type = 'text/text';
        result.data = 'Not authorised';
        return result;
    }
}
module.exports = Response;