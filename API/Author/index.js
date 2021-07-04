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
   try {
    const getAllAuthors = await AuthorModel.findOne();
    return res.json({ getAllAuthors });
   } catch (error) {
       return res.json({error: error.message});
   }
});

/* 
Route            /author/name
Discription      Get specific authors
Access           Public
Parameter        name
Method           GET
*/
Router.get("/:name", async (req, res) => {
    try {
        const getSpecificBook = await AuthorModel.findOne({name: req.params.name});
    
        if (!getSpecificBook) {
            return res.json({error:`No book found for the author of ${req.params.name}`,});
        }
    
        return res.json({author: getSpecificBook});
    } catch (error) {
        return res.json({error: error.message});
    }
});

/* 
Route            /author/book
Discription      Get specific authors based on books
Access           Public
Parameter        isbn
Method           GET
*/
Router.get("/book/:isbn", async (req, res) => {
    try {
        const getSpecificAuthor = await AuthorModel.findOne({books: req.params.isbn});

        if (!getSpecificAuthor) {
            return res.json({error:`No Author found for the book of ${req.params.isbn}`,
        });
       }
    
       return res.json({authors: getSpecificAuthor});
    } catch (error) {
        return res.json({error: error.message});
    }
});

/* 
Route            /author/add
Discription      Add new author
Access           Public
Parameter        isbn
Method           POST
*/
Router.post("/add", (req, res) => {
    try {
        const {newAuthor} = req.body;
        AuthorModel.create(newAuthor);
    
        return res.json({ message: "author was added" });
    } catch (error) {
       return res.json({error: error.message});
    }
 });

 module.exports = Router;