import { renderMoviesList, renderHero } from './render.js';
import { checkUserLogin } from './login.js';
import { hashCangeFunc, headerScolling, initFilter, hamburgerMenu } from './domfunctions.js';
import { searchFunc } from './search.js';

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
            LoadNowPlaying(10);
            LoadTopRated(1);
        })
}

export const LoadPopular = (pages, secret) => {
    fetch(popularAPI + pages)
        .then((response) => {
            if (response.status === 404) {
                console.error('errore!!!');
                document.querySelector('.alert').classList.add('show')
            } else {
                return response.json()
            }
        })
        .then((data) => {
            if (secret) {
                popularMovies = data.results;
            } else {
                data.results.filter((movie) => {
                    if ([...movie.genre_ids].filter((movieGenId) => movieGenId === initFilter).length > 0) {
                        popularMovies.push(movie);
                    }
                })
            }
            if (popularMovies.length < 20) {
                pages++;
                LoadPopular(pages);
            } else {
                renderMoviesList('popular', popularMovies, 'I più popolari su Thrillix');
                renderHero(popularMovies);
                searchFunc(popularMovies);
            }
        })
}

export const LoadNowPlaying = (pages, secret) => {
    fetch(nowPlayingAPI + pages)
        .then((response) => {
            if (response.status === 404) {
                console.error('errore!!!');
                document.querySelector('.alert').classList.add('show')
            } else {
                return response.json()
            }
        })
        .then((data) => {
            if (secret) {
                nowPlayingMovies = data.results;
            } else {
                data.results.filter((movie) => {
                    if ([...movie.genre_ids].filter((movieGenId) => movieGenId === initFilter).length > 0) {
                        nowPlayingMovies.push(movie);
                    }
                })
            }
            if (nowPlayingMovies.length < 20) {
                pages++;
                LoadNowPlaying(pages);
            } else {
                renderMoviesList('now-playing', nowPlayingMovies, 'I titoli del momento');
            }
        })
}

export const LoadTopRated = (pages, secret) => {
    fetch(topRatedAPI + pages)
        .then((response) => {
            if (response.status === 404) {
                console.error('errore!!!');
                document.querySelector('.alert').classList.add('show')
            } else {
                return response.json()
            }
        })
        .then((data) => {
            if (secret) {
                topRatedMovies = data.results;
            } else {
                data.results.filter((movie) => {
                    if ([...movie.genre_ids].filter((movieGenId) => movieGenId === initFilter).length > 0) {
                        topRatedMovies.push(movie);
                    }
                })
            }
            if (topRatedMovies.length < 20) {
                pages++;
                LoadTopRated(pages);
            } else {
                renderMoviesList('top-rated', topRatedMovies, 'I titoli più votati');
                checkUserLogin();
                hashCangeFunc();
                headerScolling();
                hamburgerMenu();
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

