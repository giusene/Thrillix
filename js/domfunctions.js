import { popularMovies } from './apis.js';
import { nowPlayingMovies } from './apis.js';
import { topRatedMovies } from './apis.js';
import { renderMoviesList } from './render.js';
import { renderHero } from './render.js';
import { bookList } from './login.js';

export function hashCangeFunc() {
    window.addEventListener('hashchange', () => {
        switch (location.hash) {
            case '#home':
                document.querySelector('#home-link').classList.add('active');
                document.querySelector('#list-link').classList.remove('active');
                renderHero(popularMovies);
                renderMoviesList('popular', popularMovies, 'I più popolari su Thrillix');
                renderMoviesList('now-playing', nowPlayingMovies, 'I titoli del momento');
                renderMoviesList('top-rated', topRatedMovies, 'I titoli piu votati');
                break;
            case '#lamialista':
                document.querySelector('#home-link').classList.remove('active');
                document.querySelector('#list-link').classList.add('active');
                renderMoviesList('popular', bookList, 'La mia lista')
                break;
            case '#search':
                document.querySelector('#home-link').classList.remove('active');
                document.querySelector('#list-link').classList.remove('active');
                break;
        }
    })
}