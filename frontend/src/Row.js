import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";
import Popup from "./Popup";
let favList;
function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [description, setDescription] = useState(false);
  const [movie, setMovie] = useState({});
  const [favourites, setFavourites] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = (movie) => {
    setIsOpen(!isOpen);
    setMovie(movie);
  };

  //if you are using a variable outside useEffect write it in the empty square bracket argument.
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log(request.data.movies);
      setMovies(request.data.movies);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    setDescription(true);
    setMovie(movie);
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    console.log(movie);
    axios({
      method: "post",
      url: "http://localhost:5000/api/v1/movies/fav",
      data: {
        title: movie.title,
        plot: movie.plot,
        year: movie.year,
        picture: movie.picture,
      },
    });
    alert("Added to Favorites");
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <>
            <img
              className="row__posterLarge"
              key={movie._id}
              src={`${movie.picture}`}
              alt={movie.title}
              onClick={() => togglePopup(movie)}
            />
            
          </>
        ))}
      </div>
      <div className="row"></div>
      {isOpen && (
        <Popup
          content={
            <div className="description__container">
              <div className="text__container">
                <h2>{movie?.title || ""}</h2>
                <button
                  onClick={() => addFavouriteMovie(movie)}
                  className="favorite__button"
                >
                  Add to Favorite
                </button>

                <p>{movie.year}</p>
                <p>{movie.plot}</p>
              </div>
              <div className="img__container">
                <img
                  className="detail__img"
                  key={movie?._id}
                  src={`${movie?.picture}`}
                  alt={movie?.title}
                />
              </div>
            </div>
          }
          handleClose={togglePopup}
        />
      )}
      {/* {description && (
        <div className="description__container">
          <div className="text__container">
            <h2>{movie?.title || ""}</h2>
            <button  onClick={()=>addFavouriteMovie(movie)} className="favorite__button">Add to Favorite
            
            </button>
        
            <p>{movie.year}</p>
            <p>{movie.plot}</p>
          </div>
          <div className="img__container">
            <img
              className="detail__img"
              key={movie?._id}
              src={`${movie?.picture}`}
              alt={movie?.title}
            />
          </div>
        </div>
      )} */}
    </div>
  );
}

export default { Row, favList };
