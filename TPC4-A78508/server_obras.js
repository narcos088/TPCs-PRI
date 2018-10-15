var http = require('http')
var url = require('url')
var fs = require('fs')

http.createServer((req,res)=>{
    res.writeHead(200,{'COntent-Type':'text/html'})
    
    var purl = url.parse(req.url, true)
    var pathname = purl.pathname
    console.log(purl)
    var r = purl.query
    if(pathname == "/obra"){
        fs.readFile('./website/index.html', (erro, dados)=>{
            res.writeHead(200,{'COntent-Type':'text/html'})    
            if(!erro){
                res.write(dados)
            }
            else{
                res.write(erro)
            }
            res.end()
        })
    }
    else if(pathname == "/obras"){
        var search = purl.query
        var id = search.id
        var file_path = './website/html/obra' + id + '.html'

        fs.readFile(file_path, (erro, dados)=>{
            res.writeHead(200,{'COntent-Type':'text/html'})    
            if(!erro){
                res.write(dados)
            }
            else{
                res.write(erro)
            }
            res.end()
        })
    }
}).listen(4002, ()=>{
    console.log('Servidor à escuta na porta 4002...')
})