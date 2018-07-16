window.onload = function() {
  console.log('hellooooo!!!')
}

//const apiUrl = 'http://localhost:3000';
const apiUrl = 'https://cheaptix.herokuapp.com'; //change to http://localhost:3000/ to use locally
const usersUrl = apiUrl + '/users';


function createUser(event){
  console.log('HEY!')

  event.preventDefault(); // prevent the webpage from refreshing

  let username = document.getElementById('create_username').value;
  let email = document.getElementById('create_email_field').value;
  let password = document.getElementById('create_password_field').value;
  // <<< come back TO HASH PASSWORD!!! >>>

  // fecth makes a network request
  fetch(usersUrl, {
    method: 'POST', // post HTTP method
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username: username,
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
    swal({
      title: "User created",
      text: "Welcome to CheapTix!",
      icon: "success",
      button: "Aww yiss!"
    })
    console.log('CLEAR ME!')
    document.getElementById("create_user_form").reset();
  })
  .catch((error) => {
    console.log(error)
    swal({
      title: "This email already exists",
      icon: "warning",
      button: "ok"
    })
  })
}
