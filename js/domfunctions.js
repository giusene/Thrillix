import { popularMovies, nowPlayingMovies, topRatedMovies, moviesGenres, LoadPopular, LoadNowPlaying, LoadTopRated } from './apis.js';
import { renderMoviesList, renderHero } from './render.js';
import { bookList } from './login.js';

export function hashCangeFunc() {
    window.addEventListener('hashchange', () => {
        switch (location.hash) {
            case '#home':
                document.querySelector('.hamburger-div').classList.remove('show');
                document.querySelector('.home-link').classList.add('active');
                document.querySelector('.ham-home-link').classList.add('active');
                document.querySelector('.list-link').classList.remove('active');
                document.querySelector('.ham-list-link').classList.remove('active');
                renderHero(popularMovies);
                renderMoviesList('popular', popularMovies, 'I più popolari su Thrillix');
                renderMoviesList('now-playing', nowPlayingMovies, 'I titoli del momento');
                renderMoviesList('top-rated', topRatedMovies, 'I titoli piu votati');
                break;
            case '#lamialista':
                document.querySelector('.hamburger-div').classList.remove('show');
                document.querySelector('.home-link').classList.remove('active');
                document.querySelector('.ham-home-link').classList.remove('active');
                document.querySelector('.list-link').classList.add('active');
                document.querySelector('.ham-list-link').classList.add('active');
                renderMoviesList('popular', bookList, 'La mia lista')
                break;
            case '#search':
                document.querySelector('.hamburger-div').classList.remove('show');
                document.querySelector('.home-link').classList.remove('active');
                document.querySelector('.ham-home-link').classList.remove('active');
                document.querySelector('.list-link').classList.remove('active');
                document.querySelector('.ham-list-link').classList.remove('active');
                break;
            case '#login':
                document.querySelector('.hamburger-div').classList.remove('show');
                document.querySelector('.home-link').classList.add('active');
                document.querySelector('.ham-home-link').classList.add('active');
                document.querySelector('.list-link').classList.remove('active');
                document.querySelector('.ham-list-link').classList.remove('active');
                renderHero(popularMovies);
                renderMoviesList('popular', popularMovies, 'I più popolari su Thrillix');
                renderMoviesList('now-playing', nowPlayingMovies, 'I titoli del momento');
                renderMoviesList('top-rated', topRatedMovies, 'I titoli piu votati');
                break;
            case '#logout':
                document.querySelector('.hamburger-div').classList.remove('show');
                document.querySelector('.home-link').classList.add('active');
                document.querySelector('.ham-home-link').classList.add('active');
                document.querySelector('.list-link').classList.remove('active');
                document.querySelector('.ham-list-link').classList.remove('active');
                renderHero(popularMovies);
                renderMoviesList('popular', popularMovies, 'I più popolari su Thrillix');
                renderMoviesList('now-playing', nowPlayingMovies, 'I titoli del momento');
                renderMoviesList('top-rated', topRatedMovies, 'I titoli piu votati');
                break;
            case '#secret':
                document.querySelector('.hamburger-div').classList.remove('show');
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
    const secretDiv = document.querySelector('.secret');
    secretDiv.innerHTML = `👽  Complimenti hai trovato l'EasterEgg!! 👽<br>
    Selezionando la modalità "Netflix" non saranno più visualizzati solamente i Thriller,<br>
    bensì TUTTI i generi di film<br>`;
    secretDiv.classList.add('show');
    const secretDivSelect = document.createElement('div');
    secretDivSelect.className = 'secret-select';

    const thrillixDiv = document.createElement('div');
    thrillixDiv.className = 'thrillix';
    secretDivSelect.appendChild(thrillixDiv);
    if (!secret) thrillixDiv.classList.add('show');

    const selectDiv = document.createElement('div');
    selectDiv.className = 'select-div';
    secretDivSelect.appendChild(selectDiv)

    const selectDot = document.createElement('div');
    selectDot.className = 'select-dot';
    selectDiv.appendChild(selectDot);
    if (secret) selectDot.classList.add('active');

    const netflixDiv = document.createElement('div');
    netflixDiv.className = 'netflix';
    secretDivSelect.appendChild(netflixDiv);
    if (secret) netflixDiv.classList.add('show');

    const goSecret = document.createElement('button');
    goSecret.textContent = 'vai'
    goSecret.className = 'go-secret';

    selectDiv.addEventListener('click', () => {
        selectDot.classList.toggle('active');
        thrillixDiv.classList.toggle('show');
        netflixDiv.classList.toggle('show');
        logo.classList.toggle('secret-logo');
        if (secret) { secret = false }
        else { secret = true }
    })

    goSecret.addEventListener('click', () => {
        popularMovies.length = 0;
        nowPlayingMovies.length = 0;
        topRatedMovies.length = 0;
        LoadPopular(1, secret);
        LoadNowPlaying(2, secret);
        LoadTopRated(1, secret);
        secretDiv.textContent = '';
        const loader = document.createElement('img');
        loader.setAttribute('src', './img/loading.png');
        secretDiv.appendChild(loader);
        setTimeout(() => {
            location.hash = '';
            secretDiv.classList.remove('show');
        }, 8000)
    })

    secretDiv.appendChild(secretDivSelect)
    secretDiv.appendChild(goSecret)
    document.body.appendChild(secretDiv);
    
}


export function hamburgerMenu() {
    const hamburgerBtn = document.querySelector('.hamburger');
    const hamburgerDiv = document.querySelector('.hamburger-div');
    hamburgerBtn.addEventListener('click', () => {
        hamburgerDiv.classList.toggle('show');
    })
}

export let secret = false;
const header = document.querySelector('header');
const logo = document.querySelector('.header__logo')

