var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var myBD = __dirname + "/ficheiros.json"
var formidable = require('formidable')
var fs = require('fs')
console.log('BD in: '+ __dirname)
/* GET home page. */
router.get('/', (req, res) => res.render('index'));

router.get('/tabela', (req, res) => {

  jsonfile.readFile(myBD, (erro, ficheiros)=>{
    if(!erro) res.render('tabela', {tabela: ficheiros})
    else res.json(erro)
  })
})

router.post('/ficheiro/guardar', (req, res) => {

  var form = new formidable.IncomingForm()
  form.parse(req, (erro,fields,files)=>{
      

      var fenviado = files.ficheiro.path
      
      var f = {name: files.ficheiro.name,
              descricao: fields.desc}
      
      var fnovo = './public/uploaded/'+files.ficheiro.name

      fs.rename(fenviado, fnovo, erro => {
          if(!erro){
              jsonfile.readFile(myBD, (erro, ficheiros) => {
                  if(!erro){
                      ficheiros.push(f)
                      console.dir(ficheiros)
                      jsonfile.writeFile(myBD, ficheiros, erro2 => {
                          if(!erro2) console.log("Registo gravado com sucesso!")
                          else console.log("Erro: " + erro2)
                      })
                  }
                  else{
                    console.log("Erro: " + erro)
                  }
              })
              res.end()
          }
          else{
              console.log('Ocorreu erro no rename')
              res.end()
          }
      })
  })
})

module.exports = router;
