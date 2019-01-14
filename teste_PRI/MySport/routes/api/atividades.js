var express = require('express');
var router = express.Router();
var Ativ = require('../../controllers/atividade')

/* GET home page. */
router.get('/', function(req, res) {
    Ativ.listar()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem: '+ erro))
});

router.get('/:id', function(req, res) {
    Ativ.consultar(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na consulta: '+ erro))
});

router.get('/tipo/:t', function(req, res) {
    Ativ.listarTipo(req.params.t)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem por Tipo: '+ erro))
});

router.get('/data/:d', function(req, res) {
    Ativ.listarData(req.params.d)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem por Data: '+ erro))
});

router.get('/dataEx/:d', function(req, res) {
    Ativ.listarDataExact(req.params.d)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro na listagem por Data Exata: '+ erro))
});

router.post('/', function(req, res) {
    Ativ.inserir(req.body)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).send('Erro no POST: '+ erro))
});

module.exports = router;