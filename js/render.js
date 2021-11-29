import { moviesGenres } from './apis.js'

export function renderMoviesList(container, data) {
    const wrapper = document.querySelector(`#${container}`)
    console.log(data)
    data.forEach(element => {
        const movieContainer = document.createElement('div');
        movieContainer.className = 'movie_container';

        const movieDiv = document.createElement('div');
        movieDiv.className = 'movie_div';
        movieDiv.style.backgroundImage = `url(${wideImgUrl+element.poster_path})`;

        const movieTitle = document.createElement('div');
        movieTitle.className = 'movie_title';
        movieTitle.textContent = element.title;
        movieDiv.appendChild(movieTitle);

        movieContainer.appendChild(movieDiv);

        const genres = moviesGenres.genres.filter((genre)=> {
            if ([...element.genre_ids].filter((gen) => gen === genre.id).length > 0) {
                return genre.name
            }
        })

        const movieInfo = document.createElement('div');
        movieInfo.className = 'movie_info';
        movieInfo.innerHTML = `<button>X</button>
        <button>X</button>
        <button>X</button>
        <button>X</button>
        ${genres.map(item => item.name)}`;

       
        movieContainer.appendChild(movieInfo);
        wrapper.appendChild(movieContainer);
    });
}



export function renderHero(data) {
    const heroSelection = Math.floor(Math.random() * data.length);
    const heroSection = document.querySelector('.main__hero');
    const heroImg = document.createElement('img');
    heroImg.setAttribute('src', `${wideImgUrl+data[heroSelection].backdrop_path}`);
    heroSection.appendChild(heroImg);

    const heroContent = document.querySelector('.hero__content');
    const title = document.createElement('div');
    title.className = 'title';
    title.innerHTML = `<h1>${data[heroSelection].title}</h1>`;

    const desc = document.createElement('div');
    desc.className = 'description';
    desc.innerHTML = `<h2>${data[heroSelection].overview.split('.', 1)}.</h2>`;

    const heroButtons = document.createElement('div');
    heroButtons.className = 'hero-buttons';

    const heroPlayBtn = document.createElement('button');
    heroPlayBtn.className = 'hero-play';
    heroPlayBtn.textContent = 'Riproduci';
    const heroInfoBtn = document.createElement('button');
    heroInfoBtn.className = 'hero-info';
    heroInfoBtn.textContent = 'Altre info';

    heroButtons.appendChild(heroPlayBtn);
    heroButtons.appendChild(heroInfoBtn);

    heroContent.appendChild(title);
    heroContent.appendChild(desc);
    heroContent.appendChild(heroButtons);

}



const verticalImgUrl = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2';
const wideImgUrl = 'https://www.themoviedb.org/t/p/w1920_and_h1080_multi_faces'