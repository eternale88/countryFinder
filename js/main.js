

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
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(res => res.json())
    .then((country) => { 
      console.log(country[0])
      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${country[0].flag}" class="img-thumbnail"/>
          </div>
          <div class="col-md-8">
          <h2><strong><em>${country[0].name}</em></strong></h2>
          <ul class="list-group">
          <li class="list-group-item"><strong>Capital:</strong> ${country[0].capital}</li>
          <li class="list-group-item"><strong>Region:</strong> ${country[0].region}</li>
          ${
            country[0].subregion 
            ? `<li class="list-group-item"><strong>Subregion:</strong> ${country[0].subregion}</li>`
            : ``
          }
         
          <li class="list-group-item"><strong>Capital:</strong> ${country[0].capital}</li>
          <li class="list-group-item"><strong>Capital:</strong> ${country[0].capital}</li>
          <li class="list-group-item"><strong>Capital:</strong> ${country[0].capital}</li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          </ul>
          </div>
        </div>
      `
      results.innerHTML = ''
      let doc = new DOMParser().parseFromString(output, 'text/html')
        results.appendChild(doc.body)
      

    })

    .catch(err => err)
    
}