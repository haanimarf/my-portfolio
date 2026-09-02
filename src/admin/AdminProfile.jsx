import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, User } from "lucide-react";
import { supabase } from "../supabase";

function AdminProfile() {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [profile, setProfile] = useState({
    name: "Fathima Haanim",
    role: "Data Analyst | Web Developer",
    bio: "Computer Science undergraduate passionate about Data Analytics, Web Development and Cloud Technologies.",
    email: "admin@gmail.com",
    location: "Sri Lanka",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load profile from Supabase
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Load profile error:", error);
      setLoading(false);
      return;
    }

    if (data) {
      setProfile({
        name: data.name || "",
        role: data.role || "",
        bio: data.bio || "",
        email: data.email || "",
        location: data.location || "",
      });

      setProfileImage(data.profile_image || "");
    }

    setLoading(false);
  };

  // Handle profile input changes
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // Handle profile image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should be less than 2MB.");
      return;
    }

    setSelectedFile(file);

    // Preview image
    const previewUrl = URL.createObjectURL(file);
    setProfileImage(previewUrl);
  };

  // Upload profile image
  const uploadProfileImage = async () => {
    if (!selectedFile) {
      return profileImage;
    }

    const fileExt = selectedFile.name.split(".").pop();
    const fileName = `profile-${Date.now()}.${fileExt}`;

    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(filePath, selectedFile, {
        upsert: true,
        contentType: selectedFile.type,
      });

    if (uploadError) {
      console.error(
        "Profile image upload error:",
        uploadError
      );

      alert("Unable to upload profile image.");
      return null;
    }

    const { data } = supabase.storage
      .from("profile-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  // Save profile
  const handleSave = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      let imageUrl = profileImage;

      // Upload new image if selected
      if (selectedFile) {
        imageUrl = await uploadProfileImage();

        if (!imageUrl) {
          setSaving(false);
          return;
        }
      }

      // Check if profile already exists
      const { data: existingProfile, error: fetchError } =
        await supabase
          .from("profile")
          .select("id")
          .limit(1)
          .maybeSingle();

      if (fetchError) {
        console.error(
          "Check profile error:",
          fetchError
        );

        alert("Unable to save profile.");
        setSaving(false);
        return;
      }

      const profileData = {
        name: profile.name.trim(),
        role: profile.role.trim(),
        bio: profile.bio.trim(),
        email: profile.email.trim(),
        location: profile.location.trim(),
        profile_image: imageUrl || "",
        updated_at: new Date().toISOString(),
      };

      let error;

      // UPDATE existing profile
      if (existingProfile) {
        const result = await supabase
          .from("profile")
          .update(profileData)
          .eq("id", existingProfile.id);

        error = result.error;
      }

      // INSERT first profile
      else {
        const result = await supabase
          .from("profile")
          .insert([profileData]);

        error = result.error;
      }

      if (error) {
        console.error(
          "Save profile error:",
          error
        );

        alert("Unable to save profile.");
        setSaving(false);
        return;
      }

      setSelectedFile(null);

      alert("Profile updated successfully!");

      await loadProfile();
    } catch (error) {
      console.error(
        "Profile save error:",
        error
      );

      alert("Something went wrong.");
    }

    setSaving(false);
  };

  return (
    <div className="admin-page">

      {/* HEADER */}
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
          onClick={() =>
            navigate("/admin/dashboard")
          }
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

      </header>

      {/* PROFILE CONTENT */}
      <div className="admin-profile-container">

        {/* PROFILE PREVIEW */}
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

        {/* PROFILE FORM */}
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
            disabled={saving || loading}
          >
            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminProfile;