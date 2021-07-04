// Prefix: /book

// Initializing Express Router
const Router = require("express").Router();

// Database Models
const BookModel = require("../../book");


/* 
Route            /
Discription      Get all books
Access           Public
Parameter        None 
Method           GET
*/
Router.get("/", async (req, res) => {
   try {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
   } catch (error) {
       return res.json({error: error.message});
   }
});


/* 
Route            /is
Discription      Get specific books based on ISBN
Access           Public
Parameter        isbn
Method           GET
*/
Router.get("/is/:isbn", async (req, res) => {
    try {
        const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

        if (!getSpecificBook) {
            return res.json(
                {error:`No book found for the ISBN of ${req.params.isbn}`,
            });
        }
    
        return res.json({book: getSpecificBook});
    } catch (error) {
        return res.json({error: error.message});
    }
});


/* 
Route            /c
Discription      Get specific books based on category
Access           Public
Parameter        category
Method           GET
*/
Router.get("/c/:category", async (req, res) => {
    try {
        const getSpecificBook =  await BookModel.findOne({ category: req.params.category });  

        if (!getSpecificBook) {
            return res.json({error:`No book found for the category of ${req.params.category}`,});
        }
    
        return res.json({book: getSpecificBook});
    } catch (error) {
        return res.json({error: error.message})
    }
});


/* 
Route            /lan
Discription      Get specific books based on language
Access           Public
Parameter        lan
Method           GET
*/
Router.get("/lan/:language", async (req, res) => {
    try {
        const getSpecificBook = await BookModel.findOne({ language: req.params.language });

        if (!getSpecificBook) {
            return res.json({error:`No book found for the language of ${req.params.language}`,});
        }
    
        return res.json({book: getSpecificBook});
    } catch (error) {
        return res.json({error: error.message})
    }

});


/* 
Route            /book/add
Discription      Add new book
Access           Public
Parameter        isbn
Method           POST
*/
Router.post("/add", async (req, res) => {
  try {
    const {newBook} = req.body; // const newBook = req.body.newBook; -> const {newBook} = req.body; --> destructuring
    
    await BookModel.create(newBook);

    return res.json({  newBook, message: "new book added" });
  } catch (error) {
    return res.json({error: error.message});
  }
});


/* 
Route            /book/update/title
Discription      Update book title 
Access           Public
Parameter        isbn
Method           PUT
*/
Router.put("/update/title/:isbn", async (req, res) => {

    try {
        const updatedBook = await BookModel.findOneAndUpdate({
            ISBN: req.params.isbn,
         },
         {
            title: req.body.bookTitle,
         },
         {
            new: true,
         }
       );
     
         return res.json({ book: updatedBook});
    } catch (error) {
        return res.json({error: error.message});
    }
});


/* 
Route            /book/update/author
Discription      Add / update new author for a book
Access           Public
Parameter        isbn
Method           PUT
*/
Router.put("/update/author/:isbn", async (req, res) => {
    try {
            //update book database

    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn
     },
     {
        $addToSet: {
            authors: req.body.newAuthor
        }
     },
     {
         new: true,
     }
    );
    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //       return book.author.push(parseInt(req.params.authorId));
    //     }
    //   });
    
      // update author database

      const updatedAuthor = await AuthorModel.findOneAndUpdate(
          {
           id: req.body.newAuthor
        },
        {
            $addToSet: {
               books: req.params.isbn
            }
        },
        {
            new: true
        }
      );
    
    //   database.author.forEach((author) => {
    //     if (author.id === parseInt(req.params.authorId))
    //       return author.books.push(req.params.isbn);
    //   });
    
      return res.json(
          { books: updatedBook, 
            author: updatedAuthor,
            message: "New author was added"
        });
    } catch (error) {
        return res.json({error: error.message});
    }
    });
    
/* 
Route            /book/delete
Discription      Delete a book
Access           Public
Parameter        isbn
Method           DELETE
*/
Router.delete("/delete/:isbn", async (req, res) => {
   
     try {
        const updatedBookDatabase = await BookModel.findOneAndDelete(
            {
                ISBN: req.params.isbn
            }
        );
    
        return res.json({ books: updatedBookDatabase });
     } catch (error) {
         return res.json({error: error.message});
     }
 
});



module.exports = Router;