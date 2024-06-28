const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api/themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query";

const main = document.getElementById("content");
const form = document.getElementById("form");
const search = document.getElementById("search");

//const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
//const BASE_URL = 'https://api.themoviedb.org/3';
//const APIURL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
//const IMGPATH = 'https://image.tmdb.org/t/p/w500';
//const SEARCHAPI = BASE_URL + '/search/movie?'+API_KEY;


getMovies(APIURL);

async function getMovies(url){
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    showMovies(data.results);
}

function showMovies(movies)
{
    main.innerHTML = "";
    movies.forEach(movie => {
        const {poster_path,title,overview,vote_average } = movie;
        const movieEl =  document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
        <img src = "${IMGPATH}${poster_path}" alt="${title}">
        <div class="movie-info">
        <h3>${title}</h3>
        <span class ="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
         <div class="overview">
         <h3>Overview:</h3>
         ${overview}
         </div>
         `;
         main.appendChild(movieEl);
    });
}

function getClassByRate(vote){
    if(vote>=8){
        return "green";
    }else if(vote>=5){
        return "orange";
    }else{
        return "red";
    }
}


form.addEventListener("submit",e =>{
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);
        search.value = "";
    }
});