const mongoose = require('../database/dbMongoose');

const Schema = mongoose.Schema;

// modelagem do Usuario 
const UsuarioSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});


module.exports = mongoose.model('user', UsuarioSchema);