import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminContact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  });

  useEffect(() => {
    const savedContact =
      localStorage.getItem("portfolioContact");

    if (savedContact) {
      try {
        setFormData(JSON.parse(savedContact));
      } catch (error) {
        console.error(
          "Unable to load contact information:",
          error
        );
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "portfolioContact",
      JSON.stringify(formData)
    );

    alert("Contact information saved successfully!");
  };

  return (
    <div className="admin-page">

      {/* Header */}
      <header className="admin-page-header">

        <div>
          <p className="admin-label">
            CONTACT MANAGEMENT
          </p>

          <h1>Contact Information</h1>

          <p>
            Manage the contact details displayed
            on your portfolio website.
          </p>
        </div>

        <button
          type="button"
          className="admin-back-btn"
          onClick={() =>
            navigate("/admin/dashboard")
          }
        >
          ← Back to Dashboard
        </button>

      </header>

      {/* Contact Preview Cards */}
      <section className="contact-admin-grid">

        {/* Email */}
        <div className="contact-admin-card">

          <div className="contact-admin-icon">
            ✉
          </div>

          <div>
            <span>Email</span>

            <strong>
              {formData.email || "Not added yet"}
            </strong>
          </div>

        </div>

        {/* Phone */}
        <div className="contact-admin-card">

          <div className="contact-admin-icon">
            ☎
          </div>

          <div>
            <span>Phone</span>

            <strong>
              {formData.phone || "Not added yet"}
            </strong>
          </div>

        </div>

        {/* Location */}
        <div className="contact-admin-card">

          <div className="contact-admin-icon">
            📍
          </div>

          <div>
            <span>Location</span>

            <strong>
              {formData.location || "Not added yet"}
            </strong>
          </div>

        </div>

        {/* LinkedIn */}
        <div className="contact-admin-card">

          <div className="contact-admin-icon">
            in
          </div>

          <div>
            <span>LinkedIn</span>

            <strong>
              {formData.linkedin || "Not added yet"}
            </strong>
          </div>

        </div>

        {/* GitHub */}
        <div className="contact-admin-card">

          <div className="contact-admin-icon">
            GH
          </div>

          <div>
            <span>GitHub</span>

            <strong>
              {formData.github || "Not added yet"}
            </strong>
          </div>

        </div>

      </section>

      {/* Edit Form */}
      <div className="admin-form-card admin-contact-form">

        <div className="admin-form-card-header">

          <div>
            <p className="admin-label">
              EDIT DETAILS
            </p>

            <h2>
              Update Contact Information
            </h2>

            <p>
              Change your contact details and
              social media links below.
            </p>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="admin-form-group">

            <label>
              ✉ Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
            />

          </div>

          {/* Phone */}
          <div className="admin-form-group">

            <label>
              ☎ Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+94 77 123 4567"
            />

          </div>

          {/* Location */}
          <div className="admin-form-group">

            <label>
              📍 Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Sri Lanka"
            />

          </div>

          {/* LinkedIn */}
          <div className="admin-form-group">

            <label>
              in LinkedIn URL
            </label>

            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://www.linkedin.com/in/username"
            />

          </div>

          {/* GitHub */}
          <div className="admin-form-group">

            <label>
              GH GitHub URL
            </label>

            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/username"
            />

          </div>

          {/* Save */}
          <button
            type="submit"
            className="admin-save-btn"
          >
            ✓ Save Contact Information
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminContact;
