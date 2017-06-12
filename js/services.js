
$(function() {
  $("#calendario").hide()
    $('.select_service').on('click', (e) => {
      $('.select_service').removeClass('accent')
      event.target.className += " accent"
    })
  $( "#datepicker" ).datepicker()
  $( "#datepicker" ).datepicker( "option", "dateFormat", 'dd/mm/yy' )
  $( "#datepicker" ).change(function(e) {
    
    if(bd.numRows("service-"+$(this).val()) === 0) {
      for(let i = 0; i < 10; i++){
        bd.insert("service-"+ $(this).val(), { servico: null, animal: null, valor: null, disponivel: true })
      }
    }
    let services = bd.select("service-"+ $(this).val())
    for(service of services) {
      if(service) {
        if(service.disponivel === true) {
          $("#service-"+(service.id+1)+" > td:nth-child(2)").html("Disponível")
          $("#service-"+(service.id+1)+" > td:nth-child(3)").html("Disponível")
          $("#service-"+(service.id+1)+" > td:nth-child(4)").html("Disponível")
        }
        if(service.disponivel === false) {
          $("#service-"+(service.id+1)+" > td:nth-child(2)").html(service.servico)
          $("#service-"+(service.id+1)+" > td:nth-child(3)").html(service.animal.name)
          $("#service-"+(service.id+1)+" > td:nth-child(4)").html(service.valor)
        }
      }
    }
    $("#calendario").show()
  })
  $("#agendar").click(function(e) {
    let animals = bd.select("animal")
    console.log(animals)
    let selectAnimals = ''
    for(animal of animals) {
      if(animal) {
        selectAnimals = selectAnimals + '<option value="'+animal.id+'">'+animal.name+'</option>'
      }
    }
    let insertHTML = '<div class="profile_picture"></div>'
                    +'<form action="#">'
                    + '<p>Date: <input type="text" id="datepicker-modal" size="30"></p>'
  					+  '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                    +    '<select id="slot_id">'
                    +       '<option value="0">07:00 - 08:00</option>'
                    +       '<option value="1">08:00 - 09:00</option>'
                    +       '<option value="2">09:00 - 10:00</option>'
                    +       '<option value="3">10:00 - 11:00</option>'
                    +       '<option value="4">11:00 - 12:00</option>'
                    +       '<option value="5">13:00 - 14:00</option>'
                    +       '<option value="6">14:00 - 15:00</option>'
                    +       '<option value="7">15:00 - 16:00</option>'
                    +       '<option value="8">16:00 - 17:00</option>'
                    +       '<option value="9">17:00 - 18:00</option>'
                    +    '</select>'
                    +  '</div>'
                    +   '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                    +    '<select id="animal_id">'
                    +       selectAnimals
                    +    '</select>'
                    +  '</div>'
  					+  '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                    +    '<input class="mdl-textfield__input" type="number" id="service_valor">'
                    +    '<label class="mdl-textfield__label" for="service_valor">Valor</label>'
                    +  '</div>'
                    +'</form>';
    
    
    
    showDialog({
      id: 'new_user-dialog',
      title: 'Agendar serviço',
      text: insertHTML,
      negative: {
          id: 'cancel-button',
          title: 'Cancelar',
          onClick: function() {
            $('.mdl-textfield__input').val("")
          }
      },
      positive: {
          id: 'ok-button',
          title: 'Agendar Serviço',
          onClick: function() {
            console.log($('#animal_id').val())
            console.log(bd.selectId("animal", $('#animal_id').val()))
            let servico = {
              service : "teste",
              animal : bd.selectId("animal", $('#animal_id').val()),
              valor : $('#service_valor').val(),
              disponivel : false,
              id: ($('#slot_id').val()-1)
            }
              
            bd.update("service-"+$('#datepicker-modal').val(), $('#slot_id').val(), servico)
            console.log(bd.select("service-"+$('#datepicker-modal').val()))
            swal({
                title: "Sucesso!",
                text: "Serviço agendado com sucesso!",
                type: "success"
            }
			,
            function(){
              
                setTimeout(function(){
                    $.get( "views/services.html", function( data ) {
                      $( ".page-content" ).empty().html(data)
                    });
                }, 300)
            })
          }
      },
      cancelable: true,
      contentStyle: {'max-width': '330px'},
      onLoaded: function() { 
        $( "#datepicker-modal" ).datepicker()
        $( "#datepicker-modal" ).datepicker( "option", "dateFormat", 'dd/mm/yy' )
        if(bd.numRows("service-"+$( "#datepicker-modal" ).val()) === 0) {
          for(let i = 0; i < 10; i++){
            bd.insert("service-"+ $( "#datepicker-modal" ).val(), { servico: null, animal: null, valor: null, disponivel: true })
          }
        }
      },
      onHidden: function() {  }
    })
  })
  
});
