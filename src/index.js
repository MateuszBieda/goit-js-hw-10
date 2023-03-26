import './css/styles.css';

import {fetchCountries} from "./fetchCountries.js"

const DEBOUNCE_DELAY = 300;
const textInput = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo=document.querySelector(".country-info");

const countriesArray = [];
export {countriesArray};

let debounce = require('lodash.debounce');
//import debounce from 'lodash.debounce';

//  fetch (`https://restcountries.com/v3.1/name/${name}`)
//      .then(response => response.json())
//      .then(data => console.log(data))
//      .catch((error) => console.log(error));
     

// textInput.addEventListener("input", () => {
//     fetchCountries(name)
//           .then((name) => renderPosts(name))
//           .catch((error) => console.log("Oops, there is no country with that name"));
//       });





// textInput.addEventListener("input", () => {
//     let name;
//    return fetchCountries(name);
// });

//OPTION 2 -- THE BEST 
// function fetchCountries(name) {
//     return fetch(`https://restcountries.com/v3.1/name/${name}`)
//      .then(
//         (response) => {
//        if (!response.ok) {
//             throw new Error(response.status);
//         }
//         return response.json();
//          }
//      )
//     .then(data => {console.log(data);
//                   const test = data.map((key) => console.log(key.capital));
//                   })
//                 }


//OPTION 3 ----TEST 


// function fetchCountries(name) {
//   return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
//    .then(
//       (response) => {
//      if (!response.ok) {
//           throw new Error(response.status);
//       }
//       return response.json();
//        }
//    )
//     .then (data => {
//          const markup = data
//          .map((key) => `<li class="list-item new">${key.capital}</li>`)
//          .join("");
//          //countryList.insertAdjacentHTML('beforeend',markup);
//           countryList.textContent = name.currentTarget.value;
                 
                
//       }
//     )}
   
    // textInput.addEventListener("input", 
    // );

  // .then(data => {
  //   const markup = data
  //   .map((key) => `<li class="list-item new">${key.capital}</li>`)
  //   .join("");
  //   countryList.insertAdjacentHTML('beforeend',markup);
              
  //             })
              

// const markup = data
//   .map((key) => `<li class="list-item new">${key.name}</li>`)
//   .join("");
//   countryList.insertAdjacentHTML('beforeend',markup);



// function renderCountriesList (data) {
//   const markup = data
//   .map((key) => `<li class="list-item new">${key.capital}</li>`)
//   .join("");
//   countryList.insertAdjacentHTML('beforeend',markup);
            
// }

// // textInput.addEventListener("input", () => {
// //   fetchCountries()});
//=====================================================

 textInput.addEventListener("input", debounce(onInput,300)
   );


function onInput (){
  const name = textInput.value;
  fetchCountries(name)
     .then((data) =>{
     if (data.length ===1){
     renderCountryList(data)
     renderCountryAdditionalInfo(data)}
    }
    )

     .catch((error) => console.log(error));
}




function renderCountryList(data) {

  const markup = data
   .map((key) => `<li class="list-item"><img width="18" height="13" src="${key.flags.svg}"/>${key.name.common}</li>`)
   .join("")
   return countryList.insertAdjacentHTML('beforeend',markup);
  }

function renderCountryAdditionalInfo(data){

  const markup = data
  .map(({ capital, population, languages}) => `<ul><li class="list-item"><p><b>Capital: </b>${capital}</p></li>
  <li class="list-item"><p><b>Population: </b>${population}</p></li>
  <li class="list-item"><p><b>Languages: </b>${Object.values(languages)}</p></li>
  </ul>`)
  .join("")
  return countryList.insertAdjacentHTML('beforeend',markup);
 }


