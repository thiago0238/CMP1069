async function loadFilme() {
    try {
        const response = await axios.get("https://api.themoviedb.org/3/movie/now_playing", {
            params: {
                api_key: "f5984d8616be1614331f2870352d0d1e",
                language: "pt-BR",
                page: 1,
            }
        });
        console.log('Filmes:', response.data.results);
        const filmes = response.data.results;
        const carouselInner = document.getElementById('carousel-inner');
        carouselInner.innerHTML = ''; // Limpa o conteúdo atual do carrossel

        // Alterando o caminho para um tamanho de imagem maior
        filmes.slice(0, 10).forEach((filme, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) {
                carouselItem.classList.add('active'); // O primeiro item é marcado como ativo
            }

            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w780${filme.backdrop_path}`; // Alterado para w780
            img.classList.add('d-block', 'w-100');
            img.alt = filme.title;

            const caption = document.createElement('div');
            caption.classList.add('carousel-caption', 'd-none', 'd-md-block');
            caption.innerHTML = `
                <h4><b>${filme.title}</b></h4>
                <p>${filme.overview}</p>
            `;

            carouselItem.appendChild(img);
            carouselItem.appendChild(caption);
            carouselInner.appendChild(carouselItem);
        });

    } catch (error) {
        console.error('Erro ao carregar os filmes:', error);
    }
}

// Carrega os filmes quando a página estiver pronta
document.addEventListener('DOMContentLoaded', loadFilme);