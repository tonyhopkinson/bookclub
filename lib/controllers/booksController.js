const BookStore = require('../storage/fileStorage').BookStore;
const Response = require('../models/response');
const getBook = function(request)
{
    var id = request.response.data;
    var content = BookStore.getBookData(id);
    if (content == null)
    {
        request.response = new Response().notFound();
    }
    else
    {
        request.response = new Response().json(content);
    }
    return request;
};

class booksController
{
    constructor()
    {
        this.actions = [];
        this.actions.push({name: 'books', method:'GET', dataType:'number',action : getBook})
    };
};
module.exports = booksController;