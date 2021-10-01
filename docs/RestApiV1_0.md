# Api is versioned (Major.Minor) e.g api/v1.0/books
## V1.0 (Make a start)
* book = filename on filesystem*
- GET books - gets all books, returns a list of book
- GET books/:id gets the content of the book
- POST books {book} Adds a book name + content
- PUT books {book} updates a book accepts content
- DELETE books:id removes a book 
