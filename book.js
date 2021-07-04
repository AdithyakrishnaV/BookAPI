const mongoose = require("mongoose");

//Creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 10
    },
    title: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 10
    },
    pubDate:{
        type: String,
        required: true,
        minLength: 8,
        maxLength: 10
    },
    language: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 10
    },
    numPage: Number,
    authors: [Number],
    publication: [Number],
    category: [String],
});

// Create a model
const BookModel = mongoose.model("books", BookSchema);

module.exports = BookModel;