const express = require("express");
const app = express();
const timingsheet = require("./routes/timingsheet");
const timingregister = require("./routes/timingregister");

const morgan = require("morgan");

app.use(express.json());
app.use(morgan("tiny"));

// GET /api/timingsheet
app.use("/api/timingsheet", timingsheet);
// POST /api/timingregiter
app.use("/api/timingregister", timingregister);

module.exports = app;
