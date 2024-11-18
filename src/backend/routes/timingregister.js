const express = require("express");
const router = express.Router();
const timingregisterController = require("../controllers/timingregisterController");

router.post("/", timingregisterController.registerTime);

module.exports = router;
