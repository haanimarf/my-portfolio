import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Award,
  FolderKanban,
  Code2,
  Mail,
  LogOut,
  LayoutDashboard,
  ExternalLink,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    profile: 0,
    certificates: 0,
    projects: 0,
    skills: 0,
  });

  useEffect(() => {
    const profile =
      localStorage.getItem("portfolioProfile");

    const certificates =
      localStorage.getItem("portfolioCertificates");

    const projects =
      localStorage.getItem("portfolioProjects");

    const skills =
      localStorage.getItem("portfolioSkills");

    let certificateCount = 0;
    let projectCount = 0;
    let skillCount = 0;

    try {
      if (certificates) {
        certificateCount =
          JSON.parse(certificates).length;
      }

      if (projects) {
        projectCount =
          JSON.parse(projects).length;
      }

      if (skills) {
        skillCount =
          JSON.parse(skills).length;
      }
    } catch (error) {
      console.error(
        "Unable to load dashboard statistics:",
        error
      );
    }

    setStats({
      profile: profile ? 1 : 0,
      certificates: certificateCount,
      projects: projectCount,
      skills: skillCount,
    });
  }, []);

  const handleLogout = () => {
    navigate("/admin");
  };

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <aside className="admin-sidebar">

        <div className="admin-logo">
          <span>H</span>

          <div>
            <strong>Haanim</strong>
            <small>Portfolio Admin</small>
          </div>
        </div>

        <nav className="admin-nav">

          <Link
            to="/admin/dashboard"
            className="active"
          >
            <LayoutDashboard size={19} />
            Dashboard
          </Link>

          <Link to="/admin/profile">
            <User size={19} />
            Profile
          </Link>

          <Link to="/admin/certificates">
            <Award size={19} />
            Certificates
          </Link>

          <Link to="/admin/projects">
            <FolderKanban size={19} />
            Projects
          </Link>

          <Link to="/admin/skills">
            <Code2 size={19} />
            Skills
          </Link>

          <Link to="/admin/contact">
            <Mail size={19} />
            Contact
          </Link>

        </nav>

        <div className="admin-sidebar-bottom">

          <Link to="/">
            <ExternalLink size={18} />
            View Portfolio
          </Link>

          <button onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">

        {/* Top Bar */}
        <header className="admin-topbar">

          <div>
            <p className="admin-label">
              ADMIN PANEL
            </p>

            <h1>Dashboard</h1>
          </div>

          <Link
            to="/"
            className="view-site-btn"
          >
            <ExternalLink size={17} />
            View Website
          </Link>

        </header>

        {/* Welcome */}
        <section className="admin-welcome">

          <div>
            <span>Welcome back 👋</span>

            <h2>Manage your portfolio</h2>

            <p>
              Update your profile, certificates,
              projects and skills without changing
              the main website code.
            </p>
          </div>

        </section>

        {/* Statistics */}
        <section className="admin-stats">

          {/* Profile */}
          <div className="admin-stat-card">

            <div className="stat-icon">
              <User size={22} />
            </div>

            <div>
              <span>Profile</span>

              <strong>
                {stats.profile}
              </strong>

              <small>
                Personal profile
              </small>
            </div>

          </div>

          {/* Certificates */}
          <div className="admin-stat-card">

            <div className="stat-icon">
              <Award size={22} />
            </div>

            <div>
              <span>Certificates</span>

              <strong>
                {stats.certificates}
              </strong>

              <small>
                Certificates added
              </small>
            </div>

          </div>

          {/* Projects */}
          <div className="admin-stat-card">

            <div className="stat-icon">
              <FolderKanban size={22} />
            </div>

            <div>
              <span>Projects</span>

              <strong>
                {stats.projects}
              </strong>

              <small>
                Projects added
              </small>
            </div>

          </div>

          {/* Skills */}
          <div className="admin-stat-card">

            <div className="stat-icon">
              <Code2 size={22} />
            </div>

            <div>
              <span>Skills</span>

              <strong>
                {stats.skills}
              </strong>

              <small>
                Skills added
              </small>
            </div>

          </div>

        </section>

        {/* Quick Actions */}
        <section className="admin-section">

          <div className="admin-section-heading">

            <div>
              <p>QUICK ACTIONS</p>
              <h2>Manage Content</h2>
            </div>

          </div>

          <div className="admin-action-grid">

            {/* Profile */}
            <Link
              to="/admin/profile"
              className="admin-action-card"
            >
              <div className="action-icon">
                <User size={23} />
              </div>

              <h3>Edit Profile</h3>

              <p>
                Update your name, bio and
                profile information.
              </p>

              <span>Manage →</span>
            </Link>

            {/* Certificates */}
            <Link
              to="/admin/certificates"
              className="admin-action-card"
            >
              <div className="action-icon">
                <Award size={23} />
              </div>

              <h3>Certificates</h3>

              <p>
                Add and manage your certificates.
              </p>

              <span>Manage →</span>
            </Link>

            {/* Projects */}
            <Link
              to="/admin/projects"
              className="admin-action-card"
            >
              <div className="action-icon">
                <FolderKanban size={23} />
              </div>

              <h3>Projects</h3>

              <p>
                Add your latest projects and
                portfolio work.
              </p>

              <span>Manage →</span>
            </Link>

            {/* Skills */}
            <Link
              to="/admin/skills"
              className="admin-action-card"
            >
              <div className="action-icon">
                <Code2 size={23} />
              </div>

              <h3>Skills</h3>

              <p>
                Update your technical and
                professional skills.
              </p>

              <span>Manage →</span>
            </Link>

          </div>

        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;

