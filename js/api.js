let host = 'http://localhost:63995';
// var mainPhotoForCreatedProject = null;

$(document).ready(function(){

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
        console.log(document.querySelector('img').src);
        createProject(serializeFormJSON($(this)), document.querySelector('img').src) 
        event.preventDefault();
    })

});

// create user volunteer
function createUser(userArray) {
    $.ajax({
        url: host + '/api/user',
        type: 'POST',
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
                window.location.href = "main.html"
            } else {
                console.error('Помилка реєстрації');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error('Помилка реєстрації: ' + xhr + thrownError);
            // window.location.href = "main.html"
        }
    });

   
}

// create user volunteer
function createUserSponsor(userArray) {
    $.ajax({
        url: host + '/api/user',
        type: 'POST',
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
                // ???
                window.location.href = "main.html"
            } else {
                console.error('Помилка реєстрації');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error('Помилка реєстрації: ' + xhr + thrownError);
            // window.location.href = "main.html"
        }
    });
}


// create project
function createProject(data, imgBase64) {
    $.ajax({
        url: host + '/api/project',
        type: 'POST',
        contentType: "application/json",
        dataType: "json",
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

            if (xhr.status === 200) {
                // тут повинно бути id, записати юзера теж
                localStorage.userId = result
                // ???
                window.location.href = "main.html"
            } else {
                console.error('Помилка реєстрації');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error('Помилка реєстрації: ' + xhr + thrownError);
            // window.location.href = "main.html"
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