import React, { useEffect, useState } from "react";
import "./Nav.css";
import {Link } from "react-router-dom";
function Nav({ title, link, linkText }) {
  const [show, setShow] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  
  //This useEffect will be called everytime the user Scrolls
  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);

    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    //Back tick is used for string entapulation
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <h1>{title}</h1>
        <div>
        
        <Link to={link}>
          <button className="nav__button" type="button">{linkText}</button>
        </Link>

        </div>
        
      </div>
    </div>
  );
}

export default Nav;
