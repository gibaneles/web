
$(function() {
  let user = bd.selectId("session", bd.numRows("session")-1)
  let animals = bd.select("animal")
  let animal_count = 0
  for(animal of animals) {
    if(animal)
      {if(animal.owner = user.id) {
        animal_count++;
        console.log(animal)
        let animalHTML = '<div data-id="'+animal.id+'" id="animal-'+animal.id+'" class="mdl-grid mdl-cell mdl-cell--6-col">'
                      +    '<div class="mdl-cell mdl-cell--6-col-desktop mdl-cell--6-cell-tablet mdl-cell--12-col-phone animal-card text-center">'
                      +      '<div style="height: 10%;" class="display-title text-center">'+animal.name+'</div>'
                      +      '<div style="height: 90%; background: gray; border-radius: 500px;"></div>'
                      +    '</div>'
                      +    '<div class="mdl-cell mdl-cell--6-col-desktop mdl-cell--6-cell-tablet mdl-cell--12-col-phone product-card">'
                      +      '<div style="height: 10%;" class=""></div>'
                      +      '<div style="height: 90%;">'
                      +        '<table>'
                      +          '<tr>'
                      +            '<td class="display-title">Espécie: </td>'
                      +            '<td class="display-item">'+animal.species+'</td>'
                      +          '</tr>'
                      +          '<tr>'
                      +            '<td class="display-title">Raça: </td>'
                      +            '<td class="display-item">'+animal.breed+'</td>'
                      +          '</tr>'
                      +          '<tr>'
                      +            '<td class="display-title">Idade: </td>'
                      +            '<td class="display-item">'+animal.age+'</td>'
                      +          '</tr>'
                      +          '<tr>'
                      +            '<td class="display-title">Peso: </td>'
                      +            '<td class="display-item">'+animal.weight+'</td>'
                      +          '</tr>'
                      +        '</table>'
                      +      '<i class="material-icons accent clickable edit_animal">mode_edit</i><i class="material-icons accent clickable delete_animal">delete</i></div>'
                      +    '</div>'
                      +  '</div>';

        $('#animal_list').append(animalHTML)        }
    }
  }
  console.log(animal_count)
  if(animal_count == 0) $('#animal_list').append('Nenhum animal encontrado. Cadastre um animal')

  $('#new_animal').on('click', (e) => {
    console.log('new animal')
    let insertHTML = '<div class="profile_picture"></div>'
                    +'<form action="#">'
                    +  '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                    +    '<input class="mdl-textfield__input" type="text" id="animal_name">'
                    +    '<label class="mdl-textfield__label" for="animal_name">Nome</label>'
                    +  '</div>'
                    +  '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                    +    '<input class="mdl-textfield__input" type="text" id="animal_species">'
                    +    '<label class="mdl-textfield__label" for="animal_species">Espécie</label>'
                    +  '</div>'
                    +  '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                    +    '<input class="mdl-textfield__input" type="text" id="animal_breed">'
                    +    '<label class="mdl-textfield__label" for="animal_breed">Raça</label>'
                    +  '</div>'
                    +  '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                    +    '<input class="mdl-textfield__input" type="text" id="animal_age">'
                    +    '<label class="mdl-textfield__label" for="animal_age">Idade</label>'
                    +  '</div>'
                    +  '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
                    +    '<input class="mdl-textfield__input" type="text" id="animal_weight">'
                    +    '<label class="mdl-textfield__label" for="animal_weight">Peso</label>'
                    +  '</div>'
                    +'</form>';

    showDialog({
      id: 'new_animal-dialog',
      title: 'Novo Animal',
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
          title: 'Cadastrar Animal',
          onClick: function() {

            let animal = {
              owner : user.id,
              name : $('#animal_name').val(),
              species : $('#animal_species').val(),
              breed : $('#animal_breed').val(),
              age : $('#animal_age').val(),
              weight : $('#animal_weight').val()
            }
            bd.insert("animal", animal)
            swal({
                title: "Sucesso!",
                text: "Animal cadastrado com sucesso!",
                type: "success"
            },
            function(){
                setTimeout(function(){
                    $.get( "views/animals.html", function( data ) {
                      $( ".page-content" ).empty().html(data)
                    });
                }, 300)
            })
          }
      },
      cancelable: true,
      contentStyle: {'max-width': '330px'},
      onLoaded: function() {  },
      onHidden: function() {  }
    })
  })

  $('.delete_animal').on('click', (e) => {
    console.log('delete '+e.currentTarget.parentElement.parentElement.parentElement.dataset.id)
    bd.delete("animal", e.currentTarget.parentElement.parentElement.parentElement.dataset.id)
	swal("Sucesso!", "O animal foi apagado.", "success")
    $.get( "views/animals.html", function( data ) {
      $( ".page-content" ).empty().html(data)
    });
  })

  $('.edit_animal').on('click', (e) => {
    let animal = bd.selectId("animal", e.currentTarget.parentElement.parentElement.parentElement.dataset.id)
    console.log(animal)
    $.get( "views/animals.html", function( data ) {
      $( ".page-content" ).empty().html(data)
    });
    let editHTML = '<div class="mdl-grid mdl-cell mdl-cell--12-col">'
              +     '<form action="#">'
              +     '<div class="mdl-cell mdl-cell--12-col">'
              +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
              +          '<input class="mdl-textfield__input" type="text" id="animal_name" value="'+animal.name+'">'
              +          '<label class="mdl-textfield__label" for="animal_name">Nome</label>'
              +        '</div>'
              +     '</div>'
              +     '<div class="mdl-cell mdl-cell--12-col">'
              +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
              +          '<input class="mdl-textfield__input" type="text" id="animal_species" value="'+animal.species+'">'
              +          '<label class="mdl-textfield__label" for="animal_species">Espécie</label>'
              +        '</div>'
              +     '</div>'
              +     '<div class="mdl-cell mdl-cell--12-col">'
              +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
              +          '<input class="mdl-textfield__input" type="text" id="animal_breed" value="'+animal.breed+'">'
              +          '<label class="mdl-textfield__label" for="animal_breed">Raça</label>'
              +        '</div>'
              +     '</div>'
              +     '<div class="mdl-cell mdl-cell--12-col">'
              +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
              +          '<input class="mdl-textfield__input" type="number" id="animal_age" value="'+animal.age+'">'
              +          '<label class="mdl-textfield__label" for="animal_age">Idade</label>'
              +        '</div>'
              +     '</div>'
              +     '<div class="mdl-cell mdl-cell--12-col">'
              +        '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">'
              +          '<input class="mdl-textfield__input" type="number" id="animal_weight" value="'+animal.weight+'">'
              +          '<label class="mdl-textfield__label" for="animal_weight">Peso</label>'
              +        '</div>'
              +     '</div>'
              +     '</form>'
              + '</div>';

    showDialog({
      id: 'edit_animal-dialog',
      title: 'Editar dados do animal',
      text: editHTML,
      negative: {
          id: 'cancel-button',
          title: 'Cancelar',
          onClick: function() { }
      },
      positive: {
          id: 'ok-button',
          title: 'Salvar',
          onClick: function() {
            if($('#animal_name').val() != ''
            && $('#animal_owner').val() != ''
            && $('#animal_species').val() != ''
            && $('#animal_breed').val() != ''
            && $('#animal_age').val() != ''
            && $('#animal_weight').val() != '') {
              animal.name = $('#animal_name').val()
              animal.owner = user.id
              animal.species = $('#animal_species').val()
              animal.breed = $('#animal_breed').val()
              animal.age = $('#animal_age').val()
              animal.weight = $('#animal_weight').val()
              bd.update("animal", animal.id, animal)
              swal({
                  title: "Sucesso!",
                  text: "Os dados do animal foram alterados!",
                  type: "success"
              },
              function(){
                  setTimeout(function(){
                      $.get( "views/animals.html", function( data ) {
                        $( ".page-content" ).empty().html(data)
                      });
                  }, 300)
              })
            } else {
              //console.log($('#email').val())
              swal("Erro!", "Você não preencheu corretamente os campos!", "error")
            }

          }
      },
      cancelable: true,
      contentStyle: {'max-width': '380px'},
      onLoaded: function() {  },
      onHidden: function() {  }
    })
  })

})
