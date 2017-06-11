$(function() {  
    let users = bd.select("user")
    let found_admin = false
    for(user of users) {
      if(user.username == "admin") {
        found_admin = true
        break
      }
    }
    if(!found_admin) bd.insert("user", {username:"admin",userpass:"admin",name:"Admin",phone:"-",email:"-"})
   
    $( "#login" ).submit(function( event ) {
        event.preventDefault();
        let username = $('#username').val()
        let userpass = $('#userpass').val()
        let users = bd.select("user")
          let login = false
          for(user of users) {
              if((user.userpass === userpass)&&(user.username === username)) {
                  login = true
                  console.log(user)
                  bd.insert("session", user)
                  if(user.username == "admin") window.location.href = "admin.html"
                  else window.location.href = "user.html"
              }
          }
          if(login === false) {
              swal("Erro!", "Usuário ou senha inválidos!", "error")
          }
    })
    $( "#register" ).submit(function( event ) {
        event.preventDefault()
        let user = {
            username: $('#username').val(),
            userpass: $('#userpass').val(),
            name: $('#name').val(),
            phone: $('#phone').val(),
            email: $('#email').val()
        }
        let cadastro = true
        if(user.userpass !== $('#passrepeat').val()) {
            cadastro = false
            swal("Erro!", "As duas senhas devem ser iguais!", "error")
        } else if(user.userpass.length < 3) {
            cadastro = false
            swal("Erro!", "A senha deve pelo menos 3 caracteres!", "error")
        } else {
            console.log(user)
            if((user.username.length === 0)||(user.name.length === 0)||(user.phone.length === 0)||(user.email.length === 0)) {
                cadastro = false
                swal("Erro!", "Todos os campos são necessários!", "error")
            }
        }
        if(cadastro === true) {
            bd.insert("user", user)
            swal({
                title: "Sucesso!",
                text: "Cadastro realizado com sucesso!",
                type: "success"
            },
            function(){
                setTimeout(function(){
                    window.location.href = "login.html"
                }, 300)
            })
        }
    })
})