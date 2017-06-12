$(function() {

    $('#manage_userprofile').on('click', (e) => {
      $.get( "views/manage_userprofile.html", function( data ) {
        $( ".page-content" ).empty().html(data)
      });
    });

    $('#manage_animals').on('click', (e) => {
      $.get( "views/manage_animals.html", function( data ) {
        $( ".page-content" ).empty().html(data)
      });
    });

    $('#manage_services').on('click', (e) => {
      $.get( "views/manage_services.html", function( data ) {
        $( ".page-content" ).empty().html(data)
      });
    });

    $('#manage_products').on('click', (e) => {
      $.get( "views/manage_products.html", function( data ) {
        $( ".page-content" ).empty().html(data)
      });
    });

    $('#manage_inventory').on('click', (e) => {
      $.get( "views/manage_inventory.html", function( data ) {
        $( ".page-content" ).empty().html(data)
      });
    });
  
    $('#manage_orders').on('click', (e) => {
      $.get( "views/manage_orders.html", function( data ) {
        $( ".page-content" ).empty().html(data)
      });
    });

	$('#logout').on('click', (e) => {
	  //apagar sessao
	  window.location.href = "index.html"
    });

});
