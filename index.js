require("dotenv").config();

//Framework
const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");


// Microservices routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");


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


// Initializing Microservices
booky.use("/book", Books);
booky.use("/author", Authors);
booky.use("/publication", Publications);


booky.listen(3000, () => console.log("Hey  server booting..."));

//HTTP client -> helper who helps you to make http request



//Monolitic approach