let movies = [];

function addMovie(){
    let title = document.getElementById("title").value;
    let genre = document.getElementById("genre").value;
    if (title === "" || genre === "") {            // check if empty
        alert("Please fill in all fields");
        return;

    }
     //title,genre,status,rating,watchagain
    let movie = {
        title: title,
        genre: genre,
        status: "To Watch",
        rating: 0 ,
        watchAgain: false
    };

    //push intside the array

    movies.push(movie);
    document.getElementById("title").value = "";  //clear input fields
    document.getElementById("genre").value = ""; 
    displayMovies();  //constant updating the users list
}




function displayMovies(filteredMovies){
    let movieList = document.getElementById("movie-list");
        movieList.innerHTML = "";

    let moviesToDisplay = filteredMovies || movies;
    for (let i = 0; i < moviesToDisplay.length; i++){
        let movie = moviesToDisplay[i];
        let li = document.createElement("li");
        li.className = "list-group-item";
        // create user list whem sumbit
    li.innerHTML = 
            //  fixed the white background when creating user list 
   ` <div class="list-background-color">
                <b class="list-text-color fs-1">${movie.title}</b>
                <b class="list-text-color fs-1"> - ${movie.genre}</b>
                <button class="btn btn-sm ${movie.watchAgain ? "btn-light" : "btn-outline-light"}" onclick="toggleWatchAgain(${i})">Watch again</button>
                
                <div class="status-buttons">
                    <button class="btn btn-sm ${movie.status === "To Watch" ? "btn-primary" : "btn-outline-primary"}" onclick="updateStatus(${i}, 'To Watch')">To Watch</button>
                    <button class="btn btn-sm ${movie.status === "Watching" ? "btn-warning" : "btn-outline-warning"}" onclick="updateStatus(${i}, 'Watching')">Watching</button>
                    <button class="btn btn-sm ${movie.status === "Completed" ? "btn-success" : "btn-outline-success"}" onclick="updateStatus(${i}, 'Completed')">Completed </button>
                </div>
                <div class="rating-buttons">
                    <button class="btn btn-sm ${movie.rating === 0 ? "btn-primary" : "btn-outline-primary"}" onclick="updateRating(${i}, 0)">0 Star</button>
                    <button class="btn btn-sm ${movie.rating === 1 ? "btn-primary" : "btn-outline-primary"}" onclick="updateRating(${i}, 1)">1 Star</button>
                    <button class="btn btn-sm ${movie.rating === 2 ? "btn-primary" : "btn-outline-primary"}" onclick="updateRating(${i}, 2)">2 Stars</button>
                    <button class="btn btn-sm ${movie.rating === 3 ? "btn-primary" : "btn-outline-primary"}" onclick="updateRating(${i}, 3)">3 Stars</button>
                    <button class="btn btn-sm ${movie.rating === 4 ? "btn-primary" : "btn-outline-primary"}" onclick="updateRating(${i}, 4)">4 Stars</button>
                    <button class="btn btn-sm ${movie.rating === 5 ? "btn-primary" : "btn-outline-primary"}" onclick="updateRating(${i}, 5)">5 Stars</button>
                </div>
                <button class="btn btn-danger btn-sm" onclick="deleteMovie(${i})">Delete</button>
            </div>
        `;
    
    movieList.appendChild(li);}
}
        //0 - 5 rating buttons
    function updateRating(index, newRating) {
        movies[index].rating = parseInt(newRating)
        displayMovies()
    }
    
    // delete the users object in the array 
    function deleteMovie(index){
        movies.splice(index, 1);
        displayMovies();
    }
        // update the to watch watching compeleted 
    function updateStatus(index, newStatus){
        movies[index].status = newStatus;
        displayMovies();

        if(newStatus === "Completed"){
            document.getElementById("audio").play();   // updated so if compelted is clicked play audio
        }
    }

    // watch again
    function toggleWatchAgain(index){
        movies[index].watchAgain = !movies[index].watchAgain;
        displayMovies();
    }

 // filter movies by title or genre
function searchMovies(){
    let searchTerm= document.getElementById("search-input").value.toLowerCase();
    let filterMovies = [];

    for( let i = 0; i< movies.length; i++){
        let movie = movies[i];
        if(movie.title.toLowerCase().includes(searchTerm) || movie.genre.toLowerCase().includes(searchTerm)){
            filterMovies.push(movie);
        }
    }
    

    displayMovies(filterMovies);

}

// add/search buttton event listeners
document.getElementById("search-input").addEventListener("input", searchMovies);
document.getElementById("add-button").addEventListener("click", addMovie);

displayMovies();













