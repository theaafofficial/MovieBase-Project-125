import React, { useEffect, useState } from "react";
import "./create.css";
import axios from "./axios";
import { NavLink, Route,Link } from "react-router-dom";
import Nav from "./Nav";


function CreateMovie() {
  const [title, setTitle] = useState([]);
  const [plot, setPlot] = useState([]);
  const [year, setYear] = useState([]);
  const [link, setLink] = useState([]);
 
  
  const addMovie = () => {
    
   
    axios({
      method: "post",
      url: "http://localhost:5000/api/v1/movies",
      data: {
        title: title,
        plot: plot,
        year: year,
        picture: link,
      },
    });
    alert("Added to Movies Database");
  };
  return (
    <>
    <Nav title="Add movie" link="/" linkText="Home"/>
        <header className="banner">
          <div className="container">
          <form>    
          <input
              
              onChange={(event) => setTitle(event.target.value)}
              className="input"
              placeholder="Title"
            />
            <input
              
              onChange={(event) => setPlot(event.target.value)}
              className="input"
              placeholder="Plot"
            />
            <input
              
              onChange={(event) => setYear(event.target.value)}
              className="input"
              placeholder="Year"
            />
            <input
              
              onChange={(event) => setLink(event.target.value)}
              className="input"
              placeholder="Picture Link"
            />
            <button className='search__btn' type="button" onClick={()=> addMovie()}>
                Save Movie
              </button>
              </form>
          </div>
          
          
        </header>
      
    </>
  );
}

export default CreateMovie;
