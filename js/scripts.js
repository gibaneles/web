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
    })
    $( "#register" ).submit(function( event ) {
        event.preventDefault()
        let quantidadeUsuarios = bd.numRows("user")
        let user = {
            username: $('#username').val(),
            userpass: $('#userpass').val(),
            passrepeat: $('#passrepeat').val(),
            name: $('#name').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
        }
        

        /*if($('#userpass').val() === $('#passrepeat').val()) {
            swal("Erro!", "As duas senhas devem ser iguais!", "error")
        } else {*/
            bd.insert("user", user)
            //localStorage.setItem('user'+id, JSON.stringify(user))
            /*for (var index = 0; index <= id; index++) {
                console.log(JSON.parse(localStorage.getItem('user'+index)));
                
            }*/
        //}
    })
})