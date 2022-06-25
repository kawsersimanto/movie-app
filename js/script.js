async function getMovies() {
  const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";
  const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

  const response = await fetch(APIURL);
  const movies = await response.json();

  movies.results.forEach((movie) => {
    const { poster_path, title, vote_average } = movie;
    const row = document.querySelector(".row");
    const div = document.createElement("div");
    div.className = "col-lg-3";
    div.innerHTML = `
      <div class="movie shadow">
        <div class="movie-img">
          <img
            class="img-fluid"
            src="${IMGPATH + poster_path}"
            alt="${title}"
          />
        </div>
        <div
          class="movie-info d-flex align-items-center justify-content-between p-3"
        >
          <h5 class="title d-inline-block text-capitalize">
            ${title}
          </h5>
          <span class="rating bg-dark py-1 px-2 fw-bold">${vote_average}</span>
        </div>
      </div
    `;
    row.append(div);
  });
}

getMovies();
