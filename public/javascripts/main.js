// AJAX with fetch
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed")
  fetch('/events', {
      method: 'GET'
  })
  .then((response) => {
    return response.json()
  })
  .then((events) => {
    console.log(events) // represents success
  })
	.catch((err) => {
		console.log(err)
	})
});
