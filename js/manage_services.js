$(function() {

  let tableHTML = '<div class="mdl-grid mdl-cell mdl-cell--12-col">'
                 +   '<div class="table text-center" id="service_table" style="width: 100%;">'
                 +      '<div class="row header blue"><div class="cell">ID</div><div class="cell">Nome</div><div class="cell">Preço (R$)</div><div class="cell">Descrição</div><div class="cell"></div></div>'
                 +   '</div>'
                 +'</div>';
  
  $('#product_list').append(tableHTML);
  
  let services = bd.select("service")
  for(service of services) {
    $('#service_table').append('<div id="product_id-'+service.id+'" data-id="'+service.id+'" class="row"><div class="cell">'+service.id+'</div><div class="cell">'+service.name+'</div><div class="cell">'+service.price+'</div><div class="cell">'+service.description+'</div><div class="cell"><i class="material-icons accent clickable edit_service">mode_edit</i><i class="material-icons clickable accent delete_service">delete</i></div></div>')
  }
  
  $('.edit_service').on('click', (e) => {
    let id = parseInt(e.currentTarget.parentElement.parentElement.dataset.id)
    console.log(id)
    bd.selectId("product", id)
    
    let editHTML = '<div class="mdl-grid mdl-cell mdl-cell--12-col">'
             +     '<form action="#">'
             +     '<div class="mdl-cell mdl-cell--12-col">'
             +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
             +          '<input class="mdl-textfield__input" type="text" id="service_name" value="'+service.name+'">'
             +          '<label class="mdl-textfield__label" for="service_name">Nome</label>'
             +        '</div>'
             +     '</div>'
             +     '<div class="mdl-cell mdl-cell--12-col">'
             +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
             +          '<input class="mdl-textfield__input" type="number" pattern="\d*" step="any" id="service_price" value="'+service.price+'">'
             +          '<label class="mdl-textfield__label" for="service_price">Preço (R$)</label>'
             +          '<span class="mdl-textfield__error">Precisa ser um numero!</span>'
             +        '</div>'
             +     '</div>'
             +     '<div class="mdl-cell mdl-cell--12-col">'
             +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
             +          '<input class="mdl-textfield__input" type="text" id="service_description" value="'+service.description+'">'
             +          '<label class="mdl-textfield__label" for="service_description">Descrição</label>'
             +        '</div>'
             +     '</div>'
             +     '</form>'
             + '</div>';

   showDialog({
     id: 'edit_profile-dialog',
     title: 'Editar dados de serviço',
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
           if($('#service_name').val() != ''
           && $('#service_price').val() != ''
           && $('#service_description').val() != ''
           ) {
             service.name = $('#service_name').val()
             service.price = $('#service_price').val()
             service.description = $('#service_description').val()
             bd.update("service", service.id, service)
             swal({
                 title: "Sucesso!",
                 text: "Os dados do serviço foram alterados!",
                 type: "success"
             },
             function(){
                 setTimeout(function(){
                     $.get( "views/manage_services.html", function( data ) {
                       $( ".page-content" ).empty().html(data)
                     });
                 }, 300)
             })
           } else {
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
  
    
  $('.delete_service').on('click', (e) => {
    let id = parseInt(e.currentTarget.parentElement.parentElement.dataset.id)
    console.log(id)
    let selector = '#product_id-'+id
    bd.delete("service", id)
    swal("Sucesso!", "O serviço foi excluído!", "success")
    $(selector).hide()
  })
  
  $('#new_service').on('click', (e) => {
    let editHTML = '<div class="mdl-grid mdl-cell mdl-cell--12-col">'
               +     '<form action="#">'
               +     '<div class="mdl-cell mdl-cell--12-col">'
               +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
               +          '<input class="mdl-textfield__input" type="text" id="service_name" value="">'
               +          '<label class="mdl-textfield__label" for="service_name">Nome</label>'
               +        '</div>'
               +     '</div>'
               +     '<div class="mdl-cell mdl-cell--12-col">'
               +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
               +          '<input class="mdl-textfield__input" type="number" pattern="\d*" step="any" id="service_price" value="">'
               +          '<label class="mdl-textfield__label" for="service_price">Preço (R$)</label>'
               +          '<span class="mdl-textfield__error">Precisa ser um numero!</span>'
               +        '</div>'
               +     '</div>'
               +     '<div class="mdl-cell mdl-cell--12-col">'
               +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
               +          '<input class="mdl-textfield__input" type="text" id="service_description" value="">'
               +          '<label class="mdl-textfield__label" for="service_description">Descrição</label>'
               +        '</div>'
               +     '</div>'
               +     '</form>'
               + '</div>';

     showDialog({
       id: 'edit_profile-dialog',
       title: 'Novo serviço',
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
             if($('#service_name').val() != ''
             && $('#service_price').val() != ''
             && $('#service_description').val() != ''
             ) {
               let service = {
                 name : $('#service_name').val(),
                 price : $('#service_price').val(),
                 description : $('#service_description').val()
               }
               
               bd.insert("service", service)
               swal({
                   title: "Sucesso!",
                   text: "O serviço foi cadastrado!",
                   type: "success"
               },
               function(){
                   setTimeout(function(){
                       $.get( "views/manage_services.html", function( data ) {
                         $( ".page-content" ).empty().html(data)
                       });
                   }, 300)
               })
             } else {
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
