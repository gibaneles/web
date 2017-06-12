$(function() {

  let tableHTML = '<div class="mdl-grid mdl-cell mdl-cell--12-col">'
                 +   '<div class="text-center table" id="order_table" style="width: 100%;">'
                 +      '<div class="row header blue"><div class="cell">Cliente</div><div class="cell">Pedido</div><div class="cell">Total</div></div>'
                 +   '</div>'
                 +'</div>';
  
  $('#order_list').append(tableHTML);
  
  let orders = bd.select("order")
  for(order of orders) {
    let products = order.order
    let order_items = []
    for (item of products) {  
      let product = bd.selectId("product", item.product)
      product.quantity = item.quantity
      order_items.push(product)
    }
    
    $('#order_table').append('<div class="row" id="product_id-'+order.id+'" data-id="'+order.id+'"><div class="row">'+order.owner+'</div><div id="list-'+order.id+'" class="cell"></div>')
    
    let total = 0
    let selector = '#list-'+order.id
    for(product of order_items) {
      $(selector).append(product.name+' x'+product.quantity)
      total += parseInt(product.price) * parseInt(product.quantity)
    }
    
    selector = '#product_id-'+order.id
    $(selector).append('<div class="row">R$'+total+'</div>')    
    
  }
  
})
