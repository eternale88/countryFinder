
const countryForm = document.querySelector('#country-form')
const results = document.querySelector('#results')
const result = document.querySelector('#result')

// Call flags on page load
// fetch initial country flags from API and display on page render

document.addEventListener('DOMContentLoaded', fetchFlags()
)


// get data from country form
if(countryForm) {
  countryForm.addEventListener('submit', (e) => {
      //Stop from submitting to a file

    e.preventDefault()

    //Get user input
    const country = document.querySelector('#country').value

      // Fetch country from API
    fetchCountries(country)

  })
}

