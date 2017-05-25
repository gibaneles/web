$(function() {
  
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