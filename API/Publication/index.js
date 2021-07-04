//Initializing Express Router
const Router = require("express").Router();

const BookModel = require("../../book");
const PublicationModel = require("../../publication");


/* 
Route            /publications
Discription      Get all publication 
Access           Public
Parameter        NONE
Method           GET
*/
Router.get("/", (req, res) => {
    try {
        return res.json({publications:database.publication});
    } catch (error) {
        return res.json({error: error.message});
    }
});

/* 
Route            /publications
Discription      Get specific publications
Access           Public
Parameter        publications
Method           GET
*/
Router.get("/:name", async (req, res) => {
   try {
    const getSpecificPublication = await PublicationModel.findOne({name: req.params.name});

    if (!getSpecificPublication) {
        return res.json({error:`No book found for the publication of ${req.params.name}`,});
    }

    return res.json({publication: getSpecificPublication});
   } catch (error) {
       return res.json({error: error.message});
   }
});

/* 
Route            /publications/book
Discription      Get list of publication based on book
Access           Public
Parameter        isbn
Method           GET
*/
Router.get("/book/:isbn", async (req, res) => {
   try {
    const getSpecificPublication = await PublicationModel.findOne({books: req.params.isbn});


    if (!getSpecificPublication) {
        return res.json({error:`No publication found for the book of ${req.params.isbn}`,});
    }

    return res.json({publication: getSpecificPublication});
   } catch (error) {
       return res.json({error: error.message});
   }
});


/* 
Route            /publication/add
Discription      Add new publication
Access           Public
Parameter        isbn
Method           POST
*/
Router.post("/add", async (req, res) => {
    try {
        const {newPublication} = req.body;
        PublicationModel.create(newPublication);
    
        return res.json({ author: database.publication });
    } catch (error) {
        return res.json|({error: error.message});
    }
});


/* 
Route            /publication/update/book
Discription      Update/add books to publications
Access           Public
Parameter        isbn
Method           PUT
*/
Router.put("/update/book/:isbn", async (req, res) => {
  try {
             //update the publication database
     const updatedPublication = await PublicationModel.findOneAndUpdate({
        id: req.body.pubId
     },
     {
        $addToSet: {
           books: req.params.isbn
        }
     },
     {
         new: true,
     }
  );

//update book database
const updatedBooks = await BookModel.findOneAndUpdate(
   {
     ISBN: req.params.isbn
   },
   {
     $addToSet: {
         publication: req.body.pubId
     }
   },
   {
       new: true
   }
 );


 return res.json({ 
    books: updatedBooks, 
    publications: updatedPublication, 
    message: "Successfully updated the publication", 
  });
     } catch (error) {
         return res.json({error: error.message});
     }
     
 });


/* 
Route            /publication/delete/book
Discription      delete a book from publication
Access           Public
Parameter        isbn,  publication id
Method           DELETE
*/
Router.delete("/delete/book/:isbn/:pubId", async (req, res) => {
    try {
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
 v   
    } catch (error) {
        return res.json({error: error.message});
    }
});

module.exports = Router;
