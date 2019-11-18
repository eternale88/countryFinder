

const countryForm = document.querySelector('#country-form')
const results = document.querySelector('#results')

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
    .then((country) => { 
      console.log(country[0].flag)
      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${country[0].flag}" class="img-thumbnail"/>
          </div>
        </div>
      `
      results.innerHTML = ''
      let doc = new DOMParser().parseFromString(output, 'text/html')
        results.appendChild(doc.body)
      

    })

    .catch(err => err)
    
}