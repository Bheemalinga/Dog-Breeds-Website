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

document.querySelector("form button").addEventListener("click", function(e){ // when the form is submitted
  e.preventDefault(); // prevent the default action

  if(allowSubmit){ // if the form is allowed to be submitted
    breed = dropdown.value; // set the breed to the value of the dropdown
    displayDog(breed); // displaying the dog
    allowSubmit = false; // to prevent the form from being submitted again, changing the value to false
  }
});

document.querySelector("#next a").addEventListener("click", function(e){ // when the next button is clicked
  e.preventDefault(); // prevent the default action
  if(breed !== undefined){ // if the breed is defined
    displayDog(breed); // display that breed
  }
});

function displayDog(breed){ // function to display the dog
  let url = "https://dog.ceo/api/breed/" + breed + "/images/random"; // the url for the image

  while(breedImage.firstChild){ // while there is a first child
    breedImage.removeChild(breedImage.firstChild); // removing that first child
  }

  fetch(url) // fetching the image
    .then(response => response.json()) // converting the response to JSON
    .then(data => { // using the data we got form the response
      let imageUrl = data.message; // the image url is in data.message
      let img = document.createElement("img"); // creating an image element to display the image
      img.src = imageUrl; // setting the source of the image to the image url, so that the image can be displayed
      img.alt = breed; // setting the alt text to the breed, so that the breed name is displayed if the image can't be displayed
      breedImage.appendChild(img); // appending the image to the div to display
    });
}