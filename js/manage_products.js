$(function() {

  let tableHTML = '<div class="mdl-grid mdl-cell mdl-cell--12-col">'
                 +   '<table class="text-center" id="product_table" style="width: 100%;">'
                 +      '<tr class="display-title"><th>ID</th><th>Nome</th><th>Preço</th><th>Descrição</th><th></th></tr>'
                 +   '</table>'
                 +'</div>';
  
  $('#product_list').append(tableHTML);
  
  let products = bd.select("product")
  for(product of products) {
    $('#product_table').append('<tr id="product_id-'+product.id+'" data-id="'+product.id+'"><td class="display-item">'+product.id+'</td><td class="display-item">'+product.name+'</td><td class="display-item">'+product.price+'</td><td class="display-item">'+product.description+'</td><td class="display-item"><i class="material-icons accent clickable edit_product">mode_edit</i><i class="material-icons clickable accent delete_product">delete</i></td></tr>')
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
             +          '<label class="mdl-textfield__label" for="name">product_name</label>'
             +        '</div>'
             +     '</div>'
             +     '<div class="mdl-cell mdl-cell--12-col">'
             +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
             +          '<input class="mdl-textfield__input" type="number" pattern="\d*" step="any" id="product_price" value="'+product.price+'">'
             +          '<label class="mdl-textfield__label" for="phone">Preço</label>'
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

})
