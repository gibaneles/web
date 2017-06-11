
$(function() {
  let user = bd.selectId("session", bd.numRows("session")-1)

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