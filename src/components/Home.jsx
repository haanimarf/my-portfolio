import { ArrowRight, Download, Mail } from "lucide-react";

function Home() {
  return (
    <section className="home-section" id="home">
      <div className="home-container">

        {/* LEFT CONTENT */}
        <div className="home-content">

          <p className="home-small-text">
            HELLO, I'M
          </p>

          <h1>
            Fathima <span>Haanim</span>
          </h1>

          <h2>
             Computer Science Undergraduate
          </h2>

          <p className="home-description">
            I turn data into meaningful insights and build clean,
            practical digital solutions that solve real-world problems.
          </p>

          <div className="home-buttons">
            <a href="#projects" className="home-btn primary-btn">
              View My Projects
              <ArrowRight size={18} />
            </a>

            <a href="/Fathima-Haanim-CV.pdf" className="home-btn secondary-btn">
              Download CV
              <Download size={18} />
            </a>
          </div>

        </div>


        {/* RIGHT PHOTO */}
        <div className="home-image">

          <div className="photo-circle">
            <img
              src="/profile.jpg"
              alt="Fathima Haanim"
            />
          </div>

          <div className="circle-decoration"></div>

          <div className="experience-card">
            <strong>Tech Enthusiast</strong>
            <span>Code • Data • Technology</span>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Home;