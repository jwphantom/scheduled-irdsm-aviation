const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const competitionSchema = mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true }
});

module.exports = mongoose.model("Competition", competitionSchema);
