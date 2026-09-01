import React from "react";
import { Mail, MapPin } from "lucide-react";

function Contact() {
  return (
    <section className="contact-section" id="contact">

      <div className="contact-container">

        {/* Heading */}
        <div className="section-heading contact-heading">
          <p>GET IN TOUCH</p>

          <h2>
            Let's <span>Connect</span>
          </h2>

          <p className="contact-description">
            Feel free to connect with me through any of the platforms below.
          </p>
        </div>


        {/* Contact Details */}
        <div className="contact-links">

          {/* Email */}
          <a
            href="mailto:YOUR_EMAIL@gmail.com"
            className="contact-pill"
          >
            <div className="contact-pill-icon">
              <Mail size={20} />
            </div>

            <div className="contact-pill-text">
              <span>Email</span>
              <strong>fathimahaanim2003@gmail.com</strong>
            </div>
          </a>


          {/* GitHub */}
          <a
            href="https://github.com/haanimarf"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-pill"
          >
            <div className="contact-pill-icon">
             <span className="social-text">GH</span>
            </div>

            <div className="contact-pill-text">
              <span>GitHub</span>
              <strong>github.com/haanimarf</strong>
            </div>
          </a>


          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/fathima-haanim/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3B7b6ZXSNNR2mBkBqGnVJ1Iw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-pill"
          >
            <div className="contact-pill-icon">
             <span className="social-text">in</span>
            </div>

            <div className="contact-pill-text">
              <span>LinkedIn</span>
              <strong>Fathima Haanim</strong>
            </div>
          </a>


          {/* Location */}
          <div className="contact-pill">
            <div className="contact-pill-icon">
              <MapPin size={20} />
            </div>

            <div className="contact-pill-text">
              <span>Location</span>
              <strong>Sri Lanka</strong>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Contact;

