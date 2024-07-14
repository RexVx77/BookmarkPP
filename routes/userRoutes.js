const express = require("express");
const router = express.Router();
const validateTokenUser = require("../middleware/validateTokenHandlerUser");
const { allUser, createUser, loginUser, currentUser, updateUser, deleteUser } = require("../controllers/userController");

router.get("/all", allUser);
router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/current", validateTokenUser, currentUser);
// router.put("/update", validateTokenUser, updateUser);
// router.delete("/delete", validateTokenUser, deleteUser);

module.exports = router;