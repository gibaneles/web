$(function() {
  
  let user = bd.selectId("session", bd.numRows("session")-1).username  
  let products = bd.select("product")
  let product_count = 0
  for(product of products) {
    product_count++
    let productHTML = '<div data-id="'+product.id+'" id="product-'+product.id+'" class="mdl-cell mdl-cell--3-col-desktop mdl-cell--6-cell-tablet mdl-cell--12-col-phone product-card text-center">'
                    +    '<div class="display-title text-center clickable product-header">'+product.name+' - R$'+product.price+'</div>'
                    +    '<div class="product-image clickable" style="background: gray;"></div>'
                    +    '<div class="text-center product-cart-row">'
                    +      '<form action="#">'
                    +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 80%;">'
                    +          '<input class="mdl-textfield__input" type="number" pattern="\d*" id="quantity-'+product.id+'">'
                    +          '<label class="mdl-textfield__label" for="quantity-'+product.id+'"></label>'
                    +          '<span class="mdl-textfield__error">Precisa ser um numero!</span>'
                    +        '</div>'
                    +        '<i class="material-icons accent clickable add_to_cart">add_shopping_cart</i>'    
                    +      '</form>'
                    +    '</div>'
                    + '</div>';  
    $('#product_list').append(productHTML)
  }
  if(product_count == 0) $('#product_list').append('Nenhum produto encontrado.')
  
  $('.product-header,.product-image').on('click', (e) => {
    let product = bd.selectId("product", e.currentTarget.parentElement.dataset.id)
    showDialog({
      title: product.name,
      text: product.description
    })
  })
  
  $('#cart').on('click', (e) => {
    
    let cart = bd.select("cart")
    let cartHTML = '<table style="width: 100%; text-align: center;"><tr><th>Produto</th><th>Quantidade</th><th>Preço</th><th>Total</th><th></th></tr>'
    for(item of cart) {
      if(item.owner == user) {
        let product = bd.selectId("product", item.product_id)
        cartHTML += '<tr data-id="'+item.id+'" id="cart_item-'+item.id+'"><td>'+product.name+'</td><td>'+item.quantity+'</td><td>R$'+product.price+'</td><td>R$'+(item.quantity*product.price)+'</td><td><i class="material-icons delete_from_cart accent clickable">delete</i></td></tr>'
      }
    }
    cartHTML += '</table>'
    showDialog({
      id: 'shopping_cart-dialog',
      title: 'Carrinho de Compras',
      text: cartHTML,
      negative: {
          id: 'cancel-button',
          title: 'Continuar Comprando',
          onClick: function() { }
      },
      positive: {
          id: 'ok-button',
          title: 'Finalizar Compra',
          onClick: function() { }
      },
      cancelable: true,
      contentStyle: {'max-width': '500px'},
      onLoaded: function() {  },
      onHidden: function() {  }
    })
    
    $('.delete_from_cart').on('click', (e) => {
      let id = e.currentTarget.parentElement.parentElement.dataset.id
      let selector = '#cart_item-'+id
      bd.delete("cart", id)
      $(selector).hide()
      swal("Item removido com sucesso!", "", "success")
    })
  })
  
  $('.add_to_cart').on('click', (e) => {
    let id = e.currentTarget.parentElement.parentElement.parentElement.dataset.id
    let selector = '#quantity-'+e.currentTarget.parentElement.parentElement.parentElement.dataset.id
    let quantity = $(selector).val()
    console.log(quantity)
    
    if(!Number.isInteger(parseInt(quantity))) {
      swal("Erro!", "Você não adicionou uma quantidade válida!", "error")
      e.preventDefault()
      return
    }
    
    let cart = bd.select("cart")
    let item_amount = 0
    for(item of cart) {
      if(item.product_id == id && item.owner == user)
        item_amount += item.quantity
    }
    
    let product = bd.selectId("product", id)
    if(parseInt(product.stock) < parseInt(quantity) + parseInt(item_amount)) {
      swal("Erro!", "Sentimos muito mas não há produtos suficiente em estoque!", "error")
      e.preventDefault()
      return
    }
    
    let cart_obj = {
      owner : user,
      product_id : id,
      quantity : parseInt(quantity) + parseInt(item_amount)
    }
    
    for(let i = 0; i < cart.length; i++) {
      if(cart[i].owner == user && cart[i].product_id == id) {
        cart_obj.id = cart[i].id
        bd.update("cart", cart[i].id, cart_obj)
        swal("Item adicionado com sucesso!", "", "success")
        return
      }
    }
    
    bd.insert("cart", cart_obj)
    swal("Item adicionado com sucesso!", "", "success")
  })

  
  
  
})

