$(function() {
  let users = bd.select("user")
  let user_count = 0
  for (user of users) {
   user_count++
   if(user.username != "admin") {
     let userHTML = '<div data-id="'+user.id+'" id="user-'+user.id+'" class="mdl-grid mdl-cell mdl-cell--6-col">'
                      +    '<div class="mdl-cell mdl-cell--6-col-desktop mdl-cell--6-cell-tablet mdl-cell--12-col-phone animal-card text-center">'
                      +      '<div style="height: 10%;" class="display-title text-center">'+user.username+'</div>'
                      +      '<div style="height: 90%; background: gray; border-radius: 500px;"></div>'
                      +    '</div>'
                      +    '<div class="mdl-cell mdl-cell--6-col-desktop mdl-cell--6-cell-tablet mdl-cell--12-col-phone product-card">'
                      +      '<div style="height: 10%;" class=""></div>'
                      +      '<div style="height: 90%;">'
                      +        '<table>'
                      +          '<tr>'
                      +            '<td class="display-title">Nome: </td>'
                      +            '<td class="display-item">'+user.name+'</td>'
                      +          '</tr>'
                      +          '<tr>'
                      +            '<td class="display-title">Fone: </td>'
                      +            '<td class="display-item">'+user.phone+'</td>'
                      +          '</tr>'
                      +          '<tr>'
                      +            '<td class="display-title">E-Mail: </td>'
                      +            '<td class="display-item">'+user.email+'</td>'
                      +          '</tr>'
                      +          '<tr>'
                      +            '<td class="display-title">Endereço: </td>'
                      +            '<td class="display-item">'+((user.address) ? user.address : 'Endereço não fornecido')+'</td>'
                      +          '</tr>'
                      +        '</table>'
                      +      '<i class="material-icons accent clickable edit_user">mode_edit</i>'
                      +      '<i class="material-icons accent clickable delete_user">delete</i></div>'
                      +    '</div>'
                      +  '</div>';

        $('#user_list').append(userHTML)
    }
  }
  console.log(user_count)
  if(user_count == 0) $('#user_list').append('Nenhum usuário encontrado. Cadastre usuários!')

  $('#new_user').on('click', (e) => {
    console.log('new user')
    let insertHTML = '<div class="profile_picture"></div>'
                    +'<form action="#">'
                    +  '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                    +    '<input class="mdl-textfield__input" type="text" id="user_username">'
                    +    '<label class="mdl-textfield__label" for="user_username">Nome de usuário</label>'
                    +  '</div>'
  					+  '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                    +    '<input class="mdl-textfield__input" type="password" id="user_password">'
                    +    '<label class="mdl-textfield__label" for="user_password">Senha</label>'
                    +  '</div>'
  					+  '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                    +    '<input class="mdl-textfield__input" type="password" id="user_passrepeat">'
                    +    '<label class="mdl-textfield__label" for="user_passrepeat">Repetir senha</label>'
                    +  '</div>'
                    +  '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                    +    '<input class="mdl-textfield__input" type="text" id="user_name">'
                    +    '<label class="mdl-textfield__label" for="user_name">Nome</label>'
                    +  '</div>'
                    +  '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                    +    '<input class="mdl-textfield__input" type="text" id="user_phone">'
                    +    '<label class="mdl-textfield__label" for="user_phone">Phone</label>'
                    +  '</div>'
                    +  '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                    +    '<input class="mdl-textfield__input" type="text" id="user_email">'
                    +    '<label class="mdl-textfield__label" for="user_email">E-Mail</label>'
                    +  '</div>'
                    +'</form>';

    showDialog({
      id: 'new_user-dialog',
      title: 'Novo Usuário',
      text: insertHTML,
      negative: {
          id: 'cancel-button',
          title: 'Cancelar',
          onClick: function() {
            $('.mdl-textfield__input').val("")
          }
      },
      positive: {
          id: 'ok-button',
          title: 'Cadastrar Usuário',
          onClick: function() {

            let user = {
              username : $('#user_username').val(),
              name : $('#user_name').val(),
              phone : $('#user_phone').val(),
              email : $('#user_email').val(),
              userpass : $('#user_password').val()
            }
            if(user.userpass != $('#user_passrepeat').val()) {
              event.preventDefault()
              swal("Erro!", "As senhas devem ser iguais!", "error")
              return
            }

            bd.insert("user", user)
            swal({
                title: "Sucesso!",
                text: "Usuário cadastrado com sucesso!",
                type: "success"
            }
			,
            function(){
                setTimeout(function(){
                    $.get( "views/manage_userprofile.html", function( data ) {
                      $( ".page-content" ).empty().html(data)
                    });
                }, 300)
            })
          }
      },
      cancelable: true,
      contentStyle: {'max-width': '330px'},
      onLoaded: function() {  },
      onHidden: function() {  }
    })
  })

 $('.delete_user').on('click', (e) => {
   console.log(e.currentTarget.parentElement.parentElement.parentElement)
   console.log('delete '+e.currentTarget.parentElement.parentElement.parentElement.dataset.id)
   bd.delete("user", e.currentTarget.parentElement.parentElement.parentElement.dataset.id)
   swal("Sucesso!", "O usuário foi apagado.", "success")
   $.get( "views/manage_userprofile.html", function( data ) {
     $( ".page-content" ).empty().html(data)
   });
 })


 $('.edit_user').on('click', (e) => {
   let user = bd.selectId("user", e.currentTarget.parentElement.parentElement.parentElement.dataset.id)
   console.log(user)
   $.get( "views/manage_userprofile.html", function( data ) {
     $( ".page-content" ).empty().html(data)
   });
   let editHTML = '<div class="mdl-grid mdl-cell mdl-cell--12-col">'
             +     '<form action="#">'
             +     '<div class="mdl-cell mdl-cell--12-col">'
             +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
             +          '<input class="mdl-textfield__input" type="text" id="name" value="'+user.name+'">'
             +          '<label class="mdl-textfield__label" for="name">Nome</label>'
             +        '</div>'
             +     '</div>'
             +     '<div class="mdl-cell mdl-cell--12-col">'
             +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
             +          '<input class="mdl-textfield__input" type="number" pattern="\d*" id="phone" value="'+user.phone+'">'
             +          '<label class="mdl-textfield__label" for="phone">Telefone</label>'
             +          '<span class="mdl-textfield__error">Precisa ser um numero!</span>'
             +        '</div>'
             +     '</div>'
             +     '<div class="mdl-cell mdl-cell--12-col">'
             +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
             +          '<input class="mdl-textfield__input" type="email" id="email" value="'+user.email+'">'
             +          '<label class="mdl-textfield__label" for="email">Email</label>'
             +        '</div>'
             +     '</div>'
             +     '<div class="mdl-cell mdl-cell--12-col">'
             +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
             +          '<input class="mdl-textfield__input" type="text" id="address" value="'+((user.address) ? user.address : "")+'">'
             +          '<label class="mdl-textfield__label" for="address">Endereço</label>'
             +        '</div>'
             +     '</div>'
             +     '</form>'
             + '</div>';

   showDialog({
     id: 'edit_profile-dialog',
     title: 'Editar dados de perfil',
     text: editHTML,
     negative: {
         id: 'cancel-button',
         title: 'Cancelar',
         onClick: function() { }
     },
     positive: {
         id: 'ok-button',
         title: 'Salvar',
         onClick: function() {
           if($('#name').val() != ''
           && $('#phone').val() != ''
           && $('#email').val() != ''
           && $('#address').val() != '') {
             user.name = $('#name').val()
             user.phone = $('#phone').val()
             user.email = $('#email').val()
             user.address = $('#address').val()
             bd.update("user", user.id, user)
             swal({
                 title: "Sucesso!",
                 text: "Os dados foram alterados!",
                 type: "success"
             },
             function(){
                 setTimeout(function(){
                     $.get( "views/manage_userprofile.html", function( data ) {
                       $( ".page-content" ).empty().html(data)
                     });
                 }, 300)
             })
           } else {
             console.log($('#email').val())
             swal("Erro!", "Você não preencheu corretamente os campos!", "error")
           }

         }
     },
     cancelable: true,
     contentStyle: {'max-width': '380px'},
     onLoaded: function() {  },
     onHidden: function() {  }
   })
 })

})
