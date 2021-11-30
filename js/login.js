import { loadGenres } from './apis.js'

export function checkUserLogin(userName) {
    if (userLogged) {
        modalLogin.innerHTML = `Bentornato ${userName}!`;
        loadGenres();
        likeList = JSON.parse(window.localStorage.getItem('likeList'));
        console.log(user)
    } else {
        console.log('non loggato')
        loginFunction()
    }
}

export function loginFunction() {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        userLogged = true;
        user = loginForm.querySelector('input').value;
        checkUserLogin(user);
        if (window.localStorage.getItem('users')) {
            usersList = JSON.parse(window.localStorage.getItem('users'));
            if (usersList.find((userName) => userName === user)) {
                console.log('utente esistente');
            } else {
                console.log('nuovo utente');
                usersList.push(user);
                window.localStorage.setItem('users', JSON.stringify(usersList));
            }
            
        } else {
            usersList.push(user);
            window.localStorage.setItem('users', JSON.stringify(usersList));
        }
    })
}




let usersList = [];

export let userLogged = false;
export let user;
export let likeList = [];

const loginForm = document.querySelector('#login');
const modalLogin = document.querySelector('.login-modal');