const API_KEY = 'live_qkr8Ygbh7g7mprh23SZ1dNJbxbV13ETAVCizkGvro8zezBk25WlDobi7ny1nAM55';  // 실제 API 키로 교체해야 합니다

document.getElementById('catButton').addEventListener('click', async function() {
    try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}`);
        const data = await response.json();

        const catImage = document.getElementById('catImage');
        const breedInfo = document.getElementById('breedInfo');
        const description = document.getElementById('description');
        const origin = document.getElementById('origin');
        const lifeSpan = document.getElementById('lifeSpan');

        if (data[0]) {
            const imageUrl = data[0].url;
            const breed = data[0].breeds.length > 0 ? data[0].breeds[0] : null;

            catImage.src = imageUrl;
            breedInfo.textContent = breed ? `Breed: ${breed.name}` : 'Breed: Unknown';
            description.textContent = breed ? `Description: ${breed.description}` : 'Description: Not available';
            origin.textContent = breed ? `Origin: ${breed.origin}` : 'Origin: Unknown';
            lifeSpan.textContent = breed ? `Life Span: ${breed.life_span}` : 'Life Span: Unknown';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
