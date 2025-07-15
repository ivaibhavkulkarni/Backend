const express = require("express")
const router = express.Router();
const { getAllUser, createUser } = require("../controllers/UserController");

router.get("/getalluser", getAllUser);
router.post("/createuser", createUser)

module.exports = router;