import './css/styles.css';
import Notiflix from 'notiflix';

import {fetchCountries} from "./fetchCountries.js"

const DEBOUNCE_DELAY = 300;
const textInput = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo=document.querySelector(".country-info");


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
         






//=====================================================

 textInput.addEventListener("input", debounce(onInput,DEBOUNCE_DELAY)
   );


function onInput (){
  const name = textInput.value.trim();
  fetchCountries(name)
  
     .then((data) =>{
      countryList.textContent='';
      countryInfo.textContent='';
     if (data.length>2&&data.length<=10){
      renderCountryList(data)
      
     };
     if (data.length===1){
      countryList.textContent='';
      renderCountryList(data)
      renderCountryAdditionalInfo(data)}
      if (data.length>10){
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        }
     
    }
    )

     .catch((error) => Notiflix.Notify.failure("Oops, there is no country with that name"))
}




function renderCountryList(data) {
  const markup = data
   .map((key) => `<li class="list-item"><img width="26" height="15" src="${key.flags.svg}"/><b>${key.name.common}</b></li>`)
   .join("")
   return countryList.insertAdjacentHTML('beforeend',markup);
  }

function renderCountryAdditionalInfo(data){

  const markup = data
  .map(({capital, population, languages}) => `<ul><li class="list-item"><p><b>Capital: </b>${capital}</p></li>
  <li class="list-item"><p><b>Population: </b>${population}</p></li>
  <li class="list-item"><p><b>Languages: </b>${Object.values(languages)}</p></li>
  </ul>`)
  .join("");
 
  return countryInfo.insertAdjacentHTML('beforeend',markup);
 }

 function clear(){

  countryList.innerHTML='';

 }

