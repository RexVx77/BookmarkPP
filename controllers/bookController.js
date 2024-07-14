const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");
const jwt = require("jsonwebtoken");
//@desc Get all books
//@route GET /api/books
//@access private
const allBook = asyncHandler(async (req, res) => {
    const books = await Book.find({ user_id: req.user.id});
    res.status(200).json(books);
});

//@desc Create new book
//@route POST /api/books
//@access private
const createBook = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name, count} = req.body;
    if(!name){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const book = await Book.create({
        user_id: req.user.id,
        name,
        count: 0,
    });
    res.status(201).json(book);
});

//@desc Login book
//@route POST api/book/login
//@access private
const loginBook = asyncHandler(async (req, res)=>{
    const  { name } = req.body;
    if( !name ){
        res.status(400);
        throw new Error("Give a book name!");
    }
    const book = await Book.findOne({ name });
    if(book){
        const accessToken = jwt.sign({
            book:{
                name: book.name,
                id: book.id,
                },
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            // { expiresIn: "15m" }
        );
        res.status(200).json({ accessToken });
    } else{
        res.status(401);
        throw new Error("book is not valid");
    }
});

//@desc Get individual book
//@route GET /api/books/:id
//@access private
const currentBook = asyncHandler(async (req, res) => {
    res.json(req.book);
});

//@desc Update book
//@route PUT /api/books/:id
//@access private
const updateBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if(!book){
        res.status(404);
        throw new Error("Book not found");
    }

    if(book.user_id.toString() !== req.user.id){
        res.statusCode(403);
        throw new Error("User don't have permission to update other user books");
    }
    // console.log("aaa");
    const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } 
    )
    res.status(200).json(updatedBook);
});

//@desc Delete book
//@route DELETE /api/books/:id
//@access private
const deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if(!book){
        res.status(404);
        throw new Error("Book not found");
    }
    // console.log(req.user);
    if(book.user_id.toString() !== req.user.id){
        res.statusCode(403);
        throw new Error("User don't have permission to update other user books"); 
    }

    await Book.deleteOne({ _id: req.params.id }); 
    res.status(200).json(book);
});

module.exports = { allBook, createBook, loginBook, currentBook, updateBook, deleteBook };