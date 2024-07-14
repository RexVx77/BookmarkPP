const mongoose = require("mongoose");

const bookmarkSchema = mongoose.Schema(
    {
        book_id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Book",
        },
        name:{
            type: String,
            required: [true, "Please add the bookmark name"],
        },
        link:{
            type: String,
            required: [true, "Please add the bookmark link"],
        },
},{
    timestamps: true,
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);