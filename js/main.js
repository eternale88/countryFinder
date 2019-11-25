

const countryForm = document.querySelector('#country-form')
const results = document.querySelector('#results')
const result = document.querySelector('#result')


if(countryForm) {
  countryForm.addEventListener('submit', (e) => {
      //Stop from submitting to a file

    e.preventDefault()

    //Get user input
    const country = document.querySelector('#country').value

    fetchCountries(country)

  })
}

// Fetch animals from API
function fetchCountries(country) {

    //Fetch the Country
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(res => res.json())
    .then((country) => { 
      console.log(country[0].alpha2Code)
      let output = `
        <div class="row">
          <div class="col-md-6">
            <img src="${country[0].flag}" class="img-thumbnail"/>
            </div>
            <div class="col-md-6">
              <h2><strong><em>${country[0].name}</em></strong></h2>
              <a onclick="countrySelected('${country[0].alpha2Code}')" href="country.html" class="btn btn-primary mt-3">Country Details</a>
            </div>
          </div>
        </div>
      `
      results.innerHTML = ''
      let doc = new DOMParser().parseFromString(output, 'text/html')
        results.appendChild(doc.body)
      

    })

    .catch(err => err)

}

function countrySelected(id) {
  localStorage.setItem('alpha2Code', id )

  //move to individual country page automatically
  window.location = 'country.html'
  return false
}
// Fetch individual country  from API
function getCountry() {
  let country = localStorage.getItem('alpha2Code')
    
    //Fetch the Pets
     fetch(`https://restcountries.eu/rest/v2/alpha/${country}`)
    .then(res => res.json())
    .then((count) => { 
      console.log(count)
      // let population = converter.toWords(count.population)

      let output = `
      <div class="card card-body bg-light">

      <div class="row">
        <div class="col-6-md">
          <img src="${count.flag}" class="img-fluid img-thumbnail" style= "width: 70%;"/>
        </div>
        <div class="col-6-md ml-5">
          <h2 class="mt-5"><strong><em>${count.name}</em></strong></h2>
          <h2><em>${count.nativeName}</em></h2>
        </div>
      </div>
      <div class="row">
        <div class="col mt-5">
          <div class="card card-body bg-secondary">
              <ul class="list-group">
                <li class="list-group-item"><strong>Capital:</strong> ${count.capital}</li>
                <li class="list-group-item"><strong>Region:</strong> ${count.region}</li>

                <li class="list-group-item"><strong>Subregion:</strong> ${count.subregion}</li>
                ${
                  count.regionalBlocs[0] 
                  ? `<li class="list-group-item"><strong>Regional Intergovernmental Organization:</strong/> (${count.regionalBlocs[0].acronym}) - <span>${count.regionalBlocs[0].name}</span></li>`
                  : ``
                }
                
              
                <li class="list-group-item"><strong>Population:</strong> ${count.population}</li>
                <li class="list-group-item"><strong>Languages Spoken: <span>${count.languages.length} : </strong>
                ${
                count.languages.map((lang) => {
                    return ` <span>${lang.name}</span>`
                })
                }
                </li>
              
                <li class="list-group-item"><strong>Timezones: <span>${count.timezones.length} : </span></strong>
                  ${
                    count.timezones.map(timezone => ` <span>${timezone}</span>`)
                  }
                
                </li>
                <li class="list-group-item"><strong>Currencies:</strong>
                  ${
                    count.currencies.map(currency => ` <span>${currency.name}</span>`)
                  }
                
                </li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      
      `
      result.innerHTML = ''
      let doc = new DOMParser().parseFromString(output, 'text/html')
        result.appendChild(doc.body)
      

    })

    .catch(err => err)

}

