// поиск из search

const defaultUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const imgPath = 'https://image.tmdb.org/t/p/w1280';

const searchUrl =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const search = document.querySelector('.search');

findMovies(defaultUrl);

function findMovies(url){
	let movies = document.querySelector('.main').children;
  fetch(url).then(res => res.json())
  	.then(function(data){
    data.results.forEach((el, i) => {
/*				let poster = movies[i].querySelector('.poster');*/
				var downloadingImage = new Image();
				downloadingImage.onload = function(){
					movies[i].querySelector('.poster').src = this.src;  
				};
				downloadingImage.src = imgPath + el.poster_path;
				movies[i].querySelector('.title').innerHTML = el.title;

				let vote = movies[i].querySelector('.vote');
				vote.innerHTML = el.vote_average;
				vote.classList.remove('below5', 'over5', 'over8');
				if (el.vote_average < 5) {	vote.classList.add('below5')}
				else if (el.vote_average <= 8) { vote.classList.add('over5')} else { vote.classList.add('over8')}

				movies[i].querySelector('.overview-text').innerHTML = el.overview;
    })
  })
}

search.addEventListener('change', function() {
	if (this.value != '') {
		findMovies(searchUrl + search.value);
	}
})
/*
const input = document.querySelector('.close');

searchEmpty.addEventListener('click', function() {
	search.value = '';
}*/


