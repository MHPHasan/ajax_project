import Axios from "axios";

// const URL = 'https://jsonplaceholder.typicode.com/users';


/* Ajax Project */
const BASE_URL = 'http://localhost:3000/Contacts';

const tbody = document.querySelector('#tbody');
let saveBtn = document.querySelector('#saveBtn')


//Create New Contact
function createNewContact() {
    let nameField = document.querySelector('#nameField')
    let phoneField = document.querySelector('#phoneField')
    let emailField = document.querySelector('#emailField')

    let contact = {
        name: nameField.value,
        phone: phoneField.value,
        email: emailField.value
    }

    Axios.post(BASE_URL, contact)
        .then(res => {
            createTd(res.data, tbody)

            nameField.value = ''
            phoneField.value = ''
            emailField.value = ''
        })
        .catch(err => console.error(err))


}


//Creating TR Element And Appending to it's parent Element
function createTd(contact, tbody) {
    const tr = document.createElement('tr')
          tbody.appendChild(tr)      

    let tdName = document.createElement('td')
        tdName.innerHTML = contact.name
        tr.appendChild(tdName)

    let tdPhone = document.createElement('td')
        tdPhone.innerHTML = contact.phone ? contact.phone : 'N/A';
        tr.appendChild(tdPhone)

    let tdEmail = document.createElement('td')
        tdEmail.innerHTML = contact.email ? contact.email : 'N/A';
        tr.appendChild(tdEmail)

    let tdAction = document.createElement('td')
        tr.appendChild(tdAction)

    let editBtn = document.createElement('button')
        editBtn.className = 'btn btn-warning'
        editBtn.innerHTML = 'Edit'
        tdAction.appendChild(editBtn)


        
        editBtn.addEventListener('click', function() {
            let mainModal = $('#exampleModal');
                mainModal.modal('toggle');

            let editName = document.querySelector('#recipient-name');
                editName.value = contact.name;
            let editPhone = document.querySelector('#recipient-phone');
                editPhone.value = contact.phone ? contact.phone : 'N/A';
            let editEmail = document.querySelector('#recipient-email');
                editEmail.value = contact.email ? contact.email : 'N/A';

                

            
            let saveContact = document.querySelector('#saveContact');
            saveContact.addEventListener('click', function() {
                upDate()
            })

            function upDate() {
                Axios.put(`${BASE_URL}/${contact.id}`, {
                    name: editName.value,
                    phone: editPhone.value,
                    email: editEmail.value
                })
                .then(res => {
                    tdName.innerHTML = res.data.name;
                    tdPhone.innerHTML = res.data.phone;
                    tdEmail.innerHTML = res.data.email;

                    mainModal.modal('hide');
                })
                .catch(err => console.error(err))
            }
        })

    let deleteBtn = document.createElement('button')
        deleteBtn.className = 'btn btn-danger'
        deleteBtn.innerHTML = 'Delete'
        tdAction.appendChild(deleteBtn)


    deleteBtn.addEventListener('click', function() {
        //Axios.delete(`${BASE_URL}/${contact.id}`)
        Axios.delete(BASE_URL + '/' + contact.id)
            .then(res => {
                tbody.removeChild(tr)
            })
            .catch(err => console.error(err))
        
    })
}


//Window onload function
window.onload = function(contact) {

    //Get data from server and fill the table when page loaded
    Axios.get(BASE_URL)
    .then(res => {
        res.data.forEach(data => {
            createTd(data, tbody)
        })
    })
    .catch(err => console.error(err))

    
    //Call createNewContact Function
    saveBtn.addEventListener('click', function(contact) {
        createNewContact()
    })

}




