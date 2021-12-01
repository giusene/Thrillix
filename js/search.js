import { renderMoviesList } from './render.js';

export function searchFunc(data) {
    searchForm.addEventListener('submit', () => {
        location.hash = '#search';
        const inputValue = searchInput.value.toLocaleLowerCase();
        const result = data.filter((item) => item.title.toLocaleLowerCase().search(inputValue) > -1);
        renderMoviesList('popular', result, 'Risulati ricerca');
        searchForm.classList.toggle('show')
        searchForm.reset()
    })

    searchInput.addEventListener('keyup', () => {
        location.hash = '#search';
        const inputValue = searchInput.value.toLocaleLowerCase();
        const result = data.filter((item) => item.title.toLocaleLowerCase().search(inputValue) > -1);
        
        renderMoviesList('popular', result, 'Risulati ricerca');
    })



    searchBtn.addEventListener('click', (e) => {
        e.preventDefault()
        searchForm.classList.toggle('show')
    })


}



const searchForm = document.querySelector('#search');
const searchInput = document.querySelector('#search-input')
const searchBtn = document.querySelector('#search-btn');