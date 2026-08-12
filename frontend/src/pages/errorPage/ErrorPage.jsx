import React from 'react'
import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";
import img from "../../assets/extras/img5.jpg";

export const ErrorPage = () => {
    const navigate = useNavigate()
  return (
     <div className="errorPage">
      <div className="errorContent">

        <img src={img} alt="Not Found" />

        <h1>404</h1>

        <h2>Oops! Beauty Lost?</h2>

        <p>
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="errorBtns">
          <button onClick={() => navigate(-1)}>
            Go Back
          </button>

          <button onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  )
}
