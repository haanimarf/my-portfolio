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
import { supabase } from "../supabase";

function AdminSkills() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  // Load skills from Supabase
  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Load skills error:", error);
      alert("Unable to load skills.");
      setSkills([]);
    } else {
      setSkills(data || []);
    }

    setLoading(false);
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter a skill name.");
      return;
    }

    setSaving(true);

    const skillData = {
      name: formData.name.trim(),
      category: formData.category,
    };

    // UPDATE
    if (editingId) {
      const { error } = await supabase
        .from("skills")
        .update(skillData)
        .eq("id", editingId);

      if (error) {
        console.error("Update skill error:", error);
        alert("Unable to update skill.");
        setSaving(false);
        return;
      }

      alert("Skill updated successfully!");
    }

    // INSERT
    else {
      const { error } = await supabase
        .from("skills")
        .insert([skillData]);

      if (error) {
        console.error("Add skill error:", error);
        alert("Unable to add skill.");
        setSaving(false);
        return;
      }

      alert("Skill added successfully!");
    }

    setFormData({
      name: "",
      category: "Programming & Development",
    });

    setEditingId(null);
    setShowForm(false);

    await loadSkills();

    setSaving(false);
  };

  // Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("skills")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete skill error:", error);
      alert("Unable to delete skill.");
      return;
    }

    alert("Skill deleted successfully!");

    await loadSkills();
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
              disabled={saving}
            >
              <Save size={18} />

              {saving
                ? "Saving..."
                : editingId
                ? "Update Skill"
                : "Save Skill"}
            </button>

          </form>

        </div>
      )}

      {/* LOADING */}
      {loading ? (

        <div className="admin-empty-state">
          <h2>Loading Skills...</h2>
          <p>
            Please wait while your skills are loading.
          </p>
        </div>

      ) : skills.length === 0 ? (

        /* EMPTY STATE */
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