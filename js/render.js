import { moviesGenres } from './apis.js';
import { userLogged, user, likeList, bookList } from './login.js';
import { showModal, playFunction } from './movie-modal.js';
import { slideControll } from './domfunctions.js';
import { secret } from './domfunctions.js';

export function renderMoviesList(container, data, myList) {
    if (myList === 'La mia lista' | myList === 'Risulati ricerca') {
        const top = document.querySelector(`#top-rated`);
        top.innerHTML = '';
        const topTitle = top.parentNode.querySelector('h3');
        topTitle.textContent = '';

        const now = document.querySelector(`#now-playing`);
        now.innerHTML = '';
        const nowTitle = now.parentNode.querySelector('h3');
        nowTitle.textContent = '';

        const pop = document.querySelector(`#popular`);
        pop.innerHTML = '';
        pop.classList.add('wrap')

        const hero = document.querySelector('.main__hero');
        hero.innerHTML = '';
        const splashImg = document.createElement('img');
        splashImg.setAttribute('src', './img/blank.png');
        hero.appendChild(splashImg);
    } else {
        const pop = document.querySelector(`#popular`);
        pop.classList.remove('wrap')
    }

    const wrapper = document.querySelector(`#${container}`);
    const sectionTitle = wrapper.parentNode.querySelector('h3');
    if (myList === 'I più popolari su Thrillix' && secret === true){
        sectionTitle.textContent = 'I piu popolari su Netflix';
    } else {
        sectionTitle.textContent = myList; 
    }

    wrapper.innerHTML = '';
    if (data.length < 1) {
        wrapper.textContent = 'Non hai ancora aggiunto nessun film';
    }

    wrapper.style.left = '0px'


    const forwardBtn = document.createElement('div');
    forwardBtn.className = 'forward-btn';
    forwardBtn.addEventListener('click', (event) => {
        slideControll(wrapper, 'forward', event);
    })

    const backwardBtn = document.createElement('div');
    backwardBtn.className = 'backward-btn';
    backwardBtn.addEventListener('click', (event) => {
        slideControll(wrapper, 'backward', event);
    })

    wrapper.parentNode.appendChild(forwardBtn);
    wrapper.parentNode.appendChild(backwardBtn);

    if (myList === 'La mia lista' | myList === 'Risulati ricerca') {
        const back = document.querySelectorAll('.backward-btn');
        const forw = document.querySelectorAll('.forward-btn');
        back.forEach(item =>{
            item.classList.add('hide');
        })
        forw.forEach(item =>{
            item.classList.add('hide');
        })
    } else {
        const back = document.querySelectorAll('.backward-btn');
        const forw = document.querySelectorAll('.forward-btn');
        back.forEach(item =>{
            item.classList.remove('hide');
        })
        forw.forEach(item =>{
            item.classList.remove('hide');
        })
    }

    data.forEach(element => {
        const movieContainer = document.createElement('div');
        movieContainer.className = 'movie_container';

        const movieDiv = document.createElement('div');
        movieDiv.className = 'movie_div';
        movieDiv.style.backgroundImage = `url(${smallImgUrl + element.poster_path})`;

        const movieTitle = document.createElement('div');
        movieTitle.className = 'movie_title';
        movieTitle.textContent = element.title;
        movieDiv.appendChild(movieTitle);

        movieContainer.appendChild(movieDiv);

        const genres = moviesGenres.genres.filter((genre) => {
            if ([...element.genre_ids].filter((gen) => gen === genre.id).length > 0) {
                return genre.name
            }
        })

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
            if (item.userName === user && item.id === parseInt(element.id)) {
                buttonBook.classList.add('active');
            }
        })

        buttonBook.addEventListener('click', () => {
            const check = bookList.find((item) => item.userName === user && item.id === element.id);
            if (check === undefined) {
                buttonBook.classList.toggle('active');
                bookList.push({
                    userName: user,
                    adult: element.adult,
                    backdrop_path: element.backdrop_path,
                    genre_ids: element.genre_ids,
                    id: element.id,
                    overview: element.overview,
                    poster_path: element.poster_path,
                    release_date: element.release_date,
                    title: element.title
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
            if (item.userName === user && item.movieId === parseInt(element.id) && item.like === true) {
                buttonLike.classList.add('active');
            }
        })

        buttonLike.setAttribute('movieId', `${element.id}`)
        buttonLike.setAttribute('like', true);

        buttonLike.addEventListener('click', () => {
            const check = likeList.find((item) => item.userName === user && item.movieId === element.id);
            if (check === undefined) {
                buttonLike.classList.toggle('active');
                likeList.push({
                    userName: user,
                    movieId: element.id,
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

        buttonDislike.setAttribute('movieId', `${element.id}`)
        buttonDislike.setAttribute('like', false);

        buttonDislike.addEventListener('click', () => {
            const check = likeList.find((item) => item.userName === user && item.movieId === element.id);
            if (check === undefined) {
                buttonDislike.classList.toggle('active');
                likeList.push({
                    userName: user,
                    movieId: element.id,
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

        const buttonDownArrow = document.createElement('button');
        buttonDownArrow.className = 'button-down-arrow';

        if (myList === 'Altri titoli simili' || innerWidth > 812) {
            buttonDownArrow.addEventListener('click', () => {
                window.scrollTo(0, 0);
                showModal(element.title, element.id, element.overview, element.adult, element.release_date.split('-', 1)[0], genres, element.backdrop_path, element.poster_path, element.release_date)
            })
        } else {
            movieContainer.addEventListener('click', () => {
                window.scrollTo(0, 0);
                showModal(element.title, element.id, element.overview, element.adult, element.release_date.split('-', 1)[0], genres, element.backdrop_path, element.poster_path, element.release_date)
            })
        }



        movieInfo.appendChild(buttonPlay);
        movieInfo.appendChild(buttonBook);
        movieInfo.appendChild(buttonLike);
        movieInfo.appendChild(buttonDislike);

        movieInfo.appendChild(buttonDownArrow);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';
        infoDiv.innerHTML = `${element.release_date.split('-', 1)} <span class="cat">${element.adult ? 'VM 14' : 'T'}</span>`;
        movieInfo.appendChild(infoDiv);

        const genresDiv = document.createElement('div');
        genresDiv.className = 'genres';
        genresDiv.innerHTML = genres.map(item => item.name).join('<span class="separator"> • </span>');
        movieInfo.appendChild(genresDiv);

        movieContainer.appendChild(movieInfo);
        wrapper.appendChild(movieContainer);
    });
}



export function renderHero(data) {
    const heroSelection = Math.floor(Math.random() * data.length);
    const heroSection = document.querySelector('.main__hero');
    heroSection.innerHTML = '';
    const heroImg = document.createElement('img');
    heroImg.setAttribute('src', `${wideImgUrl + data[heroSelection].backdrop_path}`);
    heroSection.appendChild(heroImg);

    const heroContent = document.createElement('div');
    heroContent.className = 'hero__content';
    heroSection.appendChild(heroContent);
    const title = document.createElement('div');
    title.className = 'title';
    title.innerHTML = `<h1>${data[heroSelection].title}</h1>`;

    const desc = document.createElement('div');
    desc.className = 'description';
    desc.innerHTML = `<h2>${data[heroSelection].overview.length > 1 ? data[heroSelection].overview.split('.', 1) + '.' : ''}</h2>`;

    const heroButtons = document.createElement('div');
    heroButtons.className = 'hero-buttons';

    const heroPlayBtn = document.createElement('button');
    heroPlayBtn.className = 'hero-play';
    heroPlayBtn.textContent = 'Riproduci';
    const heroInfoBtn = document.createElement('button');
    heroInfoBtn.className = 'hero-info';
    heroInfoBtn.textContent = 'Altre info';

    const genres = moviesGenres.genres.filter((genre) => {
        if ([...data[heroSelection].genre_ids].filter((gen) => gen === genre.id).length > 0) {
            return genre.name
        }
    })

    heroPlayBtn.addEventListener('click', () => {
        playFunction()
    })

    heroInfoBtn.addEventListener('click', () => {
        showModal(data[heroSelection].title, data[heroSelection].id, data[heroSelection].overview, data[heroSelection].adult, data[heroSelection].release_date.split('-', 1)[0], genres, data[heroSelection].backdrop_path, data[heroSelection].poster_path, data[heroSelection].release_date);
    })

    heroButtons.appendChild(heroPlayBtn);
    heroButtons.appendChild(heroInfoBtn);

    heroContent.appendChild(title);
    heroContent.appendChild(desc);
    heroContent.appendChild(heroButtons);

}


const verticalImgUrl = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2';
const wideImgUrl = 'https://www.themoviedb.org/t/p/w1920_and_h1080_multi_faces';
const smallImgUrl = 'https://www.themoviedb.org/t/p/w500/'