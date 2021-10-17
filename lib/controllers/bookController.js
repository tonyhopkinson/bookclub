const BookStore = require('../storage/fileStorage').BookStore;
const Response = require('../models/response');
const getBook = function(request)
{
    var id = request.response.data;
    var bookData = BookStore.getBookData(id);
    if (bookData == null)
    {
        request.response = new Response().notFound();
    }
    else
    {
        request.response = new Response().okObject(BookStore.getBook(bookData.fullFilename),
            `application/${bookData.fileType}`);
    }
    return request;
};

class bookController
{
    constructor()
    {
        this.actions = [];
        this.actions.push({name: 'book', method:'GET', dataType:'number',action : getBook})
    };
};
module.exports = bookController;
