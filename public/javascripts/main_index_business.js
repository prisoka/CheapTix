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

window.onload = function() {
  console.log('hellooooo!!!')
  // deleteEvent(event);
}

const apiUrl = 'http://localhost:3000';
const usersUrl = apiUrl + '/index_business';

// function to create DOM elements to populate cards in the index
function addEventToDom(event) {
	const eventCardHTML = `
	<div class="column">
			<div class="card">
					<div class="card-image">
							<figure class="image is-2by1">
									<img src="https://images.pexels.com/photos/167635/pexels-photo-167635.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Placeholder image">
							</figure>
					</div>
					<div id="event_card" class="card-content" data-event-id="${event.id}">
							<div class="media">
									<div class="media-content">
                      <p class="title is-3"></p>
											<p class="title is-4">${event.event_name}</p>
											<p class="subtitle is-6">${event.event_date}</p>
									</div>
							</div>

							<div class="content">
									${event.description}
							</div>
							<div class="content">
									<a id="delete_button" class="button is-danger" onclick="deleteEvent(event)">Delete</a>
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
function deleteEvent(event){
  event.preventDefault(); // prevent the webpage from refreshing

  // event.target is the a tag
  var eventCard = event.target.parentElement.parentElement
  var eventId = eventCard.getAttribute("data-event-id")
  console.log('DELETE CLICKED, eventId=', eventId)


  // fecth makes a network request
  fetch(`/events/${eventId}`, {
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
    } else {
      throw new Error("Couldn't delete on backend, oops")
    }

  })
  .catch(error => console.log(error))
}
