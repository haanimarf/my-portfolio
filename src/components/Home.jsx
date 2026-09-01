import { useEffect, useState } from "react";
import { ArrowRight, Download } from "lucide-react";

function Home() {
  const [profile, setProfile] = useState({
    name: "Fathima Haanim",
    role: "Computer Science Undergraduate",
    bio: "I turn data into meaningful insights and build clean, practical digital solutions that solve real-world problems.",
  });

  const [profileImage, setProfileImage] = useState("/profile.jpg");

  useEffect(() => {
    // Get saved profile information
    const savedProfile = localStorage.getItem("portfolioProfile");

    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);

        setProfile({
          name: parsedProfile.name || "Fathima Haanim",
          role:
            parsedProfile.role ||
            "Computer Science Undergraduate",
          bio:
            parsedProfile.bio ||
            "I turn data into meaningful insights and build clean, practical digital solutions that solve real-world problems.",
        });
      } catch (error) {
        console.error("Unable to load profile data:", error);
      }
    }

    // Get saved profile image
    const savedImage = localStorage.getItem(
      "portfolioProfileImage"
    );

    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  // Split name for styling
  const nameParts = profile.name.trim().split(" ");

  const firstName = nameParts[0] || "Fathima";
  const remainingName = nameParts.slice(1).join(" ");

  return (
    <section className="home-section" id="home">
      <div className="home-container">

        {/* ================================
            LEFT CONTENT
        ================================= */}

        <div className="home-content">

          <p className="home-small-text">
            HELLO, I'M
          </p>

          <h1>
            {firstName}{" "}
            <span>
              {remainingName}
            </span>
          </h1>

          <h2>
            {profile.role}
          </h2>

          <p className="home-description">
            {profile.bio}
          </p>

          <div className="home-buttons">

            <a
              href="#projects"
              className="home-btn primary-btn"
            >
              View My Projects
              <ArrowRight size={18} />
            </a>

            <a
              href="/Fathima-Haanim-CV.pdf"
              className="home-btn secondary-btn"
            >
              Download CV
            </a>

          </div>

        </div>


        {/* ================================
            RIGHT PHOTO
        ================================= */}

        <div className="home-image">

          <div className="photo-circle">

            <img
              src={profileImage}
              alt={profile.name}
            />

          </div>

          <div className="circle-decoration"></div>

          <div className="experience-card">

            <strong>
              Tech Enthusiast
            </strong>

            <span>
              Code • Data • Technology
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Home;