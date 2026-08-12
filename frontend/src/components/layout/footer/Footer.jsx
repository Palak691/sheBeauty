import React from 'react'
import "./Footer.css";
import {FaInstagram,FaPinterestP,FaFacebookF,FaYoutube,} from "react-icons/fa";
import img from '../../../assets/new/img.jpg'

export const Footer = () => {
  return (
     <footer className="footer">

      <div className="footerQuote">
        <h2>"Every shade has a story. Every woman has her own."</h2>
      </div>
      <div className='inspiringImg'>
      <img src={img} alt="img" />
      </div>

      <div className="footerContainer">

        {/* Brand */}
        <div className="footerBrand">
          <h1 style={{color : "#e75480"}}>SheBeauty</h1>
          <p>
            Beauty that celebrates confidence, individuality,
            and every shade of you.
          </p>

          <div className="socialIcons">
            <FaInstagram />
            <FaPinterestP />
            <FaFacebookF />
            <FaYoutube />
          </div>
        </div>

        {/* Shop */}
        <div className="footerLinks">
          <h3>Shop</h3>

          <a href="#">Best Sellers</a>
          <a href="#">Skincare</a>
          <a href="#">Makeup</a>
          <a href="#">New Arrivals</a>
        </div>

        {/* Company */}
        <div className="footerLinks">
          <h3>Company</h3>

          <a href="#">About</a>
          <a href="#">Our Story</a>
          <a href="#">Blog</a>
          <a href="#">Careers</a>
        </div>

        {/* Help */}
        <div className="footerLinks">
          <h3>Support</h3>

          <a href="#">Contact</a>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
          <a href="#">FAQ</a>
        </div>

        {/* Newsletter */}
        <div className="newsletter">
          <h3>Stay Updated</h3>

          <p>
            Get exclusive offers and be the first to know about new launches.
          </p>

          <div className="subscribe">
            <input
              type="email"
              placeholder="Enter your email"
            />

            <button>Subscribe</button>
          </div>
        </div>

      </div>

      <div className="footerBottom">
        <p>© 2026 SheBeauty. All Rights Reserved.</p>

        <div>
          <span>Privacy Policy</span>
          <span>Terms</span>
          <span>Cookies</span>
        </div>
      </div>

    </footer>
  )
}
