window.addEventListener("DOMContentLoaded", () => {
  const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";
  const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

  const form = document.querySelector("form");
  const input = document.querySelector("input");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = input.value;
    if (searchTerm) {
      getMovies(SEARCHAPI + searchTerm);
      input.value = "";
    }
  });

  getMovies(APIURL);

  async function getMovies(url) {
    const response = await fetch(url);
    const movies = await response.json();

    showMovies(movies.results);
  }

  function showMovies(movies) {
    const row = document.querySelector(".row");
    row.innerHTML = "";

    movies.forEach((movie) => {
      const { poster_path, title, vote_average } = movie;
      const div = document.createElement("div");
      if (poster_path !== null) {
        div.className = "col-xxl-3 col-lg-4 col-sm-6 col-12";
        div.innerHTML = `
        <div class="movie shadow w-100">
          <div class="movie-img">
            <img
              class="img-fluid w-100"
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
            <span class="rating bg-dark py-1 px-2 fw-bold ${checkRating(
              vote_average
            )}">${vote_average}</span>
          </div>
        </div
      `;
        row.append(div);
      }
    });
  }

  function checkRating(vote) {
    if (vote >= 8) return "text-success";
    else if (vote >= 6) return "text-warning";
    else return "text-danger";
  }
});
