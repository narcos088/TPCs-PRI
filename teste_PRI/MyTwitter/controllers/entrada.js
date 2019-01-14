var Entr = require('../models/entrada')

const Entries = module.exports

Entries.listar = () => {
    return Entr   
        .find()
        .exec()
}

Entries.inserir = entrada => {
    return Entr.create(entrada);  
}