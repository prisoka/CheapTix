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
			addEventToDom(event)
		})
  })
	.catch((err) => {
		console.log(err)
	})
});

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
          <div id="event_card" class="card-content" data-event-id="${event.id}" data-event-name="${event.event_name}">
							<div class="media">
									<div class="media-content">
											<p id="event_name_card" class="title is-4">${event.event_name}</p>
											<p class="subtitle is-6">${event.event_date}</p>
									</div>
							</div>

							<div class="content">
									${event.description}
							</div>
							<div class="content">
									<a id="btnBuy" name="btnBuy" class="button is-primary" onclick="populateStorage()">Add to cart</a>
							</div>
					</div>
			</div>
	</div>
	`
	console.log(eventCardHTML);

	const eventContainer = document.getElementById('eventContainer');
	eventContainer.innerHTML += eventCardHTML;
}

function populateStorage() {
  console.log('Hey, im gonna send to localStorage')

  let eventCard = event.target.parentElement.parentElement
  let eventId = eventCard.getAttribute("data-event-id")
  // console.log('CLICKED, eventId=', eventId)

  let cart = JSON.parse(localStorage.getItem("cart"));

  if(cart){
    cart.eventIds.push(eventId);
    localStorage.setItem('cart', JSON.stringify(cart));
    swal({
      title: "Event added to cart",
      icon: "success",
      button: "Okay",
    })

  } else {
    localStorage.setItem('cart', JSON.stringify({eventIds: [eventId]}));
    swal({
      title: "Event added to cart",
      icon: "success",
      button: "Okay",
    })
  }
}
