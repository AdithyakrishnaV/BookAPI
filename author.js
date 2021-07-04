const mongoose = require("mongoose");

//Creating an author schema
const AuthorSchema = mongoose.Schema({
    id: Number,
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 12
    },
    books:[String]
});

// Creating a model
const AuthorModel = mongoose.model("authors", AuthorSchema);

module.exports = AuthorModel;