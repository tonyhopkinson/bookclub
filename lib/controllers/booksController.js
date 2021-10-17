const getBook = function(id)
{
    return {book : id}
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