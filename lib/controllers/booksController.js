const BookStore = require('../storage/fileStorage').BookStore;
const getBook = function(id)
{
    return BookStore.getBookData(id);
};

class booksController
{
    constructor()
    {
        this.actions = [];
        this.actions.push({name: 'books', method:'GET', dataType:'number',action : getBook})
    }
}

if (module.exports.Controllers == undefined)
{
    module.exports.Controllers = [booksController]
}
else
{
    module.exports.Controllers.push(booksController);
}