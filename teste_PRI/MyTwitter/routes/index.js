var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get('/', function(req, res) {
  axios.get('http://localhost:3000/api/entradas')
       .then(entradas => {
          res.render('index', {entradas: entradas.data})
       })
       .catch( erro => {
          console.log('Erro na listagem de eventos: ' + erro)
          res.render('error', {error: erro, message: 'Meu erro ins...'})
       })   
});

router.post('/', function(req, res) {
  axios.post('http://localhost:3000/api/entradas', req.body)
      .then(()=> res.redirect('http://localhost:3000/'))
});

module.exports = router;
