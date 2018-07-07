// AJAX with fetch
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed")

  //get cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart"));

  // if cart exists
  if(cart) {
    // for each eventId in cart
    cart.eventIds.forEach((id) => {
      // fetch each event from server
      fetch('/events/'+id, {
          method: 'GET'
      })
      .then((response) => {
        return response.json()
      })
      .then((event) => {
        // add event to dom
        addEventToDom(event)
      })
      .catch((err) => {
      	console.log(err)
      })
    })
  } else {
    console.log('The cart is empty!')
  }
});

window.onload = function() {

}

function addEventToDom(event) {
	const eventCardHTML = `
	<div class="column is-one-quarter">
			<div class="card">
					<div class="card-image">
							<figure class="image is-2by1">
									<img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-0.3.5&s=264727722bf2479d73380e1170bb3f48&auto=format&fit=crop&w=750&q=80" alt="Placeholder image">
							</figure>
					</div>
          <div id="event_card" class="card-content" data-event-id="${event.id}" data-event-name="${event.event_name}">
							<div class="media">
									<div class="media-content">
											<p id="event_name_card" class="title is-4">${event.event_name}</p>
											<p class="subtitle is-6">${event.event_type}</p>
									</div>
							</div>

							<div class="content">
                <p>${event.description}</p>
							</div>
					</div>
			</div>
	</div>
	`
	console.log(eventCardHTML);

	const eventContainer = document.getElementById('eventContainer');
	eventContainer.innerHTML += eventCardHTML;
}
