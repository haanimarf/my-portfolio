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
import { supabase } from "../supabase";

function AdminProjects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    image: "",
    liveLink: "",
    githubLink: "",
  });

  // Load projects from Supabase
  const loadProjects = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Unable to load projects:", error);
      alert("Unable to load projects.");
    } else {
      const formattedProjects = data.map((project) => ({
        id: project.id,
        title: project.title || "",
        description: project.description || "",
        technologies: project.technologies || "",
        image: project.image || "",
        liveLink: project.live_link || "",
        githubLink: project.github_link || "",
      }));

      setProjects(formattedProjects);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert("Please enter project title and description.");
      return;
    }

    const projectData = {
      title: formData.title,
      description: formData.description,
      technologies: formData.technologies,
      image: formData.image,
      live_link: formData.liveLink,
      github_link: formData.githubLink,
    };

    // UPDATE
    if (editingId) {
      const { error } = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", editingId);

      if (error) {
        console.error("Update error:", error);
        alert("Project update failed.");
        return;
      }

      alert("Project updated successfully!");
    }

    // INSERT
    else {
      const { error } = await supabase
        .from("projects")
        .insert([projectData]);

      if (error) {
        console.error("Insert error:", error);
        alert("Project could not be added.");
        return;
      }

      alert("Project added successfully!");
    }

    await loadProjects();

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
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      alert("Project could not be deleted.");
      return;
    }

    await loadProjects();

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
          onClick={() => navigate("/admin/dashboard")}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

      </header>

      {/* TOOLBAR */}
      <div className="admin-project-toolbar">

        <div>
          <strong>{projects.length}</strong>

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
              <label>Project Title</label>

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
              <label>Project Description</label>

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
              <label>Technologies</label>

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
              <label>Project Image</label>

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
              <label>Live Project Link</label>

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
              <label>GitHub Link</label>

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

      {/* LOADING */}
      {loading ? (

        <div className="admin-empty-state">
          <h2>Loading Projects...</h2>
        </div>

      ) : projects.length === 0 ? (

        /* EMPTY STATE */
        <div className="admin-empty-state">

          <div className="empty-icon">
            <FolderKanban size={35} />
          </div>

          <h2>No Projects Yet</h2>

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

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                {project.technologies && (
                  <div className="admin-project-tech">

                    {(Array.isArray(project.technologies)
                      ? project.technologies
                      : project.technologies.split(",")
                    )
                      .map((tech) => tech.trim())
                      .filter(Boolean)
                      .map((tech, index) => (
                        <span key={index}>
                          {tech}
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
                  onClick={() => handleEdit(project)}
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  type="button"
                  className="certificate-delete-btn"
                  onClick={() => handleDelete(project.id)}
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