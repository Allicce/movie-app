import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MovieList from "./components/movieList/MovieList";
import MovieListHeading from "./components/movieListHeading/MovieListHeading";
import SearchBox from "./components/SearchBox/SearchBox";
import AddFavourites from "./components/addFavourites/AddFavourites";
import RemoveFavourites from "./components/removeFavourites/RemoveFavourites";

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favourites, setFavourites] = useState([])

  useEffect(() => {
    getMovieRequest()
  },[searchValue])

  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('react-movie-app-favourites'))
    setFavourites(movieFavourites)
  },[])

  const setToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  }

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=3cdc9c89`

    const response = await fetch(url)
    const responseJSON = await response.json()
    responseJSON.Search && setMovies(responseJSON.Search)
  }

  const addFavoriteMovies = (movie) => {
    const newFavouriteList = [...favourites, movie]
    setFavourites(newFavouriteList)
    setToLocalStorage(newFavouriteList)
  }

  const removeFavourites = (movie) => {
    const newFavouriteList = favourites.filter(
        (favourite) => favourite.imdbID !== movie.imdbID
    )
    setFavourites(newFavouriteList)
    setToLocalStorage(newFavouriteList)
  }
  return <div className="container-fluid movie-app">
    <div className="row d-flex align-items-center mt-4 mb-4">
      <MovieListHeading heading="Movies"/>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
    <div className="row">
      <MovieList
          movies={movies}
          favouritesComponent={AddFavourites}
          handleFavouritesClick={addFavoriteMovies}
      />
    </div>
    <div className="row d-flex align-items-center mt-4 mb-4">
      <MovieListHeading heading="Favourites"/>
    </div>
    <div className="row">
      <MovieList
          movies={favourites}
          favouritesComponent={RemoveFavourites}
          handleFavouritesClick={removeFavourites}
      />
    </div>
  </div>
}

export default App;
