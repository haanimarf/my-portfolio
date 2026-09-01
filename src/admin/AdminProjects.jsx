import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  FolderKanban,
  ExternalLink,
  X,
  Save,
} from "lucide-react";

function AdminProjects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    image: "",
    liveLink: "",
    githubLink: "",
  });

  // Load saved projects
  useEffect(() => {
    const savedProjects =
      localStorage.getItem("portfolioProjects");

    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (error) {
        console.error(
          "Unable to load projects:",
          error
        );
      }
    }
  }, []);

  // Save projects
  const saveProjects = (updatedProjects) => {
  setProjects(updatedProjects);

  localStorage.setItem(
    "portfolioProjects",
    JSON.stringify(updatedProjects)
  );

  window.dispatchEvent(
    new Event("portfolioProjectsUpdated")
  );
};

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add project
  const handleAdd = () => {
    setEditingId(null);

    setFormData({
      title: "",
      description: "",
      technologies: "",
      image: "",
      liveLink: "",
      githubLink: "",
    });

    setShowForm(true);
  };

  // Edit project
 const handleEdit = (project) => {
  setEditingId(project.id);

  setFormData({
    title: project.title || "",
    description: project.description || "",
    technologies: Array.isArray(project.technologies)
      ? project.technologies.join(", ")
      : project.technologies || "",
    image: project.image || "",
    liveLink: project.liveLink || "",
    githubLink: project.githubLink || "",
  });

  setShowForm(true);
};

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert(
        "Please enter project title and description."
      );
      return;
    }

    if (editingId) {
      const updatedProjects = projects.map(
        (project) =>
          project.id === editingId
            ? {
                ...project,
                ...formData,
              }
            : project
      );

      saveProjects(updatedProjects);

      alert("Project updated successfully!");
    } else {
      const newProject = {
        id: Date.now(),
        ...formData,
      };

      saveProjects([
        ...projects,
        newProject,
      ]);

      alert("Project added successfully!");
    }

    setFormData({
      title: "",
      description: "",
      technologies: "",
      image: "",
      liveLink: "",
      githubLink: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // Delete project
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    const updatedProjects = projects.filter(
      (project) => project.id !== id
    );

    saveProjects(updatedProjects);

    alert("Project deleted successfully!");
  };

  return (
    <div className="admin-page">

      {/* HEADER */}
      <header className="admin-page-header">

        <div>
          <p className="admin-label">
            PROJECT MANAGEMENT
          </p>

          <h1>Projects</h1>

          <p>
            Add and manage your portfolio projects.
          </p>
        </div>

        <button
          type="button"
          className="admin-back-btn"
          onClick={() =>
            navigate("/admin/dashboard")
          }
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

      </header>

      {/* TOOLBAR */}
      <div className="admin-project-toolbar">

        <div>
          <strong>
            {projects.length}
          </strong>

          <span>
            {" "}
            {projects.length === 1
              ? "Project"
              : "Projects"}
          </span>
        </div>

        <button
          type="button"
          className="admin-add-btn"
          onClick={handleAdd}
        >
          <Plus size={18} />
          Add Project
        </button>

      </div>

      {/* FORM */}
      {showForm && (
        <div className="admin-form-card">

          <div className="admin-form-card-header">

            <div>
              <h2>
                {editingId
                  ? "Edit Project"
                  : "Add Project"}
              </h2>

              <p>
                Enter your project details below.
              </p>
            </div>

            <button
              type="button"
              className="admin-close-btn"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
            >
              <X size={20} />
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            {/* TITLE */}
            <div className="admin-form-group">
              <label>
                Project Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Example: Weather App"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div className="admin-form-group">
              <label>
                Project Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project..."
                rows="5"
                required
              />
            </div>

            {/* TECHNOLOGIES */}
            <div className="admin-form-group">
              <label>
                Technologies
              </label>

              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="Example: React, JavaScript, CSS"
              />

              <small className="profile-image-help">
                Separate technologies with commas.
              </small>
            </div>

            {/* IMAGE */}
            <div className="admin-form-group">
              <label>
                Project Image
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Example: /projects/weather-app.png"
              />

              <small className="profile-image-help">
                Enter the image path from the public folder.
              </small>
            </div>

            {/* LIVE LINK */}
            <div className="admin-form-group">
              <label>
                Live Project Link
              </label>

              <input
                type="url"
                name="liveLink"
                value={formData.liveLink}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            {/* GITHUB */}
            <div className="admin-form-group">
              <label>
                GitHub Link
              </label>

              <input
                type="url"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
            </div>

            {/* SAVE */}
            <button
              type="submit"
              className="admin-save-btn"
            >
              <Save size={18} />

              {editingId
                ? "Update Project"
                : "Save Project"}
            </button>

          </form>

        </div>
      )}

      {/* EMPTY STATE */}
      {projects.length === 0 ? (

        <div className="admin-empty-state">

          <div className="empty-icon">
            <FolderKanban size={35} />
          </div>

          <h2>
            No Projects Yet
          </h2>

          <p>
            Add your first project to display it
            on your portfolio.
          </p>

          <button
            type="button"
            className="admin-add-btn"
            onClick={handleAdd}
          >
            <Plus size={18} />
            Add Your First Project
          </button>

        </div>

      ) : (

        /* PROJECT GRID */
        <div className="admin-project-grid">

          {projects.map((project) => (

            <div
              className="admin-project-card"
              key={project.id}
            >

              {/* IMAGE */}
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="admin-project-image"
                />
              ) : (
                <div className="admin-project-image-placeholder">
                  <FolderKanban size={35} />
                </div>
              )}

              {/* CONTENT */}
              <div className="admin-project-content">

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.description}
                </p>

                {project.technologies && (
                  <div className="admin-project-tech">

                    {project.technologies
                      .split(",")
                      .map((tech, index) => (
                        <span key={index}>
                          {tech.trim()}
                        </span>
                      ))}

                  </div>
                )}

              </div>

              {/* ACTIONS */}
              <div className="admin-project-actions">

                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certificate-view-btn"
                  >
                    <ExternalLink size={16} />
                    Live
                  </a>
                )}

                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certificate-view-btn"
                  >
                    GitHub
                  </a>
                )}

                <button
                  type="button"
                  className="certificate-edit-btn"
                  onClick={() =>
                    handleEdit(project)
                  }
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  type="button"
                  className="certificate-delete-btn"
                  onClick={() =>
                    handleDelete(project.id)
                  }
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default AdminProjects;

