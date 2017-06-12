$(function() {

  let tableHTML = '<div class="mdl-grid mdl-cell mdl-cell--12-col">'
                 +   '<table class="text-center" id="order_table" style="width: 100%;">'
                 +      '<tr class="display-title"><th>Cliente</th><th>Pedido</th><th>Total</th></tr>'
                 +   '</table>'
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
    
    $('#order_table').append('<tr id="product_id-'+order.id+'" data-id="'+order.id+'"><td class="display-item">'+order.owner+'</td><td id="list-'+order.id+'" class="display-item"></td>')
    
    let total = 0
    let selector = '#list-'+order.id
    for(product of order_items) {
      $(selector).append(product.name+' x'+product.quantity)
      total += parseInt(product.price) * parseInt(product.quantity)
    }
    
    selector = '#product_id-'+order.id
    $(selector).append('<td class="display-item">R$'+total+'</td>')    
    
  }
  
})
