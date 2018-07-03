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

// function to create DOM elements to populate cards in the index
function addEventToDom(event) {
	const eventCard = `
	<div class="column">
			<div class="card">
					<div class="card-image">
							<figure class="image is-2by1">
									<img src="https://images.pexels.com/photos/167635/pexels-photo-167635.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Placeholder image">
							</figure>
					</div>
					<div class="card-content">
							<div class="media">
									<div class="media-content">
											<p class="title is-4">{{event.event_name}}</p>
											<p class="subtitle is-6">{{event.event_date}}</p>
									</div>
							</div>

							<div class="content">
									{{event.description}}
							</div>
							<div class="content">
									<a class="button">Buy Tickets</a>
							</div>
					</div>
			</div>
	</div>
	`
	const template = Handlebars.compile(eventCard);
	const html = template({event: event});
	console.log(html);

	const eventContainer = document.getElementById('eventContainer');
	eventContainer.innerHTML = html;
}
