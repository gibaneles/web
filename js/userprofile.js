
$(function() {
    let user = bd.selectId("session", bd.numRows("session")-1)

    $('#name').html(user.name)
    $('#phone').html(user.phone)
    $('#email').html(user.email)
    $('#address').html((user.address) ? user.address : 'Endereço não fornecido')
  
});