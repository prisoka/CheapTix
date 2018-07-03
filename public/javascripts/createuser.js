//if the business partner box is checked submit route to http://localhost:3000/newevent
//else submit route to http://localhost:3000/

const loginBtn = document.querySelector("#login_submit-form");
const createUserBtn = document.querySelector('create_submit-form');

const bCheckBox = document.getElementById('business_checkbox');
const uCheckBox = document.getElementById('user_checkbox');

document.addEventListener('DOMContentLoaded', function(){
	loginBtn.addEventListener('click', function(event){
    if (uCheckBox.checked) {
      console.log("HEY user IS CHECKED!")
    }
    if (bCheckBox.checked) {
      //route to index_business page
    }
  });
});
