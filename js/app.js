import { loadGenres } from './apis.js';
import { loginFunction } from './login.js';
import { hashCangeFunc, headerScolling, hamburgerMenu } from './domfunctions.js';


document.addEventListener('DOMContentLoaded', () => {
    loadGenres();
    hashCangeFunc();
    headerScolling();
    hamburgerMenu();
    loginFunction();
}
)