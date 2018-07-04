window.onload = function() {
  console.log('hellooooo!!!')
  createUser(event);
}

const apiUrl = 'http://localhost:3000';
const usersUrl = apiUrl + '/users';


function createUser(event){
  console.log('HEY!')

  event.preventDefault(); // prevent the webpage from refreshing

  let username = document.getElementById('create_username').value;
  let email = document.getElementById('create_email_field').value;
  let password = document.getElementById('create_password_field').value;

  // fecth makes a network request
  fetch(usersUrl, {
    method: 'POST', // post HTTP method
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: username, email: email, password: password})
  })
  .then(response => response.json())
  .catch(error => console.log(error))
}
