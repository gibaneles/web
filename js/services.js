$(function() {
  
    $('.select_service').on('click', (e) => {
      $('.select_service').removeClass('accent')
      event.target.className += " accent"
    })
  
});

