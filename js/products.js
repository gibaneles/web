$(function() {
  
  $('#cart').on('click', (e) => {
    
    showDialog({
      id: 'dialog-id',
      title: 'Carrinho de Compras',
      text: '<div style="background: red; width: 50px; height: 50px;"></div>',
      negative: {
          id: 'cancel-button',
          title: 'Cancel',
          onClick: function() { }
      },
      positive: {
          id: 'ok-button',
          title: 'OK',
          onClick: function() { }
      },
      cancelable: true,
      contentStyle: {'max-width': '500px'},
      onLoaded: function() {  },
      onHidden: function() {  }
    })
  })
  
})