$(function() {
  
  let user = bd.selectId("session", bd.numRows("session")-1).username  
  let products = bd.select("product")
  let product_count = 0
  for(product of products.entries()) {
    product_count++
    let productHTML = '<div data-id="'+product[0]+'" id="product-'+product[0]+'" class="mdl-cell mdl-cell--3-col-desktop mdl-cell--6-cell-tablet mdl-cell--12-col-phone product-card text-center">'
                    +    '<div class="display-title text-center clickable product-header">'+product[1].name+'</div>'
                    +    '<div class="product-image clickable"></div>'
                    +    '<div class="text-center product-cart-row">'
                    +      '<form action="#">'
                    +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 80%;">'
                    +          '<input class="mdl-textfield__input" type="number" pattern="\d*" id="quantity-'+product[0]+'">'
                    +          '<label class="mdl-textfield__label" for="quantity-'+product[0]+'"></label>'
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
    for(item of cart.entries()) {
      if(item[1].owner == user) {
        let product = bd.selectId("product", item[1].product_id)
        cartHTML += '<tr data-id="'+item[0]+'" id="cart_item-'+item[0]+'"><td>'+product.name+'</td><td>'+item[1].quantity+'</td><td>R$'+product.price+'</td><td>R$'+(item[1].quantity*product.price)+'</td><td><i class="material-icons delete_from_cart accent clickable">delete</i></td></tr>'
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
    if(parseInt(product.stock) < parseInt(quantity) + item_amount) {
      swal("Erro!", "Sentimos muito mas não há produtos suficiente em estoque!", "error")
      e.preventDefault()
      return
    }
    
    let cart_obj = {
      owner : user,
      product_id : id,
      quantity : quantity
    }
    bd.insert("cart", cart_obj)

  })
  
  
  
})

