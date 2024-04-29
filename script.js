const apiKey = 'a2efd885';
const moviesContainer = document.querySelector('#movie');
const bttn = document.querySelector("#bttn");
const input = document.querySelector("#input");
const loader = document.querySelector('#preloader_malc');

async function fetchMovies(searchQuery) {
    moviesContainer.innerHTML = '';
    showLoader();
    const apiUrl = `https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`;
    console.log(apiUrl);
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log(data);

        hideLoader();

        if (data.Search) {
            const movies = data.Search;

            movies.forEach(movie => {
                const card = document.createElement('div');
                card.classList.add('movie-card');

                if (movie.Poster && movie.Title) {
                    const img = document.createElement('img');
                    img.src = movie.Poster;
                    img.alt = movie.Title;
                    card.appendChild(img);

                    const title = document.createElement('p'); // Создаем абзац для названия фильма
                    title.textContent = movie.Title; // Устанавливаем текст абзаца как название фильма
                    card.appendChild(title); // Добавляем абзац под изображением

                    moviesContainer.appendChild(card);
                }
            });
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        hideLoader();
        alert('Failed to fetch movies. Please try again later.');
    }
}

bttn.addEventListener("click", () => {
    const searchQuery = input.value.trim();
    if (searchQuery !== "") {
        fetchMovies(searchQuery);
    }
});

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const searchQuery = input.value.trim();
        if (searchQuery !== '') {
            event.preventDefault();
            fetchMovies(searchQuery);
        }
    }
});

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const defaultMovieQuery = 'Harry Potter';
    fetchMovies(defaultMovieQuery);
});
