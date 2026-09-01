import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, User } from "lucide-react";

function AdminProfile() {
  const navigate = useNavigate();

  // Profile image
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("portfolioProfileImage") || ""
  );

  // Profile details
  const [profile, setProfile] = useState({
    name: "Fathima Haanim",
    role: "Data Analyst | Web Developer",
    bio: "Computer Science undergraduate passionate about Data Analytics, Web Development and Cloud Technologies.",
    email: "admin@gmail.com",
    location: "Sri Lanka",
  });

  // Handle profile input changes
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // Handle profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Check image type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    // Check image size - maximum 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);

      localStorage.setItem(
        "portfolioProfileImage",
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };

  // Save profile
  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "portfolioProfile",
      JSON.stringify(profile)
    );

    alert("Profile updated successfully!");
  };

  return (
    <div className="admin-page">

      {/* ================================
          HEADER
      ================================= */}

      <header className="admin-page-header">

        <div>
          <p className="admin-label">
            PROFILE MANAGEMENT
          </p>

          <h1>Edit Profile</h1>

          <p>
            Update your portfolio profile information.
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


      {/* ================================
          PROFILE CONTENT
      ================================= */}

      <div className="admin-profile-container">

        {/* ================================
            PROFILE PREVIEW
        ================================= */}

        <div className="admin-profile-preview">

          <div className="profile-avatar">

            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
              />
            ) : (
              <User size={45} />
            )}

          </div>

          <h2>
            {profile.name || "Your Name"}
          </h2>

          <p>
            {profile.role || "Your Role"}
          </p>

          <span>
            {profile.location || "Your Location"}
          </span>

        </div>


        {/* ================================
            PROFILE FORM
        ================================= */}

        <form
          className="admin-profile-form"
          onSubmit={handleSave}
        >

          {/* Full Name */}

          <div className="admin-form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

          </div>


          {/* Professional Title */}

          <div className="admin-form-group">

            <label>
              Professional Title
            </label>

            <input
              type="text"
              name="role"
              value={profile.role}
              onChange={handleChange}
              placeholder="Example: Data Analyst | Web Developer"
              required
            />

          </div>


          {/* Email */}

          <div className="admin-form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

          </div>


          {/* Location */}

          <div className="admin-form-group">

            <label>
              Location
            </label>

            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              placeholder="Example: Sri Lanka"
              required
            />

          </div>


          {/* Bio */}

          <div className="admin-form-group">

            <label>
              Bio
            </label>

            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              placeholder="Write your professional bio..."
              rows="6"
              required
            />

          </div>


          {/* Profile Image */}

          <div className="admin-form-group">

            <label>
              Profile Photo
            </label>

            <label className="profile-upload-btn">

              Change Profile Photo

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />

            </label>

            <small className="profile-image-help">
              JPG, PNG or WebP. Maximum size: 2MB.
            </small>

          </div>


          {/* Save Button */}

          <button
            type="submit"
            className="admin-save-btn"
          >
            <Save size={18} />
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminProfile;