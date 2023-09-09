var breedImage = document.querySelector('#breed-image'); // <div id="breed-image"></div>
var dropdown = document.querySelector('#dog-breeds'); // <select id="dog-breeds"></select>
var allowSubmit = true;
var breed;

fetch("https://dog.ceo/api/breeds/list/all") // fetching from https://dog.ceo/api/breeds/list/all
    .then(response => response.json()) // converting the response to JSON
    .then(data => { // using the data
      let dogBreeds = data.message; // the breeds are in data.message
      for(let breed in dogBreeds){ // looping through the breeds
        let option=document.createElement('option'); // creating an option element
        option.value=breed; // setting the value to the breed
        option.textContent=breed; // setting the text content to the breed
        dropdown.appendChild(option); // appending the option to the select
      }
    });

dropdown.addEventListener("change", function () { // when the dropdown changes
  allowSubmit = true; // allow the form to be submitted
});

document.querySelector("form button").addEventListener("click", function(e){
  e.preventDefault();

  if(allowSubmit){
    breed = dropdown.value;
    displayDog(breed);
    allowSubmit = false;
  }
});

document.querySelector("#next a").addEventListener("click", function(e){
  e.preventDefault();
  if(breed !== undefined){
    displayDog(breed);
  }
});

function displayDog(breed){
  let url = "https://dog.ceo/api/breed/" + breed + "/images/random";

  while(breedImage.firstChild){
    breedImage.removeChild(breedImage.firstChild);
  }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      let imageUrl = data.message;
      let img = document.createElement("img");
      img.src = imageUrl;
      img.alt = breed;
      breedImage.appendChild(img);
    });
}