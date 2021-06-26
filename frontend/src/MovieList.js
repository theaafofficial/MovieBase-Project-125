import React from "react";
import "./movielist.css";

const MovieList = (props) => {
  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="movie-card-container">
          <div className="image-container">
            <div
              className="bg-image"
              style={{ backgroundImage: `url(${movie.picture})` }}
            />
          </div>
          <div className="movie-info">
            <h2>Movie Details</h2>
            <div>
              <h1>{movie.title}</h1>
              <small>Released Date: {movie.year}</small>
            </div>

            <p>{movie.plot}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
