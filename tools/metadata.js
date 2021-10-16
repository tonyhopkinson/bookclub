const os = require('os');
const fs = require("fs");
const path = require('path');
const BooksPath = `${os.homedir}/Documents/Books`;
const underscore = /_/g;
const openParentheses = /\(/;
const closeParentheses = /\)/;
const openBracket = /\[/;
const closeBracket = /\]/;

class BookA
{
    constructor(fullFilename)
    {
        this.fullFilename = fullFilename;
        var t = path.extname(fullFilename);
        if (t.length > 1)
        {
            this.fileType = t.substring(1).toLowerCase();
        }
        else
        {
            this.fileType = "none";
        }
        this.rawName = path.basename(fullFilename,path.extname(fullFilename));
    }
}

class BookB
{
    constructor(abook)
    {
        this.fullFilename = abook.fullFilename;
        this.fileType = abook.fileType;
        var parts = abook.rawName.split('-');
        if (parts.length == 2)
        {
            this.authorPart = parts[0];
            this.titlePart = parts[1];
            this.parsed = true;
        }
        else
        {
            if (parts.length == 3)
            {
                this.authorPart = parts[0];
                this.seriesPart = parts[1];    
                this.titlePart = parts[2];
                this.parsed = true;
            }
            else
            {
                if (parts.length == 1)
                {
                    this.titlePart = parts[0];
                    this.parsed = true;
                }
                else
                {
                    if (parts.length == 4)
                    {
                        this.authorPart = parts[0];
                        this.seriesPart = `${parts[1]}-${parts[2]}`;    
                        this.titlePart = parts[3];
                        this.parsed = true;
        
                    }
                    else
                    {
                        if (parts.length == 5)
                        {
                            this.authorPart = parts[0];
                            this.seriesPart = `${parts[1]}-${parts[2]}-${parts[3]}`;    
                            this.titlePart = parts[4];
                            this.parsed = true;
            
                        }
                        else
                        {
                            this.parsed = false;    
                        }
                    }
                }
            }
        }
    }
}
function clean(value)
{
    if (value == undefined)
    {
        return null;
    }
    value = value.replace(underscore, '-');
    return value.trim();
}

function getAuthors(value) 
{
    var authors = [];
    if (value != undefined)
    {
        var authorParts = value.split('&');
        for(authorPart of authorParts)
        {
            var nameParts = authorPart.split(',');
            if (nameParts.length == 1)
            {
                if ((nameParts[0].toLowerCase().trim() != 'various') && (nameParts[0].toLowerCase().trim() != 'unknown'))
                {
                    authors.push(new Author(clean(nameParts[0])));            
                }
            }
            else
            {
                var forenameParts = nameParts[1].trim().split(' ');
                if (forenameParts.length == 1)
                {
                    authors.push(new Author(clean(nameParts[0]),null,clean(forenameParts[0])));            
                }
                else
                {
                    if (forenameParts.length == 2)
                    {
                        authors.push(new Author(clean(nameParts[0]),clean(forenameParts[1]), clean(forenameParts[0])));            
                    }        
                }
            }
        }
    }
    return authors;
}

function getTitle(titlePart) 
{
    if (titlePart == undefined)
    {
        return null;
    }
    if (titlePart == null)
    {
        return null;
    }
    var temp = titlePart;
    var start = temp.indexOf('(');
    while (start >= 0)
    {
        var end = temp.indexOf(')');
        if (end < 0)
        {
            temp = temp.replace(openParentheses,'');
        }
        else
        {
            if (end < start)
            {
                temp = temp.replace(closeParentheses, '');
            }
            else
            {
                temp = `${temp.substring(0,start)}${temp.substring(end + 1)}`;
            }
        }
        start = temp.indexOf('(');
    }

    start = temp.indexOf('[');
    while (start >= 0)
    {
        var end = temp.indexOf(']');
        if (end < 0)
        {
            temp = temp.replace(openBracket,'');
        }
        else
        {
            if (end < start)
            {
                temp = temp.replace(closeBracket, '');
            }
            else
            {
                temp = `${temp.substring(0,start)}${temp.substring(end + 1)}`;
            }
        }
        start = temp.indexOf('[');
    }

    return clean(temp);
}

