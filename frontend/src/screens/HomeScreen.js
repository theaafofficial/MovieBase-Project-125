import React from "react";
import Nav from "../Nav";
import Banner from "../Banner";
import RowF from "../Row";


function HomeScreen() {
  let Row = RowF.Row
  return (
    <div className="homeScreen">
      <Nav title="Movie Base" link="/favorites" linkText="Favorites"/>
      <Banner />
      <Row
        title="Trending"
        fetchUrl={"http://localhost:5000/api/v1/movies"}
      />
      <Row title="Most Watched" fetchUrl={"http://localhost:5000/api/v1/movies"} />
      
    </div>
  );
}

export default HomeScreen;
