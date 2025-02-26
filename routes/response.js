const express = require("express");
const router = express.Router();
const claudeController = require('../controllers/anthropic')

router.post("/", claudeController.generateRes); 
module.exports = router;
