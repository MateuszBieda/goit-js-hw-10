import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const textInput = document.querySelector("#search-box");
const name=""; 
const countriesArray = [];
export {countriesArray};
// function fetchCountries(name){
//     return fetch ("https://restcountries.com/v3.1/name/`${name}`")
//     .then( (response) =>{
//         if(!response.ok){
//             throw new Error('Parameter is not a letter!');
//         }
//         response.json();
//     } 
//     );
// }

// function fetchCountries(name){
//     return fetch ("https://restcountries.com/v3.1/name/`${name}`")
//     .then( (response) =>{
//         response.json();
//     } 
//     )
//     .then(data => console.log(data));
// }


fetch (`https://restcountries.com/v3.1/name/${name}`)
    .then(response => response.json())
    .then(data => console.log(data)) 


function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(
        (response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
        }
    )
    .then(data =>console.log(data))
}

textInput.addEventListener("input", () => {
    fetchCountries(name)
          .then((name) => console.log(name.common))
          .catch((error) => console.log("Oops, there is no country with that name"));
      });