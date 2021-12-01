import { popularMovies } from './apis.js';
import { nowPlayingMovies } from './apis.js';
import { topRatedMovies } from './apis.js';
import { renderMoviesList } from './render.js';
import { renderHero } from './render.js';

export function checkUserLogin(userName) {
    if (userLogged) {
        modalLogin.innerHTML = `Bentornato <a href="#secret">${userName}</a>!`;
        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'logout';
        modalLogin.appendChild(logoutBtn)
        logoutBtn.addEventListener('click', () => {
            userLogged = false;
            modalLogin.innerHTML = `<form id="login">
            <p>Accedi per salvare i preferiti</p>
            <input type="text" value="FakeUser" required>
            <input type="password" value="fakepassword" required>
            <button type="submit">Login</button>
        </form>`;
            loginFunction()
        }, {once:true})

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
        renderMoviesList('popular', popularMovies);
        renderMoviesList('now-playing', nowPlayingMovies);
        renderMoviesList('top-rated', topRatedMovies);
    } else {
        loginFunction()
    }
}

export function loginFunction() {
    loginForm.addEventListener('submit', (e) => {
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
        checkUserLogin(user);
    })
}




let usersList = [];

export let userLogged = false;
export let user;
export let likeList = [];
export let bookList = [];

const loginForm = document.querySelector('#login');
const modalLogin = document.querySelector('.login-modal');