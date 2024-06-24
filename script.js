const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=<your_moviedb_api_key>&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI1 = "https://api.themoviedb.org/3/search/movie?query=";
const SEARCHAPI2 = "&api_key=<your_moviedb_api_key>";


const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK)
function returnMovies(url) {
	fetch(url).then(res => res.json())
	.then(function(data) {
		// console.log(data.results);
		if(data.results.length === 0) {
			const div_row = document.createElement("div");
			div_row.setAttribute("class","row");
			const noResultText = document.createElement("h3");
			noResultText.innerText = "No Results Found!\nTry searching for something else.";
			const center = document.createElement("center");
			center.appendChild(noResultText);
			main.appendChild(center);
		}
		else {
			data.results.forEach(element => {
				if(element.poster_path !== null) {
					const div_card = document.createElement("div");
					div_card.setAttribute("class","card");
					const div_row = document.createElement("div");
					div_row.setAttribute("class","row");
					const div_col = document.createElement("div");
					div_col.setAttribute("class","column");
					const image = document.createElement("img");
					image.setAttribute("class","thumbnail");
					image.setAttribute("id","image");
					const title = document.createElement("h3");
					title.setAttribute("id","title");
					const center = document.createElement("center");

					const releaseYear = element.release_date.slice(0,4);
					if(releaseYear) {
						title.innerHTML = `${element.title + " (" + releaseYear + ")"}<br><a href="movie.html?id=${element.id}&title=${element.title}">Reviews</a>`;	
					}
					else{
						title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">Reviews</a>`;		
					}
					image.src = IMG_PATH + element.poster_path;

					center.appendChild(image);
					div_card.appendChild(center);
					div_card.appendChild(title);
					div_col.appendChild(div_card);
					div_row.appendChild(div_col);
					main.appendChild(div_row);

				}
			});
		}
	});
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	main.innerHTML = "";

	const searchItem = search.value;
	console.log(searchItem);
	if(searchItem) {
		returnMovies(SEARCHAPI1 + searchItem + SEARCHAPI2);
		search.value = "";
	}
});
