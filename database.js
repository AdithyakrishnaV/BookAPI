const books = [{
    ISBN:"1234BOOK",
    title:"Getting started with MERN",
    pubDate:"20201-07-07",
    language:"en",
    numPage:250,
    author:[1, 2],
    publication:[1],
    category:["tech", "programing", "education", "triller"],
  },
  {
    ISBN:"1234TWO",
    title:"Say hello to HTML",
    pubDate:"20201-07-07",
    language:"en",
    numPage:250,
    author:[1, 2],
    publication:[2],
    category:["tech", "programing", "education", "triller"],
  }
];

const author = [
  {
   id:1,
   name:"Adi",
   books:["1234BOOK"]
  },
  {
   id:2,
   name:"Elon Musk",
   books:["1234BOOK"]
  },
];

const publications = [
  {
   id:1,
   name:"Writex",
   books:["1234BOOK"]
  },
  {
    id:2,
    name:"Trex",
    books:[]
   }
];

module.exports = {books, author, publications};