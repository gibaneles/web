$(function() {
  
  let user = bd.selectId("session", bd.numRows("session")-1).username  
  let products = bd.select("product")
  let product_count = 0
  for(product of products) {
    if(product.stock > 0) {
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
    let cartHTML = '<div class="table" style="width: 100%; text-align: center;"><div class="row header blue"><div class="cell">Produto</div><div class="cell">Quantidade</div><div class="cell">Preço</div><div class="cell">Total</div><div class="cell"></div></div>'
    for(item of cart) {
      if(item.owner == user) {
        let product = bd.selectId("product", item.product_id)
        cartHTML += '<div class="row" data-id="'+item.id+'" id="cart_item-'+item.id+'"><div class="cell">'+product.name+'</div><div class="cell">'+item.quantity+'</div><div class="cell">R$'+product.price+'</div><div class="cell">R$'+(item.quantity*product.price)+'</div><div class="cell"><i class="material-icons delete_from_cart accent clickable">delete</i></div></div>'
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
          onClick: function() { 
            
            let ccHTML = '<div class="mdl-grid mdl-cell mdl-cell--12-col">'
                      +     '<form action="#">'
                      +     '<div class="mdl-cell mdl-cell--12-col">'
                      +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                      +          '<input class="mdl-textfield__input" type="text" id="cc_name">'
                      +          '<label class="mdl-textfield__label" for="cc_name">Nome no Cartão</label>'
                      +        '</div>'
                      +     '</div>'
                      +     '<div class="mdl-cell mdl-cell--12-col">'
                      +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                      +          '<input class="mdl-textfield__input" type="number" pattern="\d*" id="cc_number">'
                      +          '<label class="mdl-textfield__label" for="cc_number">Número do Cartão</label>'
                      +          '<span class="mdl-textfield__error">Precisa ser um numero!</span>'
                      +        '</div>'
                      +     '</div>'
                      +     '<div class="mdl-cell mdl-cell--12-col">'
                      +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                      +          '<input class="mdl-textfield__input" type="number" pattern="\d*" min="1" max="12" id="cc_exp_month">'
                      +          '<label class="mdl-textfield__label" for="cc_exp_month">Mês de Validade</label>'
                      +          '<span class="mdl-textfield__error">Precisa ser um numero!</span>'
                      +        '</div>'
                      +     '</div>'
                      +     '<div class="mdl-cell mdl-cell--12-col">'
                      +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                      +          '<input class="mdl-textfield__input" type="number" pattern="\d*" min="2017" max="2035" id="cc_exp_year">'
                      +          '<label class="mdl-textfield__label" for="cc_exp_year">Ano de Validade</label>'
                      +          '<span class="mdl-textfield__error">Precisa ser um numero!</span>'
                      +        '</div>'
                      +     '</div>'
                      +     '<div class="mdl-cell mdl-cell--12-col">'
                      +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                      +          '<input class="mdl-textfield__input" type="number" pattern="\d*" min="1" max="9999" id="sec_code">'
                      +          '<label class="mdl-textfield__label" for="sec_code">CSC</label>'
                      +          '<span class="mdl-textfield__error">Precisa ser um numero!</span>'
                      +        '</div>'
                      +     '</div>'
                      +     '</form>'
                      + '</div>';
            
            showDialog({
              id: 'payment-dialog',
              title: 'Pagamento',
              text: ccHTML,
              negative: {
                  id: 'cancel-button',
                  title: 'Cancelar',
                  onClick: function() { 
                    $('.mdl-textfield__input').val("")
                  }
              },
              positive: {
                  id: 'ok-button',
                  title: 'Pagar',
                  onClick: function() { 
                    let order = []
                    let cart = bd.select("cart")
                    for(item of cart) {
                      console.log(cart)
                      if(item.owner == user) { 
                        let product = bd.selectId("product", item.product_id)
                        product.stock -= item.quantity
                        if(parseInt(product.stock) < 0) product.stock = 0
                        bd.update("product", product.id, product)
                        order.push(
                          {product : item.product_id, quantity : item.quantity}
                        )
                        bd.delete("cart", item.id)
                      }
                    }
                    bd.insert("order", {owner : user, date : Date.now(), order : order})
                    swal("Compra efetuada com sucesso!", "", "success")
                  }
              },
              cancelable: true,
              contentStyle: {'max-width': '380px'},
              onLoaded: function() {  },
              onHidden: function() {  }
            })
          }
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

