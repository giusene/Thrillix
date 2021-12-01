export function showModal(movieTitle, movieId, movieOverview, movieAdult, movieYear, movieGenres) {
    modalWindow.textContent = '';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    modalWindow.appendChild(closeBtn);

    const modalVideo = document.createElement('div');
    modalVideo.className = 'modal-video';
    modalWindow.appendChild(modalVideo);

    youtubeSearch(movieTitle, modalVideo);

    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalWindow.appendChild(modalContainer);

    const title = document.createElement('h4');
    title.textContent = movieTitle;

    const info = document.createElement('p');
    info.innerHTML = `${movieYear} <span class="cat">${movieAdult ? 'VM 14' : 'T'}</span>`;

    const genres = document.createElement('p');
    genres.innerHTML = movieGenres.map(item => item.name).join('<span class="separator"> • </span>');

    const desc = document.createElement('p');
    desc.textContent = movieOverview;

    modalContainer.appendChild(title)
    modalContainer.appendChild(genres)
    modalContainer.appendChild(info)
    modalContainer.appendChild(desc)

    movieModal.classList.toggle('show');

    closeBtn.addEventListener('click', () => {
        modalWindow.textContent = '';
        movieModal.classList.remove('show');
    }, { once: true })
}


const youtubeSearch = async (movieTitle, container) => {
    const searchQuery = movieTitle.replaceAll(' ', '+') + '+trailer+film';
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=AIzaSyDXm7O6AY7HQGSWdWBLmvyMM1RC9D1NHro`);
    const data = await res.json();
    const youtubeIFrame = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${data.items[0].id.videoId}?autoplay=1&showinfo=0&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;" allowfullscreen></iframe>`
    container.innerHTML = youtubeIFrame;
}


const movieModal = document.querySelector('.movie-modal');
const modalWindow = movieModal.querySelector('.modal-window');