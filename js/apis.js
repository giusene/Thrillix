import { renderMoviesList } from './render.js';
import { renderHero } from './render.js';

export const loadPopular = () => {
    fetch(popularAPI)
        .then((response) => {
            if (response.status === 404) {
                console.error('errore!!!');
                document.querySelector('.alert').classList.add('show')
            } else {
                return response.json()
            }
        })
        .then((data) => {
            popularMovies = data.results.filter((movie) => {
                if ([...movie.genre_ids].filter((movieGenId) => movieGenId === thrillerIdFilter).length > 0) {
                    return movie;
                }
            })
            renderMoviesList('popular', popularMovies);
            renderHero(popularMovies);
        })
}

let popularMovies = []

const popularAPI = 'https://api.themoviedb.org/3/movie/popular?api_key=d81b4c0951683c467d7125a553aefc87&language=it-IT&page=1';
const nowPlayingAPI = 'https://api.themoviedb.org/3/movie/now_playing?api_key=d81b4c0951683c467d7125a553aefc87&language=it-IT&page=1';
const topRatedAPI = 'https://api.themoviedb.org/3/movie/top_rated?api_key=d81b4c0951683c467d7125a553aefc87&language=it-IT&page=1';

const thrillerIdFilter = 53;