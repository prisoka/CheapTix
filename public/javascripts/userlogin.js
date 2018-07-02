//if the business partner box is checked submit route to http://localhost:3000/newevent
//else submit route to http://localhost:3000/

const submitButton = document.querySelector("#submit-form")
const user = document.getElementById('user_checkbox');
const business = document.getElementById('business_checkbox');

document.addEventListener('DOMContentLoaded', function(){
	submitButton.addEventListener('click', function(event){
    if (user.checked) {
      console.log("HEY SUER IS CHECKED!")
    }
    if (business.checked) {
      //route to index_business page
    }
  });
