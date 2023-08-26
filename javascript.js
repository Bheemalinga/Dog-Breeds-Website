var breedImage = document.querySelector('#breed-image');
var dropdown = document.querySelector('#dog-breeds');
var allowSubmit = true;
var breed;

fetch("https://dog.ceo/api/breeds/list/all")
    .then(response => response.json())
    .then(data => {
      let dogBreeds = data.message;
      for(let breed in dogBreeds){
        let option=document.createElement('option');
        option.value=breed;
        option.textContent=breed;
        dropdown.appendChild(option);
      }
    });

dropdown.addEventListener("change", function () {
  allowSubmit = true;
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