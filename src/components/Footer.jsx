import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Left */}
        <div className="footer-brand">
          <a href="#home" className="footer-logo">
            Fathima <span>Haanim</span>
          </a>

          <p>
            Computer Science Undergraduate
            passionate about data, technology and problem solving.
          </p>
        </div>


        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>

          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#certificates">Certificates</a>
          <a href="#contact">Contact</a>
        </div>


        {/* Social */}
        <div className="footer-social">
          <h4>Connect</h4>

          <a
            href="https://github.com/haanimarf"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/fathima-haanim/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BSeC0nYWRQgCuWxFqfyv%2FPQ%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>

      </div>


      {/* Bottom */}
      <div className="footer-bottom">

        <p>
          © {currentYear} Fathima Haanim. All rights reserved.
        </p>

        <p>
          Built with React
        </p>

      </div>

    </footer>
  );
}

export default Footer;

