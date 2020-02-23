let host = 'https://cleanfix-back-end.herokuapp.com/';
//let host = 'http://localhost:63996'

$(document).ready(function(){
    if ($('#accordion')[0]) {
        getProjects();
    }

    $('#volunteer-form').submit(function(event){
        // console.log( $(this).serializeArray() );
        createUser($(this).serializeArray()) 
        event.preventDefault();
    })

    $('#sponsor-form').submit(function(event){
        console.log( $(this).serializeArray() );
        createUserSponsor($(this).serializeArray()) 
        event.preventDefault();
    })

    $('#create-project-form').submit(function(event){
        // console.log(document.querySelector('img').src);
        createProject(serializeFormJSON($(this)), document.querySelector('img').src) 
        event.preventDefault();
    })

    $('#login-form').submit(function(event){
        login(serializeFormJSON($(this))) 
        event.preventDefault();
    })
});

// create user volunteer
function createUser(userArray) {
    $.ajax({
        url: host + '/api/user',
        type: 'POST',
        headers: {  'Access-Control-Allow-Origin': '*' },
        contentType: "application/json",
        data: JSON.stringify({
            name: userArray[1].value, // Прізвище ім'я по-батькові
            lastName: userArray[0].value,
            middleName: userArray[2].value,
            type: 0, // 0 - person, 1 - company
            email: userArray[4].value,
            phoneNumber: userArray[3].value, // optional
            password: userArray[5].value
        }),
        crossDomain: true,		
        success: function (result, textStatus, xhr) {

            if (xhr.status === 200) {
                // тут повинно бути id
                localStorage.userId = result
                // ???
                window.location.href = "list_projects.html";
            } else {
                console.log('Помилка реєстрації');
                window.location.href = "list_projects.html";
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log('Помилка реєстрації: ' + xhr + thrownError);
            window.location.href = "list_projects.html";
        }
    });

   
}

// create user volunteer
function createUserSponsor(userArray) {
    $.ajax({
        url: host + '/api/user',
        type: 'POST',
        headers: {  'Access-Control-Allow-Origin': '*' },
        contentType: "application/json",
        data: JSON.stringify({
            companyName: userArray[0].value, 
            type: 1, // 0 - person, 1 - company
            email: userArray[2].value,
            phoneNumber: userArray[1].value, // optional
            password: userArray[3].value
        }),
        crossDomain: true,		
        success: function (result, textStatus, xhr) {

            if (xhr.status === 200) {
                // тут повинно бути id, записати юзера теж
                localStorage.userId = result
                window.location.href = "list_projects.html";
            } else {
                window.location.href = "list_projects.html";
                console.log('Помилка реєстрації');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log('Помилка реєстрації: ' + xhr + thrownError);
            window.location.href = "list_projects.html";
            // window.location.href = "main.html"
        }
    });
}

// create project
function createProject(data, imgBase64) {
    $.ajax({
        url: host + '/api/project',
        type: 'POST',
        headers: {  'Access-Control-Allow-Origin': '*' },
        contentType: "application/json",
        data: JSON.stringify({
            name: data.name,
            description: data.description,
            category: data.category,
            solution: data.solution,
            mainPhoto: imgBase64,
            status: data.status,
            budget: parseFloat(data.budget),
            district: data.district, 
            location: data.location
        }),
        crossDomain: true,		
        success: function (result, textStatus, xhr) {
            window.location.href = "list_projects.html";
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console('Помилка реєстрації: ' + xhr + thrownError);
            window.location.href = "list_projects.html";
            //window.location.href = "main.html"
        }
    });
}

function previewFile() {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
  
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      preview.src = reader.result;
    }, false);
    
    if (file) {
      // this.mainPhotoForCreatedProject = reader.result; 
      reader.readAsDataURL(file);
      $('img').show();
    } else {
        this.mainPhotoForCreatedProject = null;
        $('img').hide()
    }
  }

function getProjects() {
    $.ajax({
        url: host + '/api/project',
        type: 'GET',
        headers: {  'Access-Control-Allow-Origin': '*' },
        contentType: "application/json",
        data: {},
        crossDomain: true,		
        success: function (result, textStatus, xhr) {
            // console.log(result);
            let html = " ";
            let numberWer = 7;
            let maxNumberWer = 16;
            for (let i=0; i<result.length; i++) {
                isImage = false;
                if (result[i].mainPhoto)
                    isImage = result[i].mainPhoto.split(';')[0].split('/')[1];
                
                // console.log(isImage);
                html+=`<div class="wer${numberWer}" href="#wer${numberWer}" data-parent="#accordion" data-toggle="collapse"><div class="panel panel">
                <div class="panel-heading column2">
                <div class="avatar">
                <img class="imgProject" src=${isImage ? result[i].mainPhoto : 'images/default.jpg'}> 
                </div>
                <h3 class="panel-title"> ${result[i].name ? result[i].name : 'Інформація відсутня'} </h3> 
                <a class="wer1" href="#collapse-${result[i].id}" data-parent="#accordion" data-toggle="collapse"><i class="fa fa-chevron-right" aria-hidden="true"></i></a>
                <div class="forbtn">
                  <button class="btn btn_spon" onclick="getProjects()">Стати волонтером</button>
                  <button class="myBtn btn btn_spon">Стати спонсором</button>
                </div>
                  <!---Modal window-->

                        </div>
                        <div id="collapse-${result[i].id}"class="panel-collapse collapse">
                          <div class="panel-body description_inf" >
                            <label for="name_place"> Назва:
                              <p class="name_place">${result[i].name ? result[i].name : 'Інформація відсутня'}</p>
                            </label>
                            <label for="name_district"> Район:
                              <p class="name_district">${result[i].district ? result[i].district  : 'Інформація відсутня'}</p>
                            </label>
                            <label for="name_stan"> Стан:
                              <p class="name_stan">${result[i].category ? result[i].category : 'Інформація відсутня' }</p>
                            </label>
                            <label for="name_description"> Опис:
                              <p class="name_description">${result[i].description ? result[i].description : 'Інформація відсутня'}</p>
                            </label>
                             <label for="name_solve"> Рішення:
                              <p class="name_solve">${result[i].solution ? result[i].solution : 'Інформація відсутня'}</p>
                            </label>
                      </div>
                    </div>
                </div>
              </div>
            `
            numberWer++;
            }
            
            $('#accordion').html(html);
            setButtons();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log('Помилка: ' + xhr + thrownError);
        }
    });

    
}

function setButtons(){
    var modal = document.getElementById('myModal');


$('.myBtn').click(function(event)
 {
  modal.style.display = "block";
 });


$('.close').click(function(event)
 {
  modal.style.display = "none";
 });

 $('.registration').click(function(event)
 {
  modal.style.display = "none";

  alert('Запит надіслано');
 });

$(window).click(function(event)
 {
  if (event.target == modal) {
    modal.style.display = "none";
  }
 });
}

// login user
function login(data) {
    $.ajax({
        url: host + '/api/user/' + data.email,
        type: 'GET',
        contentType: "application/json",
        data: { },
        crossDomain: true,	
        headers: {  'Access-Control-Allow-Origin': '*' },	
        success: function (result, textStatus, xhr) {
            window.location.href = "list_projects.html";
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //console.error('Помилка входу: ' + xhr + thrownError);
            window.location.href = "list_projects.html";
            // window.location.href = "main.html"
        }
    });
}

function serializeFormJSON (data) {
    var o = {};
    var a = data.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};