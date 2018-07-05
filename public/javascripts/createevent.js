window.onload = function() {
  console.log('I am the callback(s)')
  createEvent(event);
}

const apiUrl = 'http://localhost:3000';
const eventsUrl = apiUrl + '/events';


function createEvent(event){
  console.log('I am going to create an event!')

  event.preventDefault(); // prevent the webpage from refreshing

  let user_id = document.getElementById('user_id_createevent').value;
  let event_type = document.getElementById('event_type').value;
  let event_name = document.getElementById('event_name').value;
  let available_tickets = document.getElementById('available_tickets').value;
  let event_description = document.getElementById('event_description').value;
  let state = document.getElementById('state').value;
  let city = document.getElementById('city').value;
  let address1 = document.getElementById('address1').value;
  let address2 = document.getElementById('address2').value;
  let zip = document.getElementById('zip').value;

  // fecth makes a network request
  fetch(eventsUrl, {
    method: 'POST', // post HTTP method
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      user_id: user_id_createevent,
      event_type: event_type,
      event_name: event_name,
      // event_date: event_date,
      // event_time: event_time,
      available_tickets: available_tickets,
      description: event_description,
      state: state,
      city: city,
      address1: address1,
      address2: address2,
      zip: zip
    })
  })
  .then(response => response.json())
  // .then(() => {
  //     console.log('CLEAR ME!')
  //     document.getElementById("create_event_form").reset();
  // })
  .catch(error => console.log(error))
}
