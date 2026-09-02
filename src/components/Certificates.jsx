import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Certificates() {
  const [selectedCertificate, setSelectedCertificate] =
    useState(null);

  // Default certificates
  const defaultCertificates = [
    {
      title: "Preparing Data for Analysis with Microsoft Excel",
      issuer: "Microsoft · Coursera",
      date: "May 9, 2026",
      type: "Data Analytics",
      description:
        "Completed an online course focused on preparing and organizing data for analysis using Microsoft Excel.",
      skills: [
        "Microsoft Excel",
        "Data Preparation",
        "Data Analysis",
      ],
      verify:
        "https://coursera.org/verify/8KG9OWO6SNZG",
    },

    {
      title: "Generative AI: Introduction and Applications",
      issuer: "IBM · Coursera",
      date: "April 25, 2026",
      type: "Generative AI",
      description:
        "Completed an online course covering the fundamentals of Generative AI, its applications and modern AI concepts.",
      skills: [
        "Generative AI",
        "Artificial Intelligence",
        "AI Applications",
      ],
      verify:
        "https://coursera.org/verify/E57UOFE4DAB8",
    },

    {
      title:
        "HR Management Fundamentals: Recruitment to Development",
      issuer: "Coursera",
      date: "April 24, 2026",
      type: "Professional Course",
      description:
        "Completed a course covering key concepts in human resource management, including recruitment and employee development.",
      skills: [
        "HR Management",
        "Recruitment",
        "Employee Development",
      ],
      verify:
        "https://coursera.org/verify/E64MQ7ZIT2WX",
    },

    {
      title: "Harnessing the Power of Data with Power BI",
      issuer: "Microsoft · Coursera",
      date: "June 4, 2026",
      type: "Data Analytics",
      description:
        "Completed an online course focused on using Microsoft Power BI for data analysis and data visualization.",
      skills: [
        "Power BI",
        "Data Analysis",
        "Data Visualization",
      ],
      verify:
        "https://coursera.org/verify/26MGQUS8FCH8",
    },

    {
      title: "Step Into SQL with Jupyter Notebooks",
      issuer: "Coursera",
      date: "May 9, 2026",
      type: "SQL & Data",
      description:
        "Completed an online course focused on SQL fundamentals and working with SQL through Jupyter Notebooks.",
      skills: [
        "SQL",
        "Jupyter Notebooks",
        "Database Queries",
      ],
      verify:
        "https://coursera.org/verify/8KG9OWO6SNZG",
    },

    {
      title: "Free CCNA Training Program",
      issuer:
        "Global Network of Technological Studies (Pvt) Ltd",
      date: "April 20 – May 25, 2026",
      type: "Networking",
      description:
        "Participated in the Free CCNA Training Program and gained foundational knowledge in networking and CCNA-related concepts.",
      skills: [
        "Networking",
        "CCNA",
        "Network Fundamentals",
      ],
      certificateId: "2026-FCCNA-00001",
    },

    {
      title: "2-Day CI/CD Project Session",
      issuer: "SRTechOps",
      date: "May 9 – 10, 2026",
      type: "DevOps",
      description:
        "Successfully completed the 2-Day CI/CD Project Session conducted by SRTechOps, gaining hands-on experience and a strong foundation in CI/CD processes.",
      skills: [
        "CI/CD",
        "DevOps",
        "Project Experience",
      ],
    },

    {
      title: "Python for Beginners",
      issuer: "Simplilearn SkillUp",
      date: "December 21, 2025",
      type: "Programming",
      description:
        "Completed the online course Python for Beginners and developed foundational Python programming skills.",
      skills: [
        "Python",
        "Programming Fundamentals",
      ],
      certificateId: "9616896",
    },

    {
      title: "Getting Started with Full Stack Java Development",
      issuer: "Simplilearn SkillUp",
      date: "November 28, 2025",
      type: "Full Stack Development",
      description:
        "Completed an online course covering the fundamentals of full stack Java development and web application development concepts.",
      skills: [
        "Java",
        "Full Stack Development",
        "Web Development",
      ],
      certificateId: "9487593",
    },

    {
      title: "Introduction to Figma",
      issuer: "Simplilearn SkillUp",
      date: "November 23, 2025",
      type: "UI/UX Design",
      description:
        "Completed an online course introducing Figma and the fundamentals of interface design and prototyping.",
      skills: [
        "Figma",
        "UI Design",
        "Prototyping",
      ],
      certificateId: "9454555",
    },

    {
      title: "AWS re/Start Graduate",
      issuer: "Amazon Web Services (AWS) · Credly",
      date: "2026",
      type: "Cloud Computing",
      description:
        "Successfully completed the AWS re/Start program and earned the AWS re/Start Graduate digital credential, demonstrating foundational knowledge of AWS Cloud, cloud computing, and essential technical skills.",
      skills: [
        "AWS",
        "Cloud Computing",
        "EC2",
        "S3",
        "RDS",
        "VPC",
        "CloudWatch",
      ],
      verify:
        "https://www.credly.com/badges/e2311a20-19d1-40da-9626-a059e5ce39aa",
    },
  ];

  // Certificates state
  const [certificates, setCertificates] =
    useState(defaultCertificates);

  // Load certificates from Supabase
  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        "Unable to load certificates from Supabase:",
        error
      );

      // If Supabase fails, show default certificates
      setCertificates(defaultCertificates);
      return;
    }

    const formattedCertificates = (data || []).map(
      (certificate) => ({
        ...certificate,

        type:
          certificate.type ||
          "Professional Certificate",

        description:
          certificate.description ||
          `Completed the ${certificate.title} certificate issued by ${certificate.issuer}.`,

        skills:
          certificate.skills || [],

        verify:
          certificate.link || "",
      })
    );

    setCertificates([
      ...defaultCertificates,
      ...formattedCertificates,
    ]);
  };

  return (
    <section
      className="certificates-section"
      id="certificates"
    >
      <div className="certificates-container">

        {/* HEADING */}
        <div className="section-heading">
          <p>MY ACHIEVEMENTS</p>

          <h2>
            Courses & <span>Certificates.</span>
          </h2>
        </div>

        {/* CERTIFICATE GRID */}
        <div className="certificates-grid">

          {certificates.map((certificate, index) => (
            <div
              className="certificate-card"
              key={`${certificate.id || "default"}-${index}`}
              onClick={() =>
                setSelectedCertificate(certificate)
              }
            >

              <div className="certificate-top">

                <div className="certificate-icon">
                  ✓
                </div>

                <span className="certificate-date">
                  {certificate.date}
                </span>

              </div>

              <div className="certificate-content">

                <span className="certificate-type">
                  {certificate.type}
                </span>

                <h3>
                  {certificate.title}
                </h3>

                <p className="certificate-issuer">
                  {certificate.issuer}
                </p>

              </div>

              <div className="certificate-footer">

                <span>View Details</span>

                <span className="arrow">
                  →
                </span>

              </div>

            </div>
          ))}

        </div>
      </div>

      {/* CERTIFICATE MODAL */}
      {selectedCertificate && (
        <div
          className="certificate-modal-overlay"
          onClick={() =>
            setSelectedCertificate(null)
          }
        >

          <div
            className="certificate-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelectedCertificate(null)
              }
            >
              ×
            </button>

            <span className="certificate-type">
              {selectedCertificate.type}
            </span>

            <h2>
              {selectedCertificate.title}
            </h2>

            <p className="modal-issuer">
              Issued by{" "}
              <strong>
                {selectedCertificate.issuer}
              </strong>
            </p>

            <div className="modal-info">

              <div>
                <strong>Completed</strong>

                <span>
                  {selectedCertificate.date}
                </span>
              </div>

              {selectedCertificate.certificateId && (
                <div>
                  <strong>Certificate ID</strong>

                  <span>
                    {selectedCertificate.certificateId}
                  </span>
                </div>
              )}

            </div>

            <p className="modal-description">
              {selectedCertificate.description}
            </p>

            {selectedCertificate.skills?.length > 0 && (
              <>
                <h4>Skills & Topics</h4>

                <div className="modal-skills">

                  {selectedCertificate.skills.map(
                    (skill, index) => (
                      <span key={`${skill}-${index}`}>
                        {skill}
                      </span>
                    )
                  )}

                </div>
              </>
            )}

            {selectedCertificate.verify && (
              <a
                href={selectedCertificate.verify}
                target="_blank"
                rel="noopener noreferrer"
                className="verify-button"
              >
                Verify Certificate ↗
              </a>
            )}

          </div>

        </div>
      )}

    </section>
  );
}

export default Certificates;