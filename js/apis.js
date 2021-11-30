import { renderMoviesList } from './render.js';
import { renderHero } from './render.js';
import { checkUserLogin } from './login.js';
import { hashCangeFunc } from './domfunctions.js';

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
            LoadPopular(1);
            LoadNowPlaying(1);
            LoadTopRated(1);
        })
}

const LoadPopular = (pages) => {
    fetch(popularAPI+pages)
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
                LoadPopular(pages);
            } else {
                renderMoviesList('popular', popularMovies);
                renderHero(popularMovies);
            }
        })
}

const LoadNowPlaying = (pages) => {
    fetch(nowPlayingAPI+pages)
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
                    nowPlayingMovies.push(movie);
                }
            })
            if (nowPlayingMovies.length < 20) {
                pages++;
                LoadNowPlaying(pages);
            } else {
                renderMoviesList('now-playing', nowPlayingMovies);
            }
        })
}

const LoadTopRated = (pages) => {
    fetch(topRatedAPI+pages)
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
                    topRatedMovies.push(movie);
                }
            })
            if (topRatedMovies.length < 20) {
                pages++;
                LoadTopRated(pages);
            } else {
                renderMoviesList('top-rated', topRatedMovies);
                checkUserLogin();
                hashCangeFunc();
            }
        })
}

export let moviesGenres = [];
const genresList = 'https://api.themoviedb.org/3/genre/movie/list?api_key=d81b4c0951683c467d7125a553aefc87&language=it-IT'


export let popularMovies = [];
export let nowPlayingMovies = [];
export let topRatedMovies = [];

const popularAPI = `https://api.themoviedb.org/3/movie/popular?api_key=d81b4c0951683c467d7125a553aefc87&language=it-IT&page=`;
const nowPlayingAPI = `https://api.themoviedb.org/3/movie/now_playing?api_key=d81b4c0951683c467d7125a553aefc87&language=it-IT&page=`;
const topRatedAPI = `https://api.themoviedb.org/3/movie/top_rated?api_key=d81b4c0951683c467d7125a553aefc87&language=it-IT&page=`;

const thrillerIdFilter = 53;