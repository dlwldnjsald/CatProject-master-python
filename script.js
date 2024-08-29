/*
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

*/
document.getElementById('catButton').addEventListener('click', async function() {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const catImage = document.getElementById('catImage');
        const breedInfo = document.getElementById('breedInfo');

        if (data[0]) {
            const imageUrl = data[0].url;
            const breed = data[0].breeds.length > 0 ? data[0].breeds[0] : null;

            catImage.src = imageUrl;
            breedInfo.textContent = breed ? `${breed.name}: ${breed.temperament}` : 'Breed information is not available.';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        const breedInfo = document.getElementById('breedInfo');
        breedInfo.textContent = 'Failed to load cat data.';
    }
});
