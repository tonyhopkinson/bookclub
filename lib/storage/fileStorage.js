const fs = require("fs");
const path = require('path');
const myConfig = require('../../config/configuration').Configuration;
const util = require('util');
const readFile = util.promisify(fs.readFile);
const Utilities = require('../utilities');
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
    async getBookData(id)
    {
        if (this.catalog.has(id))
        {
            return this.catalog.get(id);
        }
        return null;
    }
    async getBook(filename, filetype)
    {
        if (fs.existsSync(filename))
        {
            var content = await readFile(filename);
            return content;
        }
        return null;
    }
    
    async getCatalog(query)
    {
        if (Utilities.isBlank(query))
        {
            return Array.from(this.catalog.values());
        }

    }
}
module.exports.BookStore = new fileStorage();