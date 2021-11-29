import { renderMoviesList } from './render.js';
import { renderHero } from './render.js';

export const loadGenres = () => {
    fetch(genresList)
        .then((response) => {
            if (response.status === 404) {
                console.error('errore!!!');
                document.querySelector('.alert').classList.add('show')
            } else {
                return response.json()
            }
        })
        .then((data) => {
            moviesGenres = data;
            loadPopular();
        })
}

const loadPopular = () => {
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
            data.results.filter((movie) => {
                if ([...movie.genre_ids].filter((movieGenId) => movieGenId === thrillerIdFilter).length > 0) {
                    popularMovies.push(movie);
                }
            })
            if (popularMovies.length < 20) {
                pages++;
                popularAPI = `https://api.themoviedb.org/3/movie/popular?api_key=d81b4c0951683c467d7125a553aefc87&language=it-IT&page=${pages}`;
                console.log(popularAPI)
                loadPopular();
            } else {
                renderMoviesList('popular', popularMovies);
                renderHero(popularMovies);
            }
        })
}

let pages = 1;
let popularMovies = []
export let moviesGenres = []

const genresList = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d81b4c0951683c467d7125a553aefc87&language=it-IT'

let popularAPI = `https://api.themoviedb.org/3/movie/popular?api_key=d81b4c0951683c467d7125a553aefc87&language=it-IT&page=`+pages;
const nowPlayingAPI = `https://api.themoviedb.org/3/movie/now_playing?api_key=d81b4c0951683c467d7125a553aefc87&language=it-IT&page=${pages}`;
const topRatedAPI = `https://api.themoviedb.org/3/movie/top_rated?api_key=d81b4c0951683c467d7125a553aefc87&language=it-IT&page=${pages}`;

const thrillerIdFilter = 53;