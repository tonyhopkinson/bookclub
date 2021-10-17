const fs = require("fs");
const path = require('path');
const myConfig = require('../../config/configuration').Configuration;
class fileStorage
{
    constructor()
    {
        this.catalog = new Map();
        var catalogueFile = path.join(myConfig.filesPath,'catalogue.json');
        if (fs.existsSync(catalogueFile))
        {
            var content = JSON.parse(fs.readFileSync(catalogueFile));
            for (const rawBook of content)
            {
                this.catalog.set(rawBook.Id.toString(), rawBook);        
            }
        }
    }
    getBookData(id)
    {
        if (this.catalog.has(id))
        {
            return this.catalog.get(id);
        }
        return null;
    }
}
module.exports.BookStore = new fileStorage();