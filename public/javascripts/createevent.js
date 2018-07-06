window.onload = function() {
  console.log('I am the callback(s)')
  // createEvent(event);
}

const apiUrl = 'http://localhost:3000';
// const apiUrl = 'https://cheaptix.herokuapp.com'; //change to localhost/3000 to use locally
const eventsUrl = apiUrl + '/events';

document.getElementById('create_event_form').addEventListener("submit", (ev) => {
  ev.preventDefault()
  createEvent(ev)
})

function createEvent(ev){
  // console.log('I am going to create an event!')

  var form = ev.target
  // console.log('elements', form.elements)

  var bodyObj = {}
  for( var i=0; i<form.elements.length; i++ ) {
    var element = form.elements[i]
    bodyObj[element.name] = element.value
  }

  delete bodyObj.invalidCheck;
  delete bodyObj.cancel;
  delete bodyObj.submit;

  // console.log('bodyObj', bodyObj);

  fetch(eventsUrl, {
    method: 'POST', // post HTTP method
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(bodyObj)
  })
  .then(response => response.json())
  .then(() => {
      console.log('CLEAR ME!')
      document.getElementById("create_event_form").reset();
  })
  .catch(error => console.log(error))
}
