import { moviesGenres } from "./apis";

export function showModal(movieTitle, movieId, movieOverview, movieAdult, movieYear, movieGenres) {
    modalWindow.textContent = '';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    modalWindow.appendChild(closeBtn);

    const modalVideo = document.createElement('div');
    modalVideo.className = 'modal-video';
    modalWindow.appendChild(modalVideo);

    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalWindow.appendChild(modalContainer);

    const title = document.createElement('h4');
    title.textContent = movieTitle;

    const info = document.createElement('p');
    info.innerHTML = `${movieYear} <span class="cat">${movieAdult ? 'VM 14' : 'T'}</span>`;
    
    // const genres = document.createElement('p');
    // console.log(moviesGenres)
    // genres.innerHTML = movieGenres.map(item => item.name).join('<span class="separator"> • </span>');
    
    modalContainer.appendChild(title)
    modalContainer.appendChild(info)

    movieModal.classList.toggle('show');
    
    closeBtn.addEventListener('click', () => {
        modalWindow.textContent = '';
        movieModal.classList.remove('show');
    }, {once: true})
}


        


const movieModal = document.querySelector('.movie-modal');
const modalWindow = movieModal.querySelector('.modal-window');