const express = require("express");
const router = express.Router();
const timingsheetController = require("../controllers/timingsheetController");

router.get("/", timingsheetController.getAll);

module.exports = router;
