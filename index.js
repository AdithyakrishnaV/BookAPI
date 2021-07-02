require("dotenv").config();

//Framework
const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");

//Database
const database = require("./database");

//Models
const BookModel = require("./book");
const AuthorModel = require("./author");
const PublicationModel = require("./publication")

// Initialization
const booky = express();

//Configuration 
booky.use(express.json());

//Establish database connection 
mongoose.connect(
    process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
).then(() => console.log("Connection established..!!"));

/* 
Route            /
Discription      Get all books
Access           Public
Parameter        None 
Method           GET
*/
booky.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});


/* 
Route            /is
Discription      Get specific books based on ISBN
Access           Public
Parameter        isbn
Method           GET
*/
booky.get("/is/:isbn", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

    if (!getSpecificBook) {
        return res.json(
            {error:`No book found for the ISBN of ${req.params.isbn}`,
        });
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
booky.get("/c/:category", async (req, res) => {
    const getSpecificBook =  await BookModel.findOne({ category: req.params.category });  

    if (!getSpecificBook) {
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
booky.get("/lan/:language", async (req, res) => {
    
    const getSpecificBook = await BookModel.findOne({ language: req.params.language });

    if (!getSpecificBook) {
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
booky.get("/author", async (req, res) => {
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
booky.post("/book/add", async (req, res) => {
    const {newBook} = req.body; // const newBook = req.body.newBook; -> const {newBook} = req.body; --> destructuring
    
    const addNewBook = BookModel.create(newBook);

    return res.json({ books: addNewBook, message: "new book added" });
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
    AuthorModel.create(newAuthor);

    return res.json({ message: "author was added" });
 });

/* 
Route            /publication/add
Discription      Add new publication
Access           Public
Parameter        isbn
Method           POST
*/
booky.post("/publication/add", async (req, res) => {
    const {newPublication} = req.body;
    PublicationModel.create(newPublication);

    return res.json({ author: database.publication });
});

/* 
Route            /book/update/title
Discription      Update book title 
Access           Public
Parameter        isbn
Method           PUT
*/
booky.put("/book/update/title/:isbn", async (req, res) => {

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
});

/* 
Route            /book/update/author
Discription      Add / update new author for a book
Access           Public
Parameter        isbn
Method           PUT
*/
booky.put("/book/update/author/:isbn", async (req, res) => {
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

 /* 
Route            /book/delete
Discription      Delete a book
Access           Public
Parameter        isbn
Method           DELETE
*/
booky.delete("/book/delete/:isbn", async (req, res) => {

    const updatedBookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN: req.params.isbn
        }
    );
   
    // const updatedBookDatabase = database.books.filter(
    //   (book) => book.ISBN !== req.params.isbn
    // );
    // database.books = updatedBookDatabase;
    return res.json({ books: updatedBookDatabase });
});

 /* 
Route            /book/delete/author
Discription      Delete a author from book
Access           Public
Parameter        isbn, author id
Method           DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId", async (req, res) => {

    //update book database
      
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $pull:{
                authors: parseInt(req.params.authorId)
            }
        },
        {
            new: true
        }
    );
    
    //update author database

    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: parseInt(req.params.authorId)
        },
        {
            $pull: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );

    return res.json({ 
        message: "author was deleted",
        book: updatedBook, 
        author: updatedAuthor, 
    })
});

/* 
Route            /publication/delete/book
Discription      delete a book from publication
Access           Public
Parameter        isbn,  publication id
Method           DELETE
*/
booky.delete("/publication/delete/book/:isbn/:pubId", (req, res) => {
    //update publication database
    database.publications.forEach((publication) => {
        if(publication.id === parseInt(req.params.pubId)) {
            const newBooksList = publication.books.filter(
                (book) => book !== req.params.isbn
                );

        publication.books = newBooksList;
        return;
        }
    });

    //update book database
    database.books.forEach((book) => {
        if(book.ISBN !== req.params.isbn){
            book.publication = 0;
            return;
        }
    });

    return res.json({ 
        books: database.books, 
        publications: database.publications, 
    });
});

booky.listen(3000, () => console.log("Hey  server booting..."));

//HTTP client -> helper who helps you to make http request