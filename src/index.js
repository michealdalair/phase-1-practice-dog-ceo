document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imagesContainer = document.getElementById("images-container");
    const breedsContainer = document.getElementById("dog-breeds");
    const breedDropdown = document.getElementById("breed-dropdown");

    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            data.message.forEach(imgUrl => {
                const imgElement = document.createElement("img");
                imgElement.src = imgUrl;
                imgElement.alt = "Random Dog Image";
                imagesContainer.appendChild(imgElement);
            });
        })
        .catch(error => console.error("Error fetching images:", error));

    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breeds = data.message;

            const displayBreeds = (filterLetter) => {
                breedsContainer.innerHTML = '';
                for (const breed in breeds) {
                    if (!filterLetter || breed.startsWith(filterLetter)) {
                        const li = document.createElement("li");
                        li.textContent = breed;
                        li.addEventListener('click', () => {
                            li.style.color = 'blue';
                        });
                        breedsContainer.appendChild(li);
                    }
                }
            };

            displayBreeds('');

            breedDropdown.addEventListener('change', (event) => {
                const selectedLetter = event.target.value;
                displayBreeds(selectedLetter);
            });
        })
        .catch(error => console.error("Error fetching breeds:", error));
});
