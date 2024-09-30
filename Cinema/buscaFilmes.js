const apiKey = 'f5984d8616be1614331f2870352d0d1e'; // Insira sua API Key aqui
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get('query');

// Verificar se a query está presente
if (query) {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=pt-BR`)
        .then(response => {
            const filmes = response.data.results;
            const searchResults = document.getElementById('search-results');
            searchResults.innerHTML = ''; // Limpar resultados anteriores

            if (filmes.length === 0) {
                searchResults.innerHTML = '<p class="text-center">Nenhum filme encontrado.</p>';
            } else {
                filmes.forEach(filme => {
                    const movieCard = `
                        <div class="row">
                    <div class="col-md-4">
                        <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" class="img-fluid" alt="${filme.title}">
                    </div>
                    <div class="col-md-8">
                        <h3>Descrição</h3>
                        <p>${filme.overview}</p>
                        <h5>Data de Lançamento: ${filme.release_date}</h5>
                        <h5>Nota: ${filme.vote_average}/10</h5>
                    </div>
                </div>
                    `;
                    searchResults.innerHTML += movieCard;
                });
            }
        })
        .catch(error => {
            console.error("Erro ao buscar filmes:", error);
        });
}
