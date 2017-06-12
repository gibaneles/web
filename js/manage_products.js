$(function() {

  let tableHTML = '<div class="mdl-grid mdl-cell mdl-cell--12-col">'
                 +   '<div class="text-center table" id="product_table" style="width: 100%;">'
                 +      '<div class="row header blue"><div class="cell">ID</div><div class="cell">Nome</div><div class="cell">Preço (R$)</div><div class="cell">Descrição</div><div class="cell"></div></div>'
                 +   '</div>'
                 +'</div>';
  
  $('#product_list').append(tableHTML);
  
  let products = bd.select("product")
  for(product of products) {
    $('#product_table').append('<div id="product_id-'+product.id+'" data-id="'+product.id+'" class="row"><div class="cell">'+product.id+'</div><div class="cell">'+product.name+'</div><div class="cell">'+product.price+'</div><div class="cell">'+product.description+'</div><div class="cell"><i class="material-icons accent clickable edit_product">mode_edit</i><i class="material-icons clickable accent delete_product">delete</i></div></div>')
  }
  
  $('.edit_product').on('click', (e) => {
    let id = parseInt(e.currentTarget.parentElement.parentElement.dataset.id)
    console.log(id)
    bd.selectId("product", id)
    
    let editHTML = '<div class="mdl-grid mdl-cell mdl-cell--12-col">'
             +     '<form action="#">'
             +     '<div class="mdl-cell mdl-cell--12-col">'
             +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
             +          '<input class="mdl-textfield__input" type="text" id="product_name" value="'+product.name+'">'
             +          '<label class="mdl-textfield__label" for="product_name">Nome</label>'
             +        '</div>'
             +     '</div>'
             +     '<div class="mdl-cell mdl-cell--12-col">'
             +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
             +          '<input class="mdl-textfield__input" type="number" pattern="\d*" step="any" id="product_price" value="'+product.price+'">'
             +          '<label class="mdl-textfield__label" for="product_price">Preço (R$)</label>'
             +          '<span class="mdl-textfield__error">Precisa ser um numero!</span>'
             +        '</div>'
             +     '</div>'
             +     '<div class="mdl-cell mdl-cell--12-col">'
             +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
             +          '<input class="mdl-textfield__input" type="text" id="product_description" value="'+product.description+'">'
             +          '<label class="mdl-textfield__label" for="product_description">Descrição</label>'
             +        '</div>'
             +     '</div>'
             +     '</form>'
             + '</div>';

   showDialog({
     id: 'edit_profile-dialog',
     title: 'Editar dados de produto',
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
           if($('#product_name').val() != ''
           && $('#product_price').val() != ''
           && $('#product_description').val() != ''
           ) {
             product.name = $('#product_name').val()
             product.price = $('#product_price').val()
             product.description = $('#product_description').val()
             bd.update("product", product.id, product)
             swal({
                 title: "Sucesso!",
                 text: "Os dados do produto foram alterados!",
                 type: "success"
             },
             function(){
                 setTimeout(function(){
                     $.get( "views/manage_products.html", function( data ) {
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
  
    
  $('.delete_product').on('click', (e) => {
    let id = parseInt(e.currentTarget.parentElement.parentElement.dataset.id)
    console.log(id)
    let selector = '#product_id-'+id
    bd.delete("product", id)
    swal("Sucesso!", "O produto foi excluído!", "success")
    $(selector).hide()
  })
  
  $('#new_product').on('click', (e) => {
    let editHTML = '<div class="mdl-grid mdl-cell mdl-cell--12-col">'
               +     '<form action="#">'
               +     '<div class="mdl-cell mdl-cell--12-col">'
               +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
               +          '<input class="mdl-textfield__input" type="text" id="product_name" value="">'
               +          '<label class="mdl-textfield__label" for="product_name">Nome</label>'
               +        '</div>'
               +     '</div>'
               +     '<div class="mdl-cell mdl-cell--12-col">'
               +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
               +          '<input class="mdl-textfield__input" type="number" pattern="\d*" step="any" id="product_price" value="">'
               +          '<label class="mdl-textfield__label" for="product_price">Preço (R$)</label>'
               +          '<span class="mdl-textfield__error">Precisa ser um numero!</span>'
               +        '</div>'
               +     '</div>'
               +     '<div class="mdl-cell mdl-cell--12-col">'
               +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
               +          '<input class="mdl-textfield__input" type="text" id="product_description" value="">'
               +          '<label class="mdl-textfield__label" for="product_description">Descrição</label>'
               +        '</div>'
               +     '</div>'
               +     '<div class="mdl-cell mdl-cell--12-col">'
               +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
               +          '<input class="mdl-textfield__input" type="number" step="1" id="product_stock" value="">'
               +          '<label class="mdl-textfield__label" for="product_stock">Estoque</label>'
               +        '</div>'
               +     '</div>'
               +     '</form>'
               + '</div>';

     showDialog({
       id: 'edit_profile-dialog',
       title: 'Novo produto',
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
             if($('#product_name').val() != ''
             && $('#product_price').val() != ''
             && $('#product_description').val() != ''
             && $('#product_stock').val() != ''
             ) {
               let product = {
                 name : $('#product_name').val(),
                 price : $('#product_price').val(),
                 description : $('#product_description').val(),
                 stock : $('#product_stock').val()
               }
               
               bd.insert("product", product)
               swal({
                   title: "Sucesso!",
                   text: "O produto foi cadastrado!",
                   type: "success"
               },
               function(){
                   setTimeout(function(){
                       $.get( "views/manage_products.html", function( data ) {
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
