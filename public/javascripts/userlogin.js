window.onload = function() {
  console.log('hellooooo!!!')
}

const apiUrl = 'http://localhost:3000';
// const apiUrl = 'https://cheaptix.herokuapp.com'; //change to http://localhost:3000/ to use locally
const loginUrl = apiUrl + '/login';


function login(event){
  console.log('HEY!')

  event.preventDefault(); // prevent the webpage from refreshing

  let email = document.getElementById('create_email_field').value;
  let password = document.getElementById('create_password_field').value;

  // fecth makes a network request
  fetch(loginUrl, {
    method: 'POST', // post HTTP method
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(response => {
    if (!response.ok){
      throw new Error('request failed')
    }
    return response.json()
  })
  .then(() => {
    console.log('CLEAR ME!')
    document.getElementById("create_user_form").reset();
  })
  .catch((error) => {
    console.log(error)
  })
}
