$(function() {
    $( "#login" ).submit(function( event ) {
        event.preventDefault();
        let username = $('#username').val()
        let userpass = $('#userpass').val()
        if((username === 'admin')&&(userpass === 'admin')) {
            swal("Sucesso!", "Login feito com sucesso!", "success")

        } else {
            swal("Erro!", "Usuário ou senha inválidos!", "error")
        }
    });
})
