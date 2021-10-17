const BookStore = require('../storage/fileStorage').BookStore;
const getBook = function(request)
{
    var id = request.response.data;
    var bookData = BookStore.getBookData(id);
    if (bookData == null)
    {
        request.response.status = 404;
        request.response.data = 'Not found';
        request.response.type = 'text/text';
    }
    else
    {
        request.response.data = BookStore.getBook(bookData.fullFilename);
        request.response.type = `application/${bookData.fileType}`;
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
