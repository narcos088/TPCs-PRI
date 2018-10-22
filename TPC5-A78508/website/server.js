var http = require('http')
var url = require('url')
var fs = require('fs')
var pug = require('pug')

var estilo = /w3\.css/
var index = /\/index/
var musica = /musica/

var n = 131;
var obj_aux = {};
var obj_tipos = {tipos:[]}
var obj_tipo = {}

for(var i = 1; i < n; i ++){
    var ficheiro = "data/json/m" + i + ".json"; 
    try {
        data = fs.readFileSync(ficheiro, 'utf-8')
        
        myObj = JSON.parse(data)

        var key = (({tipo}) => ({tipo}))(myObj);
        var value = (({ _id, titulo}) => ({ _id, titulo}))(myObj);

        if (!obj_aux[Object.values(key)]){
            obj_aux[Object.values(key)] = [];
        }
        obj_aux[Object.values(key)].push(value);
        
    } catch (err) {
        console.log('Escaxou ao ler o ficheiro JSON:' + i)
    }
}

for (var key in obj_aux) {
    if (obj_aux.hasOwnProperty(key)) {
        var obj_musicas = {}
        var obj_conjunto = {}

        obj_musicas.musicas = obj_aux[key]
        obj_conjunto.designacao = key
        obj_conjunto.conjunto = obj_musicas
        
        var tipo = 'tipo'
        if(!obj_tipo[tipo]){
            obj_tipo[tipo] = []
        }
        obj_tipo[tipo].push(obj_conjunto)
    }
}

http.createServer((req,res)=>{
    var purl = url.parse(req.url,true)

    console.log(purl.path)

    if(index.test(purl.pathname)){
        obj_tipos.tipos = obj_tipo;
        console.log(obj_tipos)

        res.writeHead(200, {'content-type':'text/html'})
        res.write(pug.renderFile('index.pug',{ind: obj_tipos}))
        res.end();        
    }
    else if(estilo.test(purl.pathname)){
        fs.readFile("estilo/w3.css", (erro,dados)=>{
            res.writeHead(200, {'content-type':'text/css'})
            if(!erro){
                res.write(dados);
            }
            else{
                res.write("<p><b>Escaxou: </b>"+erro+"</p>")
            }
            res.end();
        })
    }
    else if(musica.test(purl.pathname)){
        var ficheiro = purl.pathname.split('/')[2] + ".json";
        console.log(ficheiro)
        fs.readFile("data/json/"+ficheiro, (erro,dados)=>{
            res.writeHead(200, {'content-type':'text/html'})
            if(!erro){
                obj_tipos = JSON.parse(dados)
                res.write(pug.renderFile('template.pug',{music: obj_tipos}))
            }
            else{
                res.write("<p><b>Escaxou: </b>"+erro+"</p>")
            }
            res.end();
        })
    }
    else{
        res.writeHead(200,'text/html')
        res.write("Escaxou!");
        res.end();
    }

}).listen(4005, ()=>{
    console.log('Servidor à escuta na porta 4005...')
})
