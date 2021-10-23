const BookStore = require('../storage/fileStorage').BookStore;
const Response = require('../models/response');
const Utilities = require('../utilities');
const getCatalog = async function(request)
{
    query = null;
    if (!Utilities.isNullOrUndefined(request.response.data))
    {
        query = decodeURIComponent(request.response.data);
    }
    var content = await BookStore.getCatalog(query);
    request.response = new Response().json(content);
    return request;
};

class catalogueController
{
    constructor()
    {
        this.actions = [];
        this.actions.push({name: 'catalog', method:'GET', dataType:'none',action : getCatalog})
    };
};
module.exports = catalogueController;