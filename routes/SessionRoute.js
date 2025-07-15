const express = require("express")
const router = express.Router();

const { createSession, getMySessions, deleteById } = require("../controllers/SessionController")

router.post('/createsession',createSession)
router.get('/my-sessions', getMySessions);
router.delete("/:id", deleteById)


module.exports = router;