const User = require("../models/User");

// GET semua data
exports.getUsers = async (req, res) => {
  try {
    console.log("GET USERS KE PANGGIL");

    const data = await User.find();

    console.log("DATA:", data);

    res.json(data);
  } catch (error) {
    console.error("ERROR GET USERS:", error);
    res.status(500).json({ message: error.message });
  }
};

// FILTER
exports.filterUsers = async (req, res) => {
  try {
    let query = {};

    if (req.query.age) {
      query.age = { $gt: Number(req.query.age) };
    }

    if (req.query.city) {
      query.city = req.query.city;
    }

    const data = await User.find(query);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// INSERT
exports.createUser = async (req, res) => {
  try {
    const data = new User(req.body);
    await data.save();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateUser = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};