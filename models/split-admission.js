const mongoose = require("mongoose");

const splitAdmissionSchema = mongoose.Schema({
    competiton: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Competition"
        }
    ],
    min: { type: Number },
    max: { type: Number },
    dateString: { type: String },
    createAt: { type: String }
});

module.exports = mongoose.model("splitAdmission", splitAdmissionSchema);
