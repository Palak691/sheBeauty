import React from 'react'
import './Contact.css'

export const Contact = () => {
  return (
    <div className="contact">
      <div className="contactHeader">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Feel free to reach out!</p>
      </div>

      <div className="contactContainer">
        <div className="contactForm">
          <h2>Send a Message</h2>

          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <input type="text" placeholder="Subject" />

          <textarea
            rows="6"
            placeholder="Write your message..."
          ></textarea>

          <button>Send Message</button>
        </div>

        <div className="contactInfo">
          <h2>Contact Information</h2>

          <p><strong>Email:</strong> support@shebeauty.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Address:</strong> New Delhi, India</p>
          <p><strong>Working Hours:</strong></p>
          <p>Monday - Saturday</p>
          <p>10:00 AM - 7:00 PM</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;