import { renderMoviesList } from './render.js';
import { userLogged } from './login.js';
import { user } from './login.js';
import { likeList } from './login.js';
import { bookList } from './login.js';

export function showModal(movieTitle, movieId, movieOverview, movieAdult, movieYear, movieGenres, movieBackdrop_path, moviePoster_path, movieRelease_date) {
    
    modalWindow.innerHTML = '';

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

    // da qui
    const movieInfo = document.createElement('div');
    movieInfo.className = 'movie_info';

    const buttonPlay = document.createElement('button');
    buttonPlay.className = 'button-play';

    buttonPlay.addEventListener('click', () => {
        playFunction();
    })

    const buttonBook = document.createElement('button');
    buttonBook.className = 'button-book';

    bookList.forEach((item) => {
        if (item.userName === user && item.id === parseInt(movieId)) {
            buttonBook.classList.add('active');
        }
    })

    buttonBook.addEventListener('click', () => {
        const check = bookList.find((item) => item.userName === user && item.id === movieId);
        if (check === undefined) {
            buttonBook.classList.toggle('active');
            bookList.push({
                userName: user,
                adult: movieAdult,
                backdrop_path: movieBackdrop_path,
                genre_ids: movieGenres,
                id: movieId,
                overview: movieOverview,
                poster_path: moviePoster_path,
                release_date: movieRelease_date,
                title: movieTitle
            })
        } else {
            buttonBook.classList.toggle('active');
            bookList.splice(bookList.indexOf(check), 1)
            if (location.hash === '#lamialista') {
                renderMoviesList('popular', bookList, 'La mia lista')
            }
        }
        if (userLogged) {
            window.localStorage.setItem('bookList', JSON.stringify(bookList));
        }
    })

    const buttonLike = document.createElement('button');
    const buttonDislike = document.createElement('button');

    buttonLike.className = 'button-like';

    likeList.forEach((item) => {
        if (item.userName === user && item.movieId === parseInt(movieId) && item.like === true) {
            buttonLike.classList.add('active');
        }
    })

    buttonLike.setAttribute('movieId', `${movieId}`)
    buttonLike.setAttribute('like', true);

    buttonLike.addEventListener('click', () => {
        const check = likeList.find((item) => item.userName === user && item.movieId === movieId);
        if (check === undefined) {
            buttonLike.classList.toggle('active');
            likeList.push({
                userName: user,
                movieId: movieId,
                like: true
            })
        } else {
            buttonLike.classList.toggle('active');
            if (check.like) {
                likeList.splice(likeList.indexOf(check), 1)
            } else {
                buttonDislike.classList.toggle('active');
                likeList.splice(likeList.indexOf(check), 1)
                likeList.push({
                    userName: user,
                    movieId: element.id,
                    like: true
                })
            }
        }
        if (userLogged) {
            window.localStorage.setItem('likeList', JSON.stringify(likeList));
        }
    })


    buttonDislike.className = 'button-dislike';

    likeList.forEach((item) => {
        if (item.userName === user && item.movieId === parseInt(element.id) && item.like === false) {
            buttonDislike.classList.add('active');
        }
    })

    buttonDislike.setAttribute('movieId', `${movieId}`)
    buttonDislike.setAttribute('like', false);

    buttonDislike.addEventListener('click', () => {
        const check = likeList.find((item) => item.userName === user && item.movieId === movieId);
        if (check === undefined) {
            buttonDislike.classList.toggle('active');
            likeList.push({
                userName: user,
                movieId: movieId,
                like: false
            })
        } else {
            buttonDislike.classList.toggle('active');
            if (!check.like) {
                likeList.splice(likeList.indexOf(check), 1)
            } else {
                buttonLike.classList.toggle('active');
                likeList.splice(likeList.indexOf(check), 1)
                likeList.push({
                    userName: user,
                    movieId: element.id,
                    like: false
                })
            }
        }
        if (userLogged) {
            window.localStorage.setItem('likeList', JSON.stringify(likeList));
        }
    })
    // a qui
    const movieInfoDiv = document.createElement('div');
    movieInfoDiv.className = 'movie_info_modal';

    movieInfoDiv.appendChild(buttonPlay);
    movieInfoDiv.appendChild(buttonBook);
    movieInfoDiv.appendChild(buttonLike);
    movieInfoDiv.appendChild(buttonDislike);

    const info = document.createElement('p');
    info.innerHTML = `${movieYear} <span class="cat">${movieAdult ? 'VM 14' : 'T'}</span>`;

    const genres = document.createElement('p');
    genres.innerHTML = movieGenres.map(item => item.name).join('<span class="separator"> • </span>');

    const desc = document.createElement('p');
    desc.textContent = movieOverview;

    const similar = document.createElement('div')
    similar.className = 'modal_similar';
    const similarTitle = document.createElement('h3');
    const similarPrev = document.createElement('div');
    similarPrev.setAttribute('id', 'similar');

    similar.appendChild(similarTitle);
    similar.appendChild(similarPrev);

    modalContainer.appendChild(title)
    modalContainer.appendChild(movieInfoDiv)
    modalContainer.appendChild(genres)
    modalContainer.appendChild(info)
    modalContainer.appendChild(desc)
    modalContainer.appendChild(similar)

    movieModal.classList.add('show');

    closeBtn.addEventListener('click', () => {
        modalWindow.textContent = '';
        movieModal.classList.remove('show');
    }, { once: true })

    similarMovies(movieId);
}

const youtubeSearch = async (movieTitle, container) => {
    const searchQuery = movieTitle.replaceAll(' ', '+') + '+trailer+film+ita';
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=AIzaSyDXm7O6AY7HQGSWdWBLmvyMM1RC9D1NHro`);
    const data = await res.json();
    const youtubeIFrame = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${data.items[0].id.videoId}?autoplay=1&showinfo=0&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;" allowfullscreen></iframe>`
    container.innerHTML = youtubeIFrame;
}



export function playFunction() {
    const movieModal = document.createElement('div');
    movieModal.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/LW2x7w3DkzA?autoplay=1&showinfo=0&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    movieModal.className = 'full-movie-modal';

    const movieOverlay = document.createElement('div');
    movieOverlay.className = 'full-movie-overlay';

    const movieOverlayBottom = document.createElement('div');
    movieOverlayBottom.className = 'full-movie-overlay-bottom';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'chiudi';
    movieOverlay.appendChild(closeBtn);

    closeBtn.addEventListener('click', () => {
        movieModal.innerHTML = '';
        movieModal.classList.remove('show');
    })

    movieModal.appendChild(movieOverlay);
    movieModal.appendChild(movieOverlayBottom);
    document.body.appendChild(movieModal);
    movieModal.classList.add('show');

    setTimeout(() => {
        movieModal.appendChild(movieOverlay);
        movieOverlay.classList.add('end');
        movieOverlay.innerHTML = 'Sarebbe stato bellissimo ❤️';
        setTimeout(() => {
            movieModal.innerHTML = '';
            movieModal.classList.remove('show');
        }, 2000)
    }, 24500);
}



function similarMovies(movieId) {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=d81b4c0951683c467d7125a553aefc87&language=it-IT&page=1`)
        .then((response) => {
            if (response.status === 404) {
                console.error('errore!!!');
                document.querySelector('.alert').classList.add('show')
            } else {
                return response.json()
            }
        })
        .then((data) => {
            renderMoviesList('similar', data.results, 'Altri titoli simili');
        })
}


const movieModal = document.querySelector('.movie-modal');
const modalWindow = movieModal.querySelector('.modal-window');