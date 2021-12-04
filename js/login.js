import { popularMovies, nowPlayingMovies, topRatedMovies } from './apis.js';
import { renderMoviesList, renderHero } from './render.js';

export function checkUserLogin(wrapper) {
    if (userLogged) {
        location.hash = '#login';
        wrapper.innerHTML = `Bentornato <a href="#secret">${user}</a>!`;
        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'logout';
        wrapper.appendChild(logoutBtn);
        logoutBtn.addEventListener('click', () => {
            location.hash = '#logout';
            userLogged = false;
            if (wrapper.className === 'login-hamburger') {
                wrapper.innerHTML = `<form id="login-hamburger">
                <p>Accedi per salvare i preferiti</p>
                <input type="text" value="FakeUser" required>
                <input type="password" value="fakepassword" required>
                <button type="submit">Login</button>
            </form>`;
            } else {
                wrapper.innerHTML = `<form id="login">
                <p>Accedi per salvare i preferiti</p>
                <input type="text" value="FakeUser" required>
                <input type="password" value="fakepassword" required>
                <button type="submit">Login</button>
            </form>`;
            }
            
            loginFunction();
            likeList = [];
            bookList = [];
        })

        if (JSON.parse(window.localStorage.getItem('likeList'))) {
            likeList = JSON.parse(window.localStorage.getItem('likeList'));
        } else {
            likeList = [];
        }

        if (JSON.parse(window.localStorage.getItem('bookList'))) {
            bookList = JSON.parse(window.localStorage.getItem('bookList'));
        } else {
            bookList = [];
        }
        renderHero(popularMovies);
        renderMoviesList('popular', popularMovies, 'I più popolari su Thrillix');
        renderMoviesList('now-playing', nowPlayingMovies, 'I titoli del momento');
        renderMoviesList('top-rated', topRatedMovies, 'I titoli piu votati');
    } else {
        loginFunction()
    }

}

export function loginFunction() {
    const loginForm = document.querySelector('#login');
    loginForm.addEventListener('submit', (e) => {
        likeList = [];
        bookList = [];
        e.preventDefault();
        userLogged = true;
        location.hash = '';
        user = loginForm.querySelector('input').value;
        if (window.localStorage.getItem('users')) {
            usersList = JSON.parse(window.localStorage.getItem('users'));
            if (usersList.find((userName) => userName === user)) {
            } else {
                usersList.push(user);
                window.localStorage.setItem('users', JSON.stringify(usersList));
            }

        } else {
            usersList.push(user);
            window.localStorage.setItem('users', JSON.stringify(usersList));
            window.localStorage.setItem('bookList', JSON.stringify(bookList));
        }
        checkUserLogin(modalLogin);
    })

    const hamburgerForm = document.querySelector('#login-hamburger');
    hamburgerForm.addEventListener('submit', (e) => {
        likeList = [];
        bookList = [];
        e.preventDefault();
        userLogged = true;
        location.hash = '';
        user = hamburgerForm.querySelector('input').value;
        if (window.localStorage.getItem('users')) {
            usersList = JSON.parse(window.localStorage.getItem('users'));
            if (usersList.find((userName) => userName === user)) {
            } else {
                usersList.push(user);
                window.localStorage.setItem('users', JSON.stringify(usersList));
            }

        } else {
            usersList.push(user);
            window.localStorage.setItem('users', JSON.stringify(usersList));
            window.localStorage.setItem('bookList', JSON.stringify(bookList));
        }
        checkUserLogin(hamburgerLogin);
    })
}




let usersList = [];

export let userLogged = false;
export let user;
export let likeList = [];
export let bookList = [];


const hamburgerLogin = document.querySelector('.login-hamburger');
const modalLogin = document.querySelector('.login-modal');
