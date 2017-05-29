
$(function() {
    let user = bd.selectId("sessao", bd.numRows("sessao")-1)

    $('#name').val(user.name)
    console.log(user)
    
    $('#edit').on('click', (e) => {
      $('.mdl-textfield__input').prop('disabled', false);
      $('#edit').hide();
      $('#save').show();
      $('#attach').show();
    });
  
    $('#save').on('click', (e) => {
      $('.mdl-textfield__input').prop('disabled', true);
      $('#save').hide();
      $('#edit').show();
      $('#attach').hide();
    });
  
  
});