function getCycle(value,prefix) 
{
    var tags = [];
    var lastspace = value.lastIndexOf(' ');
    if (lastspace < 0)
    {
        tags.push(new Tag(prefix, value.trim()));
    }
    else
    {
        tags.push(new Tag(prefix, value.substring(0, lastspace).trim()));
        tags.push(new Tag(`${prefix}Index`, value.substring(lastspace + 1).trim()));
    }
    return tags;    
}

function getTags(seriesPart) 
{
    if (seriesPart == undefined)
    {
        return null;
    }
    if (seriesPart == null)
    {
        return null;
    }
    if (seriesPart.trim() == '')
    {
        return null;
    }
    var tags = [];
    var seriesParts = seriesPart.trim().split('-');
    if (seriesParts.length == 1)
    {
        tags.push(getCycle(seriesParts[0].trim(),"series"));    
    }
    else
    {
        if (seriesParts.length == 2)
        {
            tags.push(getCycle(seriesParts[0].trim(),"verse"));    
            tags.push(getCycle(seriesParts[1].trim(),"series"));    
        }
        else
        {
            tags.push(new Tag("raw",seriesPart.trim()));
        }
    }
    return tags.flat(2);
}

class Tag
{
    constructor(name, value)
    {
        this.name = name;
        this.value = value;
    }
}

class Author
{
    constructor(surname, middlename, forename)
    {
        this.surname = surname;
        this.middlename = middlename;
        this.forename = forename;
    }
}

class BookC
{
    constructor(bbook)
    {
        this.Id = 0;
        this.fullFilename = bbook.fullFilename;
        this.fileType = bbook.fileType;
        this.authors = getAuthors(bbook.authorPart);
        this.title = getTitle(bbook.titlePart);
        this.tags = getTags(bbook.seriesPart);
        this.parsed = (this.authors != null) && (this.title != null) && (this.tags != null);
    }
}
function scanFolder(folder,result) 
{
    var dir = fs.opendirSync(folder);
    var file = dir.readSync();
    while(file != null)
     {
        var fullFilename = path.join(folder, file.name);
        if (fs.lstatSync(fullFilename).isDirectory())
        {
            scanFolder(fullFilename,result);
        }
        else
        {
            result.push(fullFilename);
        }
        file = dir.readSync();
    }
    dir.closeSync();        
}
var resultFileName1 = path.join(BooksPath,'Result1.json');
var resultFileName2 = path.join(BooksPath,'Result2.json');
var resultFileName3 = path.join(BooksPath,'Result3.json');
var resultFileName4 = path.join(BooksPath,'catalogue.json');
if (!fs.existsSync(resultFileName1))
{
    var content = [];
    scanFolder(BooksPath,content);
    fs.writeFileSync(resultFileName1,JSON.stringify(content, null, 2));
    console.log(`${resultFileName1} written`);
}
else
{
    console.log(`${resultFileName1} exists`);
}
if (fs.existsSync(resultFileName1) && !fs.existsSync(resultFileName2))
{
    content = JSON.parse(fs.readFileSync(resultFileName1));
    var jContent = [];
    for (const fullFilename of content)
    {  
        jContent.push(new BookA(fullFilename))
    }
    fs.writeFileSync(resultFileName2,JSON.stringify(jContent, null, 2));
    console.log(`${resultFileName2} written`);
}
else
{
    console.log(`${resultFileName2} exists`);
}
if (fs.existsSync(resultFileName2) && !fs.existsSync(resultFileName3))
{
    content = JSON.parse(fs.readFileSync(resultFileName2));
    var jContent = [];
    for (const book of content)
    {  
        var ibook = new BookB(book);
        jContent.push(ibook);
        if (!ibook.parsed)
        {
            console.log(ibook);
        }
    }
    fs.writeFileSync(resultFileName3,JSON.stringify(jContent, null, 2));
    console.log(`${resultFileName3} written`);
}
else
{
    console.log(`${resultFileName3} exists`);
}
if (fs.existsSync(resultFileName3) && !fs.existsSync(resultFileName4))
{
    content = JSON.parse(fs.readFileSync(resultFileName3));
    var jContent = [];
    id = 1;
    for (const book of content)
    {  
        var ibook = new BookC(book);
        ibook.Id = id;
        jContent.push(ibook);
        id++;
    }
    fs.writeFileSync(resultFileName4,JSON.stringify(jContent, null, 2));
    console.log(`${resultFileName4} written`);
}
else
{
    console.log(`${resultFileName4} exists`);
}
