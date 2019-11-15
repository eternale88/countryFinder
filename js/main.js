

const countryForm = document.querySelector('#country-form')

if(countryForm) {
  countryForm.addEventListener('submit', fetchCountries)
}

// Fetch animals from API
function fetchCountries(e) {
  //Stop from submitting to a file
  e.preventDefault()

    //Get user input
    const country = document.querySelector('#country').value

    //Fetch the Pets
    fetch(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => err)
}