// var requirejs = require('requirejs');

// requirejs.config({
//     //Pass the top-level main.js/index.js require
//     //function to requirejs so that node modules
//     //are loaded relative to the top-level JS file.
//     nodeRequire: require
// })

// const converter = requirejs('number-to-words')

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

// document.addEventListener('click', (e) => {
//   e.preventDefault()
//   getMovie()
  
// })


//     function employee(name, jobtitle, born)
// {
// 	this.name = name
// 	this.jobtitile = jobtitle
// 	this.born = born
// }

// var fred = new employee("Fred Flintstone", "Caveman", 1970)
// employee.prototype.salary = null
// fred.salary = 20000
// document.write(fred.salary)



// function constfuncs() {
//   var funcs = []
//    for(var i = 0; i < 10; i++) 
//    funcs[i] = function() { return i}
//    return funcs
// }
// var funcs = constfuncs()
// console.log(funcs[5] ())

// function Employee(firstName, lastName)
// {
//      this.firstName = firstName;
//      this.lastName = lastName;
// }
// Employee.prototype.setOccupation = function() {
// console.log('hello')}
// let guy = new Employee('ethan', 'R')
// console.log(guy.setOccupation())

// country page
