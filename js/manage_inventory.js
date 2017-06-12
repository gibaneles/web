$(function() {

  let tableHTML = '<div class="mdl-grid mdl-cell mdl-cell--12-col">'
                 +   '<table class="text-center" id="product_table" style="width: 100%;">'
                 +      '<tr class="display-title"><th>ID</th><th>Nome</th><th>Estoque</th><th></th><th>Movimentar Estoque</th></tr>'
                 +   '</table>'
                 +'</div>';
  
  $('#product_list').append(tableHTML);
  
  let products = bd.select("product")
  for(product of products) {
    $('#product_table').append('<tr id="product_id-'+product.id+'" data-id="'+product.id+'"><td class="display-item">'+product.id+'</td><td class="display-item">'+product.name+'</td><td class="display-item" id="product_stock-'+product.id+'">'+product.stock+'</td><td class="display-item"></td><td class="display-item"><input class="mdl-textfield__input" id="move_product-'+product.id+'" style="display: inline; width: 50px; margin-right: 5px;" type="number"><i class="material-icons accent clickable plus">add_circle</i><i class="material-icons accent clickable minus">remove_circle</i></td></tr>')
  }
  
  $('.plus').on('click', (e) => {
    let id = parseInt(e.currentTarget.parentElement.parentElement.dataset.id)
    console.log(e.currentTarget.parentElement.parentElement)
    let selector = '#move_product-'+id  
    let quantity = $(selector).val()
    console.log(quantity)
    if(quantity != '') {
      console.log('add')
      
      let product = bd.selectId("product", id)
      product.stock = parseInt(product.stock) + parseInt(quantity)
      console.log(product)
      bd.update("product", id, product) 
      $.get( "views/manage_inventory.html", function( data ) {
         $( ".page-content" ).empty().html(data)
       });
      swal("Sucesso!", "Estoque modificado.", "success")
    } else {
      swal("Erro!", "Preencha um valor válido", "error")
    }
  })
  
  $('.minus').on('click', (e) => {
    let id = parseInt(e.currentTarget.parentElement.parentElement.dataset.id)
    console.log(e.currentTarget.parentElement.parentElement)
    let selector = '#move_product-'+id  
    let quantity = $(selector).val()
    console.log(quantity)
    if(quantity != '') {
      console.log('add')
      
      let product = bd.selectId("product", id)
      product.stock = parseInt(product.stock) - parseInt(quantity)
      if(parseInt(product.stock) < 0) product.stock = 0
      console.log(product)
      bd.update("product", id, product) 
      $.get( "views/manage_inventory.html", function( data ) {
         $( ".page-content" ).empty().html(data)
       });
      swal("Sucesso!", "Estoque modificado.", "success")
    } else {
      swal("Erro!", "Preencha um valor válido", "error")
    }
  })
})
