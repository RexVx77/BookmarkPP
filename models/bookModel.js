const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name:{
            type: String,
            required: [true, "Please add the book name"],
        },
        count:{
            type: Number,
        },
},{
    timestamps: true,
});

module.exports = mongoose.model("Book", bookSchema);