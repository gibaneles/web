
$(function() {
  $("#calendario").hide()
    $('.select_service').on('click', (e) => {
      $('.select_service').removeClass('accent')
      event.target.className += " accent"
    })
  $( "#datepicker" ).datepicker()
  $( "#datepicker" ).datepicker( "option", "dateFormat", 'dd/mm/yy' )
  $( "#datepicker" ).change(function(e) {
    $( "#datepicker-modal" ).val($( "#datepicker" ).val())
    if(bd.numRows("service-"+$( "#datepicker" ).val()) === 0) {
      for(let i = 0; i < 10; i++){
        bd.insert("service-"+ $( "#datepicker" ).val(), { user_id: null, servico: null, animal: null, disponivel: true })
      }
    }
    let services = bd.select("service-"+ $( "#datepicker" ).val())
    for(service of services) {
      if(service) {
        if(service.disponivel === true) {
          $("#service-"+(service.id)+" > div:nth-child(2)").html("Disponível")
          $("#service-"+(service.id)+" > div:nth-child(3)").html("Disponível")
          $("#service-"+(service.id)+" > div:nth-child(4)").html("Disponível")
        }
        if(service.disponivel === false) {
          $("#service-"+(service.id)+" > div:nth-child(2)").html(service.service.name)
          $("#service-"+(service.id)+" > div:nth-child(3)").html(service.animal.name)
          $("#service-"+(service.id)+" > div:nth-child(4)").html("R$"+parseFloat(service.service.price).toFixed(2))
        }
      }
    }
    $("#calendario").show()
  })
  $("#agendar").click(function(e) {
    if(bd.numRows("animal") === 0) {
          swal({
              title: "Erro!",
              text: "Cadastre um animal primeiramente para prosseguir.",
              type: "error"
          }
          ,
          function(){
              setTimeout(function(){
                  $.get( "views/animals.html", function( data ) {
                    $( ".page-content" ).empty().html(data)
                  });
              }, 300)
          })
    } 
    else if(bd.numRows("service") === 0) {
          swal({
              title: "Erro!",
              text: "Não existe nenhum serviço disponível.",
              type: "error"
          })
    } 
    else {
      let animals = bd.select("animal")
      let selectAnimals = ''

      for(animal of animals) {
        if(animal) {
          selectAnimals = selectAnimals + '<option value="'+animal.id+'">'+animal.name+'</option>'
        }
      }
      
      let services = bd.select("service")
      let selectServices = ''

      for(service of services) {
        if(service) {
          selectServices = selectServices + '<option value="'+service.id+'">'+service.name+' - R$'+parseFloat(service.price).toFixed(2)+'</option>'
        }
      }
      
      let insertHTML = '<div class="profile_picture"></div>'
                      +'<form action="#">'
                      + '<p>Date: <input type="text" id="datepicker-modal" size="30"></p>'
                      +  '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                      +    '<select id="slot_id">'
                      +       '<option value="-1">Selecione um horário</option>'
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
                      +   '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                      +    '<select id="service_id">'
                      +       selectServices
                      +    '</select>'
                      +  '</div>'
                      +  '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                      +    '<input class="mdl-textfield__input" type="text">'
                      +    '<label class="mdl-textfield__label" for="service_valor">Cartão de crédito</label>'
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
              let servico = {
                service : bd.selectId("service", $('#service_id').val()),
                animal : bd.selectId("animal", $('#animal_id').val()),
                disponivel : false,
                id: $('#slot_id').val()
              }

              bd.update("service-"+$('#datepicker-modal').val(), $('#slot_id').val(), servico)
              console.log(bd.selectId("service-"+$('#datepicker-modal').val(), $('#slot_id').val()))
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
          $("#slot_id").hide()
          $( "#datepicker-modal" ).datepicker()
          $( "#datepicker-modal" ).datepicker( "option", "dateFormat", 'dd/mm/yy' )
          $( "#datepicker-modal" ).change(function(e) {
            $( "#datepicker" ).val($( "#datepicker-modal" ).val())
            $("#slot_id").show()
            $('#slot_id').val('-1')
            if(bd.numRows("service-"+$( "#datepicker-modal" ).val()) === 0) {
              for(let i = 0; i < 10; i++){
                bd.insert("service-"+ $( "#datepicker-modal" ).val(), { service: null, animal: null, disponivel: true, id: i })
              }
            }
            let services = bd.select("service-"+ $( "#datepicker-modal" ).val())
            console.log(services)
            for(service of services) {  
              if(service) {
                if(service.disponivel === false) {
                  $('#slot_id > option:nth-child('+(parseInt(service.id)+2)+')').hide()
                } else {
                  $('#slot_id > option:nth-child('+(parseInt(service.id)+2)+')').show()
                }
              }
            }
          })
        },
        onHidden: function() {  }
      })
    }
  })
  
});
