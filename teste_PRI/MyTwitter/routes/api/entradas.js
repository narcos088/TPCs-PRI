var express = require('express');
var router = express.Router();
var Entr = require('../../controllers/entrada')

/* GET home page. */
router.get('/', function(req, res) {
    Entr.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem: '+ erro))
});

router.post('/', function(req, res) {
    Entr.inserir(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro no POST: '+ erro))
});

module.exports = router;