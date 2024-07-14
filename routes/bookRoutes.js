const express = require("express");
const router = express.Router();
const validateTokenUser = require("../middleware/validateTokenHandlerUser");
const validateTokenBook = require("../middleware/validateTokenHandlerBook");
const { allBook, createBook, loginBook, currentBook, updateBook, deleteBook } = require("../controllers/bookController");

router.use(validateTokenUser);
router.get("/all", allBook);
router.post("/create", createBook);
router.post("/login", loginBook);
router.get("/current/", validateTokenBook, currentBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;