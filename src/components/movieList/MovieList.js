import React from 'react'


const MovieList = (props) => {
    const FavouritesComponent = props.favouritesComponent
    return(
        <>
            {props.movies.map((movie, index) =>
                <div className="image-container d-flex justify-content-start m-3">
                <img src={movie.Poster} alt={movie.Title}/>
                <div
                    onClick={() => props.handleFavouritesClick(movie)}
                    className="overlay d-flex align-items-center justify-content-center"
                >
                    <FavouritesComponent/>
                </div>
            </div> )}
            </>
    )
}

export default MovieList