const mongoose = require('mongoose');

const admissionSchema = mongoose.Schema({
  dateCreation: { type: Date },
  program: { type: String },
  concours: { type: String },
  fname: { type: String },
  email: { type: String },
  phone: { type: String },
  ville: { type: String },
  sexe: { type: String },
  age: { type: String },
  diplome: { type: String },
  center: { type: String },
  cF: { type: Boolean }
});


module.exports = mongoose.model('Admission', admissionSchema);