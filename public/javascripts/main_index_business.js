window.onload = function() {
  console.log('hellooooo!!!')
}

// AJAX with fetch
document.addEventListener("DOMContentLoaded", function(event) {
  // console.log("DOM fully loaded and parsed")
  fetch('/events', {
      method: 'GET'
  })
  .then((response) => {
    return response.json()
  })
  .then((events) => {
    console.log(events) // represents success
		// for each event, create DOM elements to populate cards in the index
		events.forEach((event) => {
			addEventToDom(event);
		})
  })
	.catch((err) => {
		console.log(err)
	})
});

const apiUrl = 'http://localhost:3000';
const usersUrl = apiUrl + '/index_business';

// function to create DOM elements to populate cards in the index
function addEventToDom(event) {
	const eventCardHTML =`

  <div class="column is-one-quarter">
    <div class="card">

      <div class="card-image">
        <figure class="image is-2by1">
          <img src="https://cheaptix.herokuapp.com/rachel-lynette-french-609252-unsplash.jpg">
        </figure>
      </div>

      <div id="event_card" class="card-content" data-event-id="${event.id}">

        <div class="media">
          <div class="media-content">
            <p class="title is-4">${event.event_name}</p>
            <p class="subtitle is-6">${event.event_type}</p>
          </div>
        </div>

        <div class="content">
          <p>${event.description}</p>
        </div>

        <div class="content">

          <a id="delete_button" class="button is-danger is-outlined" onclick="showDeleteAlert(event)">Delete</a>
        </div>

      </div>
    </div>
  </div>
  `

	console.log(eventCardHTML);

	const eventContainer = document.getElementById('eventContainer');
	eventContainer.innerHTML += eventCardHTML;
}

//DELETE EVENT

function showDeleteAlert(event){
  event.preventDefault(); // prevent the webpage from refreshing

  var eventCard = event.target.parentElement.parentElement
  var eventId = eventCard.getAttribute("data-event-id")
  console.log('DELETE CLICKED, eventId=', eventId)

  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this event",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      deleteEvent(eventId, eventCard)
    }
  });
}

function deleteEvent(eventId, eventCard){
  // fecth makes a network request
  return fetch(`/events/${eventId}`, {
    method: 'DELETE', // delete HTTP method
  })
  .then((response) => {
    // all good? check the response
    console.log('response', response);
    if( response.status == 200 ) {
      // Backend DELETE went OK
      // remove the event card from the DOM
      var theCardColumn = eventCard.parentElement.parentElement
      theCardColumn.parentElement.removeChild(theCardColumn)
      swal("Poof! Your event has been deleted!", {
        icon: "success"
      })
    } else {
      swal("Oops, could not delete this event.", {
        defeat: true
      })
      throw new Error("Couldn't delete on backend, oops")
    }
  })
  .catch(error => console.log(error))
}
