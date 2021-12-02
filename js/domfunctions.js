import { popularMovies } from './apis.js';
import { nowPlayingMovies } from './apis.js';
import { topRatedMovies } from './apis.js';
import { renderMoviesList } from './render.js';
import { renderHero } from './render.js';
import { bookList } from './login.js';
import { moviesGenres } from './apis.js';
import { LoadPopular, LoadNowPlaying, LoadTopRated } from './apis.js';


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
            case '#secret':
                secretModal()
                break;
        }
    })
}


export function slideControll(parent, direction, event) {
    let position = parseInt(parent.style.left.slice(0, -2))
    switch (direction) {
        case 'backward':
            if (position < 0) {
                position += 200;
                parent.style.left = `${position}px`
            }
            break;
        case 'forward':
            if (position > -event.path[1].childNodes[3].childNodes[event.path[1].childNodes[3].childElementCount - 1].offsetLeft + (window.innerWidth - (window.innerWidth * 15) / 100)) {
                position -= 200;
                parent.style.left = `${position}px`
            }
            break;
    }
}

export function headerScolling() {
    window.onscroll = function (e) {
        if (e.path[1].pageYOffset !== 0) {
            header.classList.add('display');
        } else {
            header.classList.remove('display');
        }
    }
}

function secretModal() {
    const secretDiv = document.createElement('div');
    secretDiv.className = 'secret';
    secretDiv.innerHTML = '👽  Complimenti hai trovato un segreto!! 👽<br>Da qui potrai scegliere qualsiasi altro genere';
    secretDiv.classList.add('show');
    const select = document.createElement('select');
    secretDiv.appendChild(select)
    moviesGenres.genres.forEach(element => {
        const option = document.createElement('option');
        option.setAttribute('value', `${element.id}`)
        option.textContent = `${element.name}`;
        select.appendChild(option);
    });
    document.body.appendChild(secretDiv);
    select.addEventListener('change', () => {
        initFilter = parseInt(select.value);
        secretDiv.classList.remove('show');
        popularMovies.length = 0;
        nowPlayingMovies.length = 0;
        topRatedMovies.length = 0;
        LoadPopular(1);
        LoadNowPlaying(1);
        LoadTopRated(1);
    })
}



export let initFilter = 53;
const header = document.querySelector('header');

