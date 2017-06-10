$(function() {
  
  $('#cart').on('click', (e) => {
    
    showDialog({
      id: 'dialog-id',
      title: 'Carrinho de Compras',
      text: '<div style="background: red; width: 50px; height: 50px;"></div>',
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
  
  $('.product-header,.product-image').on('click', (e) => {
    let pid = $(this).parent().data('id')
    
    showDialog({
      title: 'Produto 1',
      text: 'Descricao do produto 1'
    })
  })
  
})

