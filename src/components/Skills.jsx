import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const defaultSkillGroups = [
  {
    category: "Programming & Development",
    icon: "💻",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Java",
      "C++",
    ],
  },
  {
    category: "Data & Analytics",
    icon: "📊",
    skills: [
      "Excel",
      "SQL",
      "Power BI",
      "Python",
      "Pandas",
      "Data Analysis",
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: "☁️",
    skills: [
      "AWS",
      "EC2",
      "S3",
      "RDS",
      "Docker",
      "Linux",
    ],
  },
  {
    category: "Tools & Technologies",
    icon: "🛠️",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Figma",
      "Postman",
      "MySQL",
    ],
  },
];

function Skills() {
  const [skillGroups, setSkillGroups] =
    useState(defaultSkillGroups);

  useEffect(() => {
    const loadSkills = async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("created_at", {
          ascending: true,
        });

      if (error) {
        console.error(
          "Unable to load skills from Supabase:",
          error
        );
        return;
      }

      const updatedGroups =
        defaultSkillGroups.map((group) => {
          const adminSkillsForCategory =
            (data || [])
              .filter(
                (skill) =>
                  skill.category === group.category
              )
              .map((skill) => skill.name);

          const combinedSkills = [
            ...group.skills,
            ...adminSkillsForCategory,
          ];

          // Remove duplicate skills
          const uniqueSkills = [
            ...new Set(combinedSkills),
          ];

          return {
            ...group,
            skills: uniqueSkills,
          };
        });

      setSkillGroups(updatedGroups);
    };

    loadSkills();
  }, []);

  return (
    <section
      className="skills-section"
      id="skills"
    >
      <div className="skills-container">

        <div className="section-heading">
          <p>MY SKILLS</p>

          <h2>
            Technologies I{" "}
            <span>work with.</span>
          </h2>
        </div>

        <div className="skills-grid">

          {skillGroups.map((group) => (
            <div
              className="skill-card"
              key={group.category}
            >
              <div className="skill-icon">
                {group.icon}
              </div>

              <h3>{group.category}</h3>

              <div className="skill-list">
                {group.skills.map((skill) => (
                  <span
                    key={`${group.category}-${skill}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Skills;