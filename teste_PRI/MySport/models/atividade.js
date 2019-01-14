var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AtividadeSchema = new Schema(
    {
        texto: {type: String, required: true},
        autor: {type: String, required: true},
        hash: {type: String, required: true}
    }
)

module.exports = mongoose.model('Ativ', AtividadeSchema, 'atividades')