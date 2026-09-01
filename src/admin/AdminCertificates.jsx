import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Award,
  ExternalLink,
  X,
  Save,
} from "lucide-react";

function AdminCertificates() {
  const navigate = useNavigate();

  const [certificates, setCertificates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    link: "",
  });

  // Load certificates from localStorage
  useEffect(() => {
    const savedCertificates =
      localStorage.getItem("portfolioCertificates");

    if (savedCertificates) {
      try {
        setCertificates(JSON.parse(savedCertificates));
      } catch (error) {
        console.error(
          "Unable to load certificates:",
          error
        );
      }
    }
  }, []);

  // Save certificates to localStorage
  const saveCertificates = (updatedCertificates) => {
    setCertificates(updatedCertificates);

    localStorage.setItem(
      "portfolioCertificates",
      JSON.stringify(updatedCertificates)
    );
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Open add form
  const handleAdd = () => {
    setEditingId(null);

    setFormData({
      title: "",
      issuer: "",
      date: "",
      link: "",
    });

    setShowForm(true);
  };

  // Open edit form
  const handleEdit = (certificate) => {
    setEditingId(certificate.id);

    setFormData({
      title: certificate.title,
      issuer: certificate.issuer,
      date: certificate.date,
      link: certificate.link,
    });

    setShowForm(true);
  };

  // Save certificate
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.issuer) {
      alert("Please enter certificate title and issuer.");
      return;
    }

    if (editingId) {
      const updatedCertificates = certificates.map(
        (certificate) =>
          certificate.id === editingId
            ? {
                ...certificate,
                ...formData,
              }
            : certificate
      );

      saveCertificates(updatedCertificates);

      alert("Certificate updated successfully!");
    } else {
      const newCertificate = {
        id: Date.now(),
        ...formData,
      };

      saveCertificates([
        ...certificates,
        newCertificate,
      ]);

      alert("Certificate added successfully!");
    }

    setFormData({
      title: "",
      issuer: "",
      date: "",
      link: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // Delete certificate
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this certificate?"
    );

    if (!confirmDelete) return;

    const updatedCertificates = certificates.filter(
      (certificate) => certificate.id !== id
    );

    saveCertificates(updatedCertificates);

    alert("Certificate deleted successfully!");
  };

  return (
    <div className="admin-page">

      {/* ================================
          HEADER
      ================================= */}

      <header className="admin-page-header">

        <div>
          <p className="admin-label">
            CERTIFICATE MANAGEMENT
          </p>

          <h1>Certificates</h1>

          <p>
            Add and manage your professional certificates.
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


      {/* ================================
          ADD BUTTON
      ================================= */}

      <div className="admin-certificate-toolbar">

        <div>
          <strong>
            {certificates.length}
          </strong>

          <span>
            {" "}
            {certificates.length === 1
              ? "Certificate"
              : "Certificates"}
          </span>
        </div>

        <button
          type="button"
          className="admin-add-btn"
          onClick={handleAdd}
        >
          <Plus size={18} />
          Add Certificate
        </button>

      </div>


      {/* ================================
          FORM
      ================================= */}

      {showForm && (
        <div className="admin-form-card">

          <div className="admin-form-card-header">

            <div>
              <h2>
                {editingId
                  ? "Edit Certificate"
                  : "Add Certificate"}
              </h2>

              <p>
                Enter your certificate details below.
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

            {/* Title */}

            <div className="admin-form-group">

              <label>
                Certificate Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Example: Meta Data Analyst Professional Certificate"
                required
              />

            </div>


            {/* Issuer */}

            <div className="admin-form-group">

              <label>
                Issuing Organization
              </label>

              <input
                type="text"
                name="issuer"
                value={formData.issuer}
                onChange={handleChange}
                placeholder="Example: Meta"
                required
              />

            </div>


            {/* Date */}

            <div className="admin-form-group">

              <label>
                Completion Date
              </label>

              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Example: August 2026"
              />

            </div>


            {/* Link */}

            <div className="admin-form-group">

              <label>
                Certificate Link
              </label>

              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://..."
              />

            </div>


            {/* Save */}

            <button
              type="submit"
              className="admin-save-btn"
            >
              <Save size={18} />

              {editingId
                ? "Update Certificate"
                : "Save Certificate"}
            </button>

          </form>

        </div>
      )}


      {/* ================================
          CERTIFICATE LIST
      ================================= */}

      {certificates.length === 0 ? (

        <div className="admin-empty-state">

          <div className="empty-icon">
            <Award size={35} />
          </div>

          <h2>
            No Certificates Yet
          </h2>

          <p>
            Add your first certificate to display it
            on your portfolio.
          </p>

          <button
            type="button"
            className="admin-add-btn"
            onClick={handleAdd}
          >
            <Plus size={18} />
            Add Your First Certificate
          </button>

        </div>

      ) : (

        <div className="admin-certificate-grid">

          {certificates.map((certificate) => (

            <div
              className="admin-certificate-card"
              key={certificate.id}
            >

              <div className="certificate-card-icon">
                <Award size={25} />
              </div>

              <div className="certificate-card-content">

                <h3>
                  {certificate.title}
                </h3>

                <p>
                  {certificate.issuer}
                </p>

                {certificate.date && (
                  <span>
                    {certificate.date}
                  </span>
                )}

              </div>


              <div className="certificate-card-actions">

                {certificate.link && (
                  <a
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="certificate-view-btn"
                  >
                    <ExternalLink size={16} />
                    View
                  </a>
                )}

                <button
                  type="button"
                  className="certificate-edit-btn"
                  onClick={() =>
                    handleEdit(certificate)
                  }
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  type="button"
                  className="certificate-delete-btn"
                  onClick={() =>
                    handleDelete(certificate.id)
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

export default AdminCertificates;