const API_KEY = 'live_qkr8Ygbh7g7mprh23SZ1dNJbxbV13ETAVCizkGvro8zezBk25WlDobi7ny1nAM55';  // 실제 API 키로 교체해야 합니다

document.getElementById('catButton').addEventListener('click', async function() {
    try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const catImage = document.getElementById('catImage');
        const breedInfo = document.getElementById('breedInfo');
        const temperamentInfo = document.getElementById('temperamentInfo');
        const originInfo = document.getElementById('originInfo');
        const lifeSpanInfo = document.getElementById('lifeSpanInfo');

        if (data[0]) {
            const imageUrl = data[0].url;
            const breed = data[0].breeds.length > 0 ? data[0].breeds[0] : null;

            catImage.src = imageUrl;
            breedInfo.textContent = breed ? `Breed: ${breed.name}` : 'Breed: Unknown';
            temperamentInfo.textContent = breed ? `Temperament: ${breed.temperament}` : 'Temperament: Unknown';
            originInfo.textContent = breed ? `Origin: ${breed.origin}` : 'Origin: Unknown';
            lifeSpanInfo.textContent = breed ? `Life Span: ${breed.life_span}` : 'Life Span: Unknown';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('breedInfo').textContent = 'Failed to load cat data.';
    }
});

/* 
웹 애플리케이션 (HTML, JS, CSS)과 Python GUI 애플리케이션은 
별개의 애플리케이션입니다. 
필요에 따라 둘 중 하나를 선택하여 사용하면 됩니다.

*/