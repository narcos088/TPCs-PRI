$(()=>{
    $('#tabela').load('http://localhost:4008/tabela')

    $('#submit').click(e => {

        e.preventDefault()
        var file = $('#ficheiro')[0].files[0];
        $('#tabela').append('<tr>'+
                                '<td>' + 
                                    '<a href= /'+file.name +' target="_blank">' +file.name +'</a>' + 
                                '</td>'+
                                '<td>' + 
                                    $('#desc').val() + 
                                '</td>'+
                            '</tr>')
        ajaxPost()
    })

    function ajaxPost(){

        const file = new FormData()
        file.append('ficheiro',$('#ficheiro')[0].files[0])
        file.append('desc', $('#desc').val())

        $.ajax({
            type:"POST",
            contentType:false,
            processData:false,
            url:"http://localhost:4008/ficheiro/guardar",
            data: file,
            mimeType:'multipart/form-data',
            success: p => alert('Ficheiro gravado com sucesso: '+ p),
            error: e => {
                alert('Erro no POST: '+ JSON.stringify(e))
                console.log('ERRO: ' + e)
            }
        })
        $('#ficheiro').val('')
        $('#desc').val('')
    }
})