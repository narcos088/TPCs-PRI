var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res) {
    axios.get('http://localhost:3000/api/atividades')
         .then(eventos => {
            res.render('index', {eventos: eventos.data})
         })
         .catch( erro => {
            console.log('Erro na listagem de eventos: ' + erro)
            res.render('error', {error: erro, message: 'Meu erro ins...'})
         })   
});

router.get('/:id', function(req, res) {
    axios.get('http://localhost:3000/api/atividades/' + req.params.id)
         .then(evento => res.render('evento', {evento: evento.data}))
         .catch( erro => {
            console.log('Erro na inserção do evento: ' + erro)
            res.render('error', {error: erro, message: 'Meu erro ins...'})
         })   
});

router.post('/', function(req, res) {
    axios.post('http://localhost:3000/api/atividades', req.body)
        .then(()=> res.redirect('http://localhost:3000/eventos'))
});

module.exports = router;