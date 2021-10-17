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
}
module.exports = Response;