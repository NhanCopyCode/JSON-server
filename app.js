var listCourseBlock = document.querySelector('ul');
var courseApi = 'http://localhost:3000/course';
function start() {
    getCourse(renderCourse);

    handleCreateCourse();
}

start();

function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data)
    }
    fetch(courseApi, options)
        .then(res => res.json())
        .then(callback)
}

function getCourse(callback) {
    fetch(courseApi)
        .then(res => res.json())
        .then(callback)

}


function renderCourse(courses) {
    var htmls = courses.map(function(course) {
        return `<li class = "course-item-${course.id}">
            <h3>${course.name}</h3>
            <p>${course.description}</p>
            <button onclick = "handleDeleteCourse(${course.id})">Delete</button>
            <button class = "getData-btn-${course.id}" onclick = "handleUpdateCourse(${course.id})">Get data</button>
        </li>`
    })
    listCourseBlock.innerHTML = htmls.join('');
}

function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    }
    fetch(courseApi + '/' + id, options)
        .then(res => res.json())
        .then(function() {
            var courseItem = document.querySelector('.course-item-' + id)
            if(courseItem) {
                courseItem.remove();
            }
        })
}
function handleCreateCourse() {
    var createBtn = document.querySelector('button')
    
    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        
        var course = {
            name: name,
            description: description
        }
        createCourse(course, function() {
            renderCourse()
        })
    }
}

function UpdateCourse(id, data) {
    var options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify(data)
    }
    fetch(courseApi + '/' + id, options)
        .then(res => res.json())
        .then(function() {
            getCourse(renderCourse);
        })
}

function handleUpdateCourse(id) {
    var getDataBtn = document.querySelector('.getData-btn-' + id)
    var parentElement = getDataBtn.parentElement;
    if(parentElement) {
        var name = parentElement.querySelector('h3').textContent;
        var description = parentElement.querySelector('p').textContent  ;

        var nameInput = document.querySelector('input[name="name"]')
        var descriptionInput = document.querySelector('input[name="description"]')

        nameInput.value = name;
        descriptionInput.value = description;

        var btnUpdate = document.querySelector('.btn-update')


        btnUpdate.onclick = function() {
            if(nameInput && descriptionInput) {
                var formData = {
                    name: nameInput.value,
                    description: descriptionInput.value
                }
                console.log(formData)
               UpdateCourse(id, formData)
            }
        }
    }
}


