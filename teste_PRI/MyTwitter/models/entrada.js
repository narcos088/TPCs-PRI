var mongoose = require('mongoose')
var Schema = mongoose.Schema

var EntradaSchema = new Schema(
    {
        texto: {type: String, required: true},
        autor: {type: String, required: true},
        hash: {type: String, required: true}
    }
)

module.exports = mongoose.model('Entr', EntradaSchema, 'entradas')