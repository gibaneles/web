
$(function() {
  let session = bd.selectId("session", bd.numRows("session")-1)
  let user = bd.selectId("user", session.id)
  console.log(bd.numRows("session")-1)
  $('#name').html(user.name)
  $('#phone').html(user.phone)
  $('#email').html(user.email)
  $('#address').html((user.address) ? user.address : 'Endereço não fornecido')

  $('#edit_profile').on('click', (e) => {
    $.get( "views/userprofile.html", function( data ) {
      $( ".page-content" ).empty().html(data)
    });
    let editHTML = '<div class="mdl-grid mdl-cell mdl-cell--12-col">'
              +     '<form action="#">'
              +     '<div class="mdl-cell mdl-cell--12-col">'
              +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
              +          '<input class="mdl-textfield__input" type="text" id="name_edit" value="'+user.name+'">'
              +          '<label class="mdl-textfield__label" for="name">Nome</label>'
              +        '</div>'
              +     '</div>'
              +     '<div class="mdl-cell mdl-cell--12-col">'
              +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
              +          '<input class="mdl-textfield__input" type="number" pattern="\d*" id="phone_edit" value="'+user.phone+'">'
              +          '<label class="mdl-textfield__label" for="phone">Telefone</label>'
              +          '<span class="mdl-textfield__error">Precisa ser um numero!</span>'
              +        '</div>'
              +     '</div>'
              +     '<div class="mdl-cell mdl-cell--12-col">'
              +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
              +          '<input class="mdl-textfield__input" type="email" id="email_edit" value="'+user.email+'">'
              +          '<label class="mdl-textfield__label" for="email">Email</label>'
              +        '</div>'
              +     '</div>'
              +     '<div class="mdl-cell mdl-cell--12-col">'
              +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
              +          '<input class="mdl-textfield__input" type="text" id="address_edit" value="'+((user.address) ? user.address : "")+'">'
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
            if($('#name_edit').val() != ''
            && $('#phone_edit').val() != ''
            && $('#email_edit').val() != ''
            && $('#address_edit').val() != '') {
              user.name = $('#name_edit').val()
              user.phone = $('#phone_edit').val()
              user.email = $('#email_edit').val()
              user.address = $('#address_edit').val()
              bd.update("user", user.id, user)
              swal({
                  title: "Sucesso!",
                  text: "Seus dados foram alterados!",
                  type: "success"
              },
              function(){
                  setTimeout(function(){
                      $.get( "views/userprofile.html", function( data ) {
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
  
});