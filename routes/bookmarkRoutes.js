const express = require("express");
const router = express.Router();
const validateTokenBook = require("../middleware/validateTokenHandlerBook");
const { allBookmark, createBookmark, currentBookmark, updateBookmark, deleteBookmark } = require("../controllers/bookmarkController");

router.use(validateTokenBook);

router.get("/all", allBookmark);
router.post("/create", createBookmark);
router.get("/current/:id", currentBookmark);
router.put("/update/:id", updateBookmark);
router.delete("/delete/:id", deleteBookmark);

module.exports = router;