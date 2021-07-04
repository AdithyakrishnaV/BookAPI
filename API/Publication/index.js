//Initializing Express Router
const Router = require("express").Router();

const PublicationModel = require("../../publication");


/* 
Route            /publications
Discription      Get all publication 
Access           Public
Parameter        NONE
Method           GET
*/
Router.get("/", (req, res) => {
    return res.json({publications:database.publication});
});

/* 
Route            /publications
Discription      Get specific publications
Access           Public
Parameter        publications
Method           GET
*/
Router.get("/:name", (req, res) => {
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
Router.get("/book/:isbn", (req, res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.books.includes(req.params.isbn)
    );

    if (getSpecificPublication.length === 0) {
        return res.json({error:`No publication found for the book of ${req.params.isbn}`,});
    }

    return res.json({publication: getSpecificPublication});
});


/* 
Route            /publication/add
Discription      Add new publication
Access           Public
Parameter        isbn
Method           POST
*/
Router.post("/add", async (req, res) => {
    const {newPublication} = req.body;
    PublicationModel.create(newPublication);

    return res.json({ author: database.publication });
});


/* 
Route            /publication/update/book
Discription      Update/add books to publications
Access           Public
Parameter        isbn
Method           PUT
*/
Router.put("/update/book/:isbn", (req, res) => {
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
Route            /publication/delete/book
Discription      delete a book from publication
Access           Public
Parameter        isbn,  publication id
Method           DELETE
*/
Router.delete("/delete/book/:isbn/:pubId", (req, res) => {
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


module.exports = Router;
