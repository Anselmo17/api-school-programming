const mongoose = require('../database/dbMongoose');

const Schema = mongoose.Schema;

// modelagem do banco
const AlunoSchema = new Schema({
    name_aluno: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    class_shift: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    name_teacher: {
        type: String,
        required: true
    },
    module_curse: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('aluno', AlunoSchema);
