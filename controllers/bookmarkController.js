const asyncHandler = require("express-async-handler");
const Bookmark = require("../models/bookmarkModel");
//@desc Get all bookmarks
//@route GET /api/bookmarks
//@access private
const allBookmark = asyncHandler(async (req, res) => {
    const bookmarks = await Bookmark.find({ book_id: req.book.id});
    res.status(200).json(bookmarks);
});

//@desc Create new bookmark
//@route POST /api/bookmarks
//@access private
const createBookmark = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name, link} = req.body;
    if(!name || !link){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const bookmark = await Bookmark.create({
        book_id: req.book.id,
        name,
        link,
    });
    res.status(201).json(bookmark);
});

//@desc Get individual bookmark
//@route GET /api/bookmarks/:id
//@access private
const currentBookmark = asyncHandler(async (req, res) => {
    const bookmark = await Bookmark.findById(req.params.id);
    if(!bookmark){
        res.status(404);
        throw new Error("Bookmark not found");
    }
    res.status(200).json(bookmark);
});

//@desc Update bookmark
//@route PUT /api/bookmarks/:id
//@access private
const updateBookmark = asyncHandler(async (req, res) => {
    const bookmark = await Bookmark.findById(req.params.id);
    if(!bookmark){
        res.status(404);
        throw new Error("Bookmark not found");
    }

    if(bookmark.book_id.toString() !== req.book.id){
        res.statusCode(403);
        throw new Error("Book don't have permission to update other book bookmarks");
    }

    const updatedBookmark = await Bookmark.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } 
    )
    res.status(200).json(updatedBookmark);
});

//@desc Delete bookmark
//@route DELETE /api/bookmarks/:id
//@access private
const deleteBookmark = asyncHandler(async (req, res) => {
    const bookmark = await Bookmark.findById(req.params.id);
    if(!bookmark){
        res.status(404);
        throw new Error("Bookmark not found");
    }

    if(bookmark.book_id.toString() !== req.book.id){
        res.statusCode(403);
        throw new Error("Book don't have permission to update other book bookmarks"); 
    }

    await Bookmark.deleteOne({ _id: req.params.id }); 
    res.status(200).json(bookmark);
});

module.exports = { allBookmark, createBookmark, currentBookmark, updateBookmark, deleteBookmark };