const timingregisterModel = require("../models/timingregisterModel");

exports.registerTime = async (req, res) => {
  try {
    const record = req.body;
    await timingregisterModel.register(record);
    res.status(201).json({ message: "Record created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to insert timingsheet" });
  }
};
