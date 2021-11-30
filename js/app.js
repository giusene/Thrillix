import { loadGenres } from './apis.js';
import { checkUserLogin } from './login.js'

document.addEventListener('DOMContentLoaded', () => {
    loadGenres();
    checkUserLogin();
}
)