function createUserFormSubmit(user){
  user.preventDefault(); // prevent the webpage from refreshing

  let username = document.getElementById('username').value;
	let email = document.getElementById('login_email-field').value;
  let password = document.getElementById('login_password-field').value;

  // fecth makes a network request
  fetch(usersUrl, {
    method: 'POST', // post HTTP method
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: username, email: email, password: password})
  })
  .then(response => response.json())
  .then(json => getUsers())
  .then(users => setUsers(users))
  .catch(error => console.log(error)

  console.log('HEY!')
}
