const bookController = require("./bookController");
const booksController = require("./booksController");
function findRoutes()
{
    var controllers = [bookController, booksController];
    var result = new Map();
    for(const controller of controllers)  
    {
      var c = new controller();
      for(const action of c.actions)
      {
        if (!result.has(action.method))
        {
          result.set(action.method , new Map());
        }
        var children = result.get(action.method);  
        if (!children.has(action.name))
        {
          children.set(action.name, action.action);
        }
      }
    }
    return result;
}
module.exports = findRoutes();