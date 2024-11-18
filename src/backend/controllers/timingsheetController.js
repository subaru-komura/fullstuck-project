const timingsheetModel = require("../models/timingsheetModel");

exports.getAll = async (req, res) => {
  try {
    const timingsheet = await timingsheetModel.findAll();
    res.status(200).json(timingsheet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get timingsheet" });
  }
};

exports.registerTime = async (req, res) => {
  try {
    const record = req.body;
    await timingsheetModel.register(record);
    console.log("posted");
    res.status(201).json({ message: "Record created successfully" });
  } catch (err) {
    console.error("err");
    res.status(500).json({ error: "Failed to insert timingsheet" });
  }
};
