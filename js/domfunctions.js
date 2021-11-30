import { popularMovies } from './apis.js';
import { nowPlayingMovies } from './apis.js';
import { topRatedMovies } from './apis.js';
import { renderMoviesList } from './render.js';
import { renderHero } from './render.js';
import { bookList } from './login.js';

export function hashCangeFunc() {
    window.addEventListener('hashchange', () => {
        console.log(location.hash)
        switch (location.hash) {
            case '#home':
                document.querySelector('#home-link').classList.add('active');
                document.querySelector('#list-link').classList.remove('active');
                renderHero(popularMovies);
                renderMoviesList('popular', popularMovies);
                renderMoviesList('now-playing', nowPlayingMovies);
                renderMoviesList('top-rated', topRatedMovies);
                break;
            case '#lamialista':
                document.querySelector('#home-link').classList.remove('active');
                document.querySelector('#list-link').classList.add('active');
                renderMoviesList('popular', bookList, true)
                break;
        }
    })
}