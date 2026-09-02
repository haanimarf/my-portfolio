
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function About() {
  const [aboutBio, setAboutBio] = useState(
    "I am a Computer Science Undergraduate with a strong interest in technology, data, and software development."
  );

  useEffect(() => {
    const loadProfile = async () => {
      const { data, error } = await supabase
        .from("profile")
        .select("bio")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Profile loading error:", error);
        return;
      }

      if (data && data.bio) {
        setAboutBio(data.bio);
      }
    };

    loadProfile();
  }, []);

  return (
    <section className="about-section" id="about">
      <div className="about-container">

        <div className="section-heading">
          <p>ABOUT ME</p>

          <h2>
            Turning curiosity into{" "}
            <span>practical skills</span>
          </h2>
        </div>

        <div className="about-content">

          <div className="about-text">

            <p>
              {aboutBio}
            </p>

          </div>

          <div className="about-cards">

            <div className="about-card">
              <span>01</span>

              <h3>Learn</h3>

              <p>
                Continuously exploring new technologies and improving my
                technical knowledge.
              </p>
            </div>

            <div className="about-card">
              <span>02</span>

              <h3>Build</h3>

              <p>
                Turning ideas into practical projects through coding and
                problem solving.
              </p>
            </div>

            <div className="about-card">
              <span>03</span>

              <h3>Grow</h3>

              <p>
                Developing my skills through projects, courses, and
                hands-on experience.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;

