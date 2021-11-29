export function renderMoviesList(container, data) {
    const wrapper = document.querySelector(`#${container}`)
    data.forEach(element => {
        const movieDiv = document.createElement('div');
        movieDiv.className = 'movie_div';
        movieDiv.style.backgroundImage = `url(${wideImgUrl+element.poster_path})`;
        wrapper.appendChild(movieDiv)
    });
}

export function renderHero(data) {
    const heroSelection = Math.floor(Math.random() * data.length);
    const heroSection = document.querySelector('.main__hero');
    const heroImg = document.createElement('img');
    heroImg.setAttribute('src', `${wideImgUrl+data[heroSelection].backdrop_path}`);
    heroSection.appendChild(heroImg)
}



const verticalImgUrl = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2';
const wideImgUrl = 'https://www.themoviedb.org/t/p/w1920_and_h1080_multi_faces'