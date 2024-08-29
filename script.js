document.getElementById('catButton').addEventListener('click', async function() {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();

    const catImage = document.getElementById('catImage');
    const breedInfo = document.getElementById('breedInfo');

    if (data[0]) {
        const imageUrl = data[0].url;
        const breed = data[0].breeds.length > 0 ? data[0].breeds[0] : null;

        catImage.src = imageUrl;
        breedInfo.textContent = breed ? `${breed.name}: ${breed.temperament}` : 'Breed information is not available.';
    }
});
