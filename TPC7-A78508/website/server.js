var express = require('express')
var http = require('http')
var logger = require('morgan')
var pug = require('pug')
var fs = require('fs')
var formidable = require('formidable')
var jsonfile = require('jsonfile')

var myBD = "ficheiros.json"
var obj = {}
var re_uploaded = /\uploaded\/.*/
  
var app = express()

app.use(logger('combined'))

app.all('*',(req, res, next) => {
    if(req.url != '/w3.css' && !re_uploaded.test(req.url))
        res.writeHead(200, {'content-type': 'text/html; charset=utf-8'})
    next()
})

app.get('/', (req, res) => {
    jsonfile.readFile(myBD, (erro, ficheiros)=>{
        if(!erro){
            res.write(pug.renderFile('pug/lista-alunos.pug', {listaFiles: ficheiros}))
            res.end()
        }
        else{
            console.log('Erro: ' + erro)
        }
    })
})

app.get(re_uploaded, (req,res) => {
    console.log(req.url)
    var file_name = req.url.split('/')[2]

    jsonfile.readFile(myBD, (erro, ficheiros)=>{
        //console.log(ficheiros)
        var result = ficheiros.filter((x)=>x.file.name == file_name);
        var type = result[0].file.type
        if(!erro){
            fs.readFile('.' + req.url,(erro, dados)=>{
                if(!erro){
                    res.writeHead(200, {'content-type': type})
                    res.write(dados)
                } 
                else res.write(pug.renderFile('pug/erro.pug', {e: erro}))
                res.end()
            })
        }
        else{
            console.log('Erro: ' + erro)
        }
    })
})

app.get('/w3.css', (req, res) => {
    res.writeHead(200, {'content-type': 'text/css'})
    fs.readFile('stylesheets/w3.css',(erro, dados)=>{
        if(!erro) res.write(dados)
        else res.write(pug.renderFile('pug/erro.pug', {e: erro}))
        res.end()
    })
})


app.post('/', (req, res) => {
    var form = new formidable.IncomingForm()
    form.parse(req, (erro,fields,files) =>{
        
        var fenviado = files.ficheiro.path
        var fnovo = './uploaded/'+files.ficheiro.name

        obj.file = files.ficheiro
        obj.desc = fields.desc
        obj.path = fnovo
        
        jsonfile.readFile(myBD, (erro, ficheiros)=>{
            if(!erro){
                ficheiros.push(obj)

                console.dir(ficheiros)
                jsonfile.writeFile(myBD, ficheiros, erro2 =>{
                    if(!erro2){
                        console.log('Registo gravado com Sucesso!')
                    }
                    else{
                        console.log('Erro: ' + erro2)
                    }
                })

                fs.rename(fenviado, fnovo, erro => {
                    if(!erro){
                        res.write(pug.renderFile('pug/lista-alunos.pug', {listaFiles: ficheiros}))
                        res.end()
                    }
                    else{
                        res.write(pug.renderFile('pug/erro.pug', {e : "Ocorreram erros na gravação do ficheiro enviado: " + erro}))
                        res.end()
                    }
                })
            }
            else{
                console.log('Erro: ' + erro)
            }
        })
    })
})

http.createServer(app).listen(4007)