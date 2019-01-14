var Ativ = require('../models/evento')

//Lista de eventos

module.exports.listar = () => {
    return Ativ   
        .find()
        .exec()
}

//Lista de eventos

module.exports.listarTipo = tipo => {
    return Ativ   
        .find({tipo: tipo})
        .sort({data: -1})
        .exec()
}

//Lista os eventos depois da data d
module.exports.listarData = data => {
    return Ativ   
        .find({data: {$gte: data}})
        .sort({data: -1})
        .exec()
}

//Lista os eventos naquela data
module.exports.listarDataExact = data => {
    return Ativ  
        .find({dta: data})
        .sort({data: -1})
        .exec()
}

//Devolve a informação do evento
module.exports.consultar = eid => {
    return Ativ  
        .findOne({_id: eid})
        .exec()
}

//Insere um evento na agenda
/*module.exports.inserir = evento => {
    var novo = new Evento(evento)
    return new Promise(function (fulfill,reject){
        novo.save(erro => {
            if (erro) reject({erro: "Erro no envio à DB."})
            else fulfill({ok: "Regsito inserido na BD"})
        })
    })  
}*/
module.exports.inserir = evento => {
    return Ativ.create(evento);  
}