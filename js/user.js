$(function() {

    $('#userprofile').on('click', (e) => {
      $.get( "views/userprofile.html", function( data ) {
        $( ".page-content" ).empty().html(data)
      });
    });

    $('#animals').on('click', (e) => {
      $.get( "views/animals.html", function( data ) {
        $( ".page-content" ).empty().html(data)
      });
    });

    $('#services').on('click', (e) => {
      $.get( "views/services.html", function( data ) {
        $( ".page-content" ).empty().html(data)
      });
    });

    $('#products').on('click', (e) => {
      $.get( "views/products.html", function( data ) {
        $( ".page-content" ).empty().html(data)
      });
    });

	$('#logout').on('click', (e) => {
		//apagar sessao
	  window.location.href = "index.html"
    });

});
