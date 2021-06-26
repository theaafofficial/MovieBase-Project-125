import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "./axios";
import { Link } from "react-router-dom";


function Banner() {
  const [movie, setMovie] = useState([]);
 
  
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get("http://localhost:5000/api/v1/movies");
      setMovie(
        request?.data?.movies[
          Math.floor(Math.random() * request?.data?.movies.length - 1)
        ]
      );
      return request;
    }

    fetchData();
  }, []);
  return (
    <>
     
        <header className="banner">
          <div className="text__container">
            <h1>Welcome to Movie Base</h1>
            <p>Detail archive of Movies</p>
            <Link to="/search">
              <button className='search__btn' type="button">
                Search
              </button>
            </Link>
            <Link to="/creation">
              <button className='search__btn' type="button">
                Add movie
              </button>
            </Link>
          </div>
          <div className="img__container">
            <img className="img__banner" src={movie.picture} alt="Banner" />
          </div>
        </header>
      
    </>
  );
}

export default Banner;
