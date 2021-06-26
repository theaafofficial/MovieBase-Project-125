import React, { useState, useEffect } from "react";
import "./fav.css";
import MovieList from "./MovieList";
import axios from "./axios";
import Nav from "./Nav";

function Fav() {
  let [favorite, setFavourite] = useState([]);
  let url = "http://localhost:5000/api/v1/movies/fav"
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        url
      );
      setFavourite(request.data.favorite);
      console.log(favorite);
      return request;
    }
    fetchData();
  }, [url]);
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
     <Nav title="Favorites" link="/" linkText="Home"/>
     <MovieList movies={favorite}></MovieList>
    </div>
  );
}

export default Fav;
