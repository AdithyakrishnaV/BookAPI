const { json } = require("express");
const express = require("express");

//Database
const database = require("./database");

// Initialization
const booky = express();

//Configuration 
booky.use(express.json());

/* 
Route            /
Discription      Get all books
Access           Public
Parameter        None 
Method           GET
*/
booky.get("/", (req, res) => {
    return res.json({ books: database.books });
});


/* 
Route            /is
Discription      Get specific books based on ISBN
Access           Public
Parameter        isbn
Method           GET
*/
booky.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
        );
    if (getSpecificBook.length === 0) {
        return res.json({error:`No book found for the ISBN of ${req.params.isbn}`,});
    }

    return res.json({book: getSpecificBook});
});



/* 
Route            /c
Discription      Get specific books based on category
Access           Public
Parameter        category
Method           GET
*/
booky.get("/c/:category", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );

    if (getSpecificBook.length === 0) {
        return res.json({error:`No book found for the category of ${req.params.category}`,});
    }

    return res.json({book: getSpecificBook});
});

/* 
Route            /lan
Discription      Get specific books based on language
Access           Public
Parameter        lan
Method           GET
*/
booky.get("/lan/:language", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language.includes(req.params.language)
    );

    if (getSpecificBook.length === 0) {
        return res.json({error:`No book found for the language of ${req.params.language}`,});
    }

    return res.json({book: getSpecificBook});
});


/* 
Route            /author
Discription      Get all authors
Access           Public
Parameter        None
Method           GET
*/
booky.get("/author", (req, res) => {
    return res.json({ authors: database.author});
});

/* 
Route            /author/name
Discription      Get specific authors
Access           Public
Parameter        name
Method           GET
*/
booky.get("/author/:name", (req, res) => {
    const getSpecificBook = database.author.filter(
        (author) => author.name === req.params.name
    );
    if (getSpecificBook.length === 0) {
        return res.json({error:`No book found for the author of ${req.params.name}`,});
    }

    return res.json({author: getSpecificBook});
});

/* 
Route            /author/book
Discription      Get specific authors based on books
Access           Public
Parameter        isbn
Method           GET
*/
booky.get("/author/book/:isbn", (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if (getSpecificAuthor.length === 0) {
        return res.json({error:`No Author found for the book of ${req.params.isbn}`,
    });
   }

   return res.json({authors: getSpecificAuthor});
});


/* 
Route            /publications
Discription      Get all publication 
Access           Public
Parameter        NONE
Method           GET
*/
booky.get("/publication/", (req, res) => {
    return res.json({publications:database.publication});
});

/* 
Route            /publications
Discription      Get specific publications
Access           Public
Parameter        publications
Method           GET
*/
booky.get("/publication/:name", (req, res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.name === req.params.name
        );
    if (getSpecificPublication.length === 0) {
        return res.json({error:`No book found for the publication of ${req.params.name}`,});
    }

    return res.json({publication: getSpecificPublication});
});

/* 
Route            /publications/book
Discription      Get list of publication based on book
Access           Public
Parameter        isbn
Method           GET
*/
booky.get("/publication/book/:isbn", (req, res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.books.includes(req.params.isbn)
    );

    if (getSpecificPublication.length === 0) {
        return res.json({error:`No publication found for the book of ${req.params.isbn}`,});
    }

    return res.json({publication: getSpecificPublication});
});

/* 
Route            /book/add
Discription      Add new book
Access           Public
Parameter        isbn
Method           POST
*/
booky.post("/book/add", (req, res) => {
    const {newBook} = req.body; // const newBook = req.body.newBook; -> const {newBook} = req.body; --> destructuring
    database.books.push(newBook);
    return res.json({ book: database.books });
});

/* 
Route            /author/add
Discription      Add new author
Access           Public
Parameter        isbn
Method           POST
*/
booky.post("/author/add", (req, res) => {
    const {newAuthor} = req.body; 
    database.author.push(newAuthor);
    return res.json({ author: database.author });
});

/* 
Route            /publication/add
Discription      Add new author
Access           Public
Parameter        isbn
Method           POST
*/
booky.post("/publication/add", (req, res) => {
    const {newPublication} = req.body; 
    database.publication.push(newPublication);
    return res.json({ author: database.publication });
});

/* 
Route            /book/update/title
Discription      Update book title 
Access           Public
Parameter        isbn
Method           PUT
*/
booky.put("/book/update/title/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            book.title = req.body.newBookTitle;
            return;
        }
    });

    return res.json({ book: database.books});
});

/* 
Route            /book/update/author
Discription      Add / update new author for a book
Access           Public
Parameter        isbn
Method           PUT
*/
booky.put("/book/update/author/:isbn/:authorId", (req, res) => {
    //update book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
          return book.author.push(parseInt(req.params.authorId));
        }
      });
    
      // update author database
    
      database.author.forEach((author) => {
        if (author.id === parseInt(req.params.authorId))
          return author.books.push(req.params.isbn);
      });
    
      return res.json({ books: database.books, author: database.author });
    });
    
/* 
Route            /publication/update/book
Discription      Update/add books to publications
Access           Public
Parameter        isbn
Method           PUT
*/
booky.put("/publication/update/book/:isbn", (req, res) => {
    //update the publication database
    database.publications.forEach((publication) => {
      if (publication.id === req.body.pubId) {
       return publication.books.push(req.params.isbn);
      }
    });
 
   //update book database
   database.books.forEach((book) => {
       if (book.ISBN === req.params.isbn) {
         book.publication = req.body.pubId;
         return;
       }
   });
 
   return res.json({ 
       books: database.books, 
       publications: database.publications, 
       message: "Successfully updated the publication", 
     });
 });

booky.listen(3000, () => console.log("Hey  server booting..."));

//HTTP client -> helper who helps you to make http request