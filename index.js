const { json } = require("express");
const express = require("express");

//Database
const database = require("./database");

// Initialization
const booky = express();


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

booky.listen(3000, () => console.log("Hey  server booting..."));