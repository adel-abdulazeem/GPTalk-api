const express = require("express");
const router = express.Router();
const claudeController = require('../controllers/anthropic')
const cohereController = require('../controllers/cohere')

router.post("/", cohereController.generateRes); 
module.exports = router;
