// Initializing Express Router
const Router = require("express").Router();

// Database Models
const AuthorModel = require("../../author");



/* 
Route            /author
Discription      Get all authors
Access           Public
Parameter        None
Method           GET
*/
Router.get("/", async (req, res) => {
    const getAllAuthors = await AuthorModel.findOne();
    return res.json({ getAllAuthors });
});

/* 
Route            /author/name
Discription      Get specific authors
Access           Public
Parameter        name
Method           GET
*/
Router.get("/:name", (req, res) => {
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
Router.get("/book/:isbn", (req, res) => {
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
Route            /author/add
Discription      Add new author
Access           Public
Parameter        isbn
Method           POST
*/
Router.post("/add", (req, res) => {
    const {newAuthor} = req.body;
    AuthorModel.create(newAuthor);

    return res.json({ message: "author was added" });
 });

 module.exports = Router;