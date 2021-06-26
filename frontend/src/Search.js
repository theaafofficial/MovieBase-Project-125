import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import Nav from "./Nav";
import { NavLink, Route,Link } from "react-router-dom";
import "./Search.css";
import axios from "./axios";

function Search() {
  let [search, setSearch] = useState("1");
  let sample = [
    {
      title: "Not Found",
      plot: "Not Found",
      year: "Not Found",
      picture: "https://gotripslk.com/site/images/uploads/img.jpg",
    },
  ];
  let [movie, setMovie] = useState(sample);
  let url = "http://localhost:5000/api/v1/movies?title=";
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(url + search);
      if (request.data.total_results !== 0) {
        setMovie(request.data.movies);
      } else {
        setMovie(sample);
      }

      return request;
    }
    fetchData();
  }, [url, search, sample]);
  // const PromiseArr = [];
  // let tempARR = []
  // for (let i = 0; i < favorite.length; i++) {
  //   var url =
  //     "http://localhost:5000/api/v1/movies/id/" + favorite[i].movieID

  //   PromiseArr.push(
  //     axios
  //       .get(url)
  //       .then(
  //         (result) =>
  //           new Promise((resolve) =>
  //             resolve(result.data)
  //           )
  //       )
  //   );
  // }

  // Promise.all(PromiseArr).then((res) => {
  //   for (let index = 0; index < res.length; index++) {
  //     tempARR.push(res[index][0])

  //   }
  //  console.log(tempARR);
  // setFavouriteList(tempARR)
  // });

  // setFavouriteList(tempARR)

  // console.log(favoritelist);
  // fetchMovies()

  return (
    <div className="fav">
      <div className={`nav`}>
        <div className="nav__contents">
          <h1>Search</h1>
          <div>
            <Link to='/'>
              <button className="nav__button2" type="button">
                Home
              </button>
            </Link>
            <input
              className="nav__button"
              onChange={(event) => setSearch(event.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>
      <MovieList movies={movie}></MovieList>
    </div>
  );
}

export default Search;
