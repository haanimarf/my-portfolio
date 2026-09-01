import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Code2,
  X,
  Save,
} from "lucide-react";

function AdminSkills() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Programming & Development",
  });

  const categories = [
    "Programming & Development",
    "Data & Analytics",
    "Cloud & DevOps",
    "Tools & Technologies",
  ];

  // Load saved skills
  useEffect(() => {
    const savedSkills =
      localStorage.getItem("portfolioSkills");

    if (savedSkills) {
      try {
        setSkills(JSON.parse(savedSkills));
      } catch (error) {
        console.error(
          "Unable to load skills:",
          error
        );
      }
    }
  }, []);

  // Save skills
  const saveSkills = (updatedSkills) => {
    setSkills(updatedSkills);

    localStorage.setItem(
      "portfolioSkills",
      JSON.stringify(updatedSkills)
    );
  };

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add skill
  const handleAdd = () => {
    setEditingId(null);

    setFormData({
      name: "",
      category: "Programming & Development",
    });

    setShowForm(true);
  };

  // Edit skill
  const handleEdit = (skill) => {
    setEditingId(skill.id);

    setFormData({
      name: skill.name || "",
      category:
        skill.category ||
        "Programming & Development",
    });

    setShowForm(true);
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter a skill name.");
      return;
    }

    if (editingId) {
      const updatedSkills = skills.map(
        (skill) =>
          skill.id === editingId
            ? {
                ...skill,
                name: formData.name.trim(),
                category: formData.category,
              }
            : skill
      );

      saveSkills(updatedSkills);

      alert("Skill updated successfully!");
    } else {
      const newSkill = {
        id: Date.now(),
        name: formData.name.trim(),
        category: formData.category,
      };

      saveSkills([
        ...skills,
        newSkill,
      ]);

      alert("Skill added successfully!");
    }

    setFormData({
      name: "",
      category: "Programming & Development",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // Delete
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmDelete) return;

    const updatedSkills = skills.filter(
      (skill) => skill.id !== id
    );

    saveSkills(updatedSkills);

    alert("Skill deleted successfully!");
  };

  return (
    <div className="admin-page">

      {/* HEADER */}
      <header className="admin-page-header">

        <div>
          <p className="admin-label">
            SKILLS MANAGEMENT
          </p>

          <h1>Skills</h1>

          <p>
            Add and manage your technical skills.
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
      <div className="admin-skills-toolbar">

        <div>
          <strong>
            {skills.length}
          </strong>

          <span>
            {" "}
            {skills.length === 1
              ? "Skill"
              : "Skills"}
          </span>
        </div>

        <button
          type="button"
          className="admin-add-btn"
          onClick={handleAdd}
        >
          <Plus size={18} />
          Add Skill
        </button>

      </div>

      {/* FORM */}
      {showForm && (
        <div className="admin-form-card">

          <div className="admin-form-card-header">

            <div>
              <h2>
                {editingId
                  ? "Edit Skill"
                  : "Add Skill"}
              </h2>

              <p>
                Enter your skill information below.
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

            {/* SKILL NAME */}
            <div className="admin-form-group">

              <label>
                Skill Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Example: Python"
                required
              />

            </div>

            {/* CATEGORY */}
            <div className="admin-form-group">

              <label>
                Skill Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}

              </select>

            </div>

            {/* SAVE */}
            <button
              type="submit"
              className="admin-save-btn"
            >
              <Save size={18} />

              {editingId
                ? "Update Skill"
                : "Save Skill"}
            </button>

          </form>

        </div>
      )}

      {/* EMPTY STATE */}
      {skills.length === 0 ? (

        <div className="admin-empty-state">

          <div className="empty-icon">
            <Code2 size={35} />
          </div>

          <h2>
            No Skills Yet
          </h2>

          <p>
            Add your first skill to display it
            on your portfolio.
          </p>

          <button
            type="button"
            className="admin-add-btn"
            onClick={handleAdd}
          >
            <Plus size={18} />
            Add Your First Skill
          </button>

        </div>

      ) : (

        /* SKILLS GRID */
        <div className="admin-skills-grid">

          {skills.map((skill) => (

            <div
              className="admin-skill-card"
              key={skill.id}
            >

              <div className="admin-skill-icon">
                <Code2 size={21} />
              </div>

              <div className="admin-skill-info">

                <h3>
                  {skill.name}
                </h3>

                <span>
                  {skill.category}
                </span>

              </div>

              <div className="admin-skill-actions">

                <button
                  type="button"
                  className="certificate-edit-btn"
                  onClick={() =>
                    handleEdit(skill)
                  }
                >
                  <Pencil size={15} />
                  Edit
                </button>

                <button
                  type="button"
                  className="certificate-delete-btn"
                  onClick={() =>
                    handleDelete(skill.id)
                  }
                >
                  <Trash2 size={15} />
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

export default AdminSkills;

