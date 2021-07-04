const mongoose = require("mongoose");

// Publication schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 10
    },
    books:[String]
});

// Creating a model
const PublicationModel = mongoose.model("publications", PublicationSchema);

module.exports = PublicationModel;