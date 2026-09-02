import { useEffect, useState } from "react";
import {
  ExternalLink,
  X,
  ArrowUpRight,
} from "lucide-react";

import { supabase } from "../supabase";

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  // ==============================
  // DEFAULT PROJECTS
  // ==============================
  const defaultProjects = [
    {
      id: "tour-main",
      title: "Tour-Main",
      category: "Web Development",
      description:
        "A tourism-focused web application designed to provide users with useful information and guidance for exploring tourist destinations.",
      image: "/projects/tour-main.png",
      technologies: ["HTML", "CSS", "JavaScript"],
      github:
        "https://github.com/haanimarf/Tour-Main",
      demo: "#",
      details:
        "Tour-Main is a tourism web project focused on presenting tourist destinations in an attractive and user-friendly way. The project helped strengthen my skills in responsive web design, frontend development and user interface creation.",
    },

    {
      id: "weather-app",
      title: "Weather App",
      category: "Web Application",
      description:
        "A responsive weather application that provides real-time weather information for cities using a weather API.",
      image: "/projects/weather-app.png",
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "Weather API",
      ],
      github:
        "https://github.com/haanimarf/weather-app",
      demo: "#",
      details:
        "The Weather App allows users to search for a city and view current weather information including temperature, weather conditions, humidity and wind speed. It uses JavaScript and an external weather API to retrieve real-time data.",
    },

    {
      id: "image-slider",
      title: "Image Slider",
      category: "Frontend Development",
      description:
        "A simple and responsive image carousel with smooth transitions and navigation controls.",
      image: "/projects/image-slider.png",
      technologies: ["HTML", "CSS", "JavaScript"],
      github:
        "https://github.com/haanimarf/ImageSlider",
      demo: "#",
      details:
        "Image Slider is a lightweight frontend project that allows users to navigate through multiple images using previous and next controls. CSS animations and JavaScript are used to create a smooth and responsive user experience.",
    },

    {
      id: "resume-app",
      title: "Resume App",
      category: "Portfolio",
      description:
        "A responsive personal resume application designed to present professional information, skills, projects and achievements.",
      image: "/projects/resume-app.png",
      technologies: ["HTML", "CSS", "JavaScript"],
      github:
        "https://github.com/haanimarf/Resume-App",
      demo: "#",
      details:
        "Resume App is a personal web application created to present my professional profile, education, technical skills, projects and achievements in a clean and responsive layout.",
    },
  ];

  // ==============================
  // PROJECT STATE
  // ==============================
  const [projects, setProjects] = useState(defaultProjects);

  // ==============================
  // LOAD PROJECTS FROM SUPABASE
  // ==============================
  const loadProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        "Unable to load projects from Supabase:",
        error
      );

      // If Supabase fails, show default projects
      setProjects(defaultProjects);
      return;
    }

    // ==============================
    // FORMAT SUPABASE PROJECTS
    // ==============================
    const formattedProjects = data.map((project) => ({
      id: project.id,

      title:
        project.title ||
        "Untitled Project",

      category:
        project.category ||
        "Web Development",

      description:
        project.description ||
        "A portfolio project developed to demonstrate practical technical skills.",

      details:
        project.description ||
        "A portfolio project developed to demonstrate practical technical skills.",

      technologies:
        typeof project.technologies === "string"
          ? project.technologies
              .split(",")
              .map((technology) => technology.trim())
              .filter(Boolean)
          : Array.isArray(project.technologies)
          ? project.technologies
          : [],

      github:
        project.github_link ||
        "#",

      demo:
        project.live_link ||
        "#",

      image:
        project.image ||
        "/projects/project-placeholder.png",
    }));

    // ==============================
    // DEFAULT + ADMIN PROJECTS
    // ==============================
    setProjects([
      ...defaultProjects,
      ...formattedProjects,
    ]);
  };

  // ==============================
  // INITIAL LOAD
  // ==============================
  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <section
      className="projects-section"
      id="projects"
    >
      <div className="projects-container">

        {/* ==============================
            SECTION HEADING
        ============================== */}
        <div className="section-heading projects-heading">
          <p>MY PROJECTS</p>

          <h2>
            Projects I've <span>built.</span>
          </h2>
        </div>

        {/* ==============================
            PROJECT GRID
        ============================== */}
        <div className="projects-grid">

          {projects.map((project, index) => (
            <article
              className="project-card"
              key={
                project.id ||
                `${project.title}-${index}`
              }
              onClick={() =>
                setSelectedProject(project)
              }
            >

              {/* PROJECT IMAGE */}
              <div className="project-image-wrapper">

                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  onError={(e) => {
                    e.currentTarget.style.display =
                      "none";
                  }}
                />

                <div className="project-overlay">
                  <span>
                    View Project
                    <ArrowUpRight size={18} />
                  </span>
                </div>

              </div>

              {/* PROJECT CONTENT */}
              <div className="project-content">

                <div className="project-top">

                  <span className="project-category">
                    {project.category}
                  </span>

                  <span className="project-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>

                <h3>
                  {project.title}
                </h3>

                <p className="project-description">
                  {project.description}
                </p>

                {/* TECHNOLOGIES */}
                {project.technologies?.length > 0 && (
                  <div className="project-technologies">

                    {project.technologies.map(
                      (technology, techIndex) => (
                        <span key={techIndex}>
                          {technology}
                        </span>
                      )
                    )}

                  </div>
                )}

                {/* BUTTONS */}
                <div
                  className="project-actions"
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                >

                  {project.github &&
                    project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-button github-button"
                      >
                        GitHub ↗
                      </a>
                    )}

                  {project.demo &&
                    project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-button demo-button"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}

                </div>

              </div>
            </article>
          ))}

        </div>
      </div>

      {/* ==============================
          PROJECT MODAL
      ============================== */}
      {selectedProject && (
        <div
          className="project-modal-overlay"
          onClick={() =>
            setSelectedProject(null)
          }
        >

          <div
            className="project-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* CLOSE BUTTON */}
            <button
              className="project-modal-close"
              onClick={() =>
                setSelectedProject(null)
              }
              aria-label="Close project details"
            >
              <X size={20} />
            </button>

            {/* MODAL IMAGE */}
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="modal-project-image"
              onError={(e) => {
                e.currentTarget.style.display =
                  "none";
              }}
            />

            {/* MODAL CONTENT */}
            <div className="project-modal-content">

              <span className="project-category">
                {selectedProject.category}
              </span>

              <h2>
                {selectedProject.title}
              </h2>

              <p className="modal-project-description">
                {selectedProject.details}
              </p>

              {/* TECHNOLOGIES */}
              {selectedProject.technologies?.length >
                0 && (
                <>
                  <h4>
                    Technologies Used
                  </h4>

                  <div className="modal-technologies">

                    {selectedProject.technologies.map(
                      (technology, index) => (
                        <span key={index}>
                          {technology}
                        </span>
                      )
                    )}

                  </div>
                </>
              )}

              {/* MODAL BUTTONS */}
              <div className="modal-project-actions">

                {selectedProject.github &&
                  selectedProject.github !== "#" && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-button github-button"
                    >
                      View GitHub
                    </a>
                  )}

                {selectedProject.demo &&
                  selectedProject.demo !== "#" && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-button demo-button"
                    >
                      <ExternalLink size={17} />
                      Live Demo
                    </a>
                  )}

              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;