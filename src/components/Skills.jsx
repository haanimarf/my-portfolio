function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        <div className="section-heading">
          <p>MY SKILLS</p>
          <h2>
            Technologies I <span>work with.</span>
          </h2>
        </div>

        <div className="skills-grid">
          <div className="skill-card">
            <div className="skill-icon">💻</div>
            <h3>Programming & Development</h3>

            <div className="skill-list">
              <span>HTML</span>
              <span>CSS</span>
              <span>JavaScript</span>
              <span>React</span>
              <span>Node.js</span>
              <span>Java</span>
              <span>C++</span>
            </div>
          </div>

          <div className="skill-card">
            <div className="skill-icon">📊</div>
            <h3>Data & Analytics</h3>

            <div className="skill-list">
              <span>Excel</span>
              <span>SQL</span>
              <span>Power BI</span>
              <span>Python</span>
              <span>Pandas</span>
              <span>Data Analysis</span>
            </div>
          </div>

          <div className="skill-card">
            <div className="skill-icon">☁️</div>
            <h3>Cloud & DevOps</h3>

            <div className="skill-list">
              <span>AWS</span>
              <span>EC2</span>
              <span>S3</span>
              <span>RDS</span>
              <span>Docker</span>
              <span>Linux</span>
            </div>
          </div>

          <div className="skill-card">
            <div className="skill-icon">🛠️</div>
            <h3>Tools & Technologies</h3>

            <div className="skill-list">
              <span>Git</span>
              <span>GitHub</span>
              <span>VS Code</span>
              <span>Figma</span>
              <span>Postman</span>
              <span>MySQL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;