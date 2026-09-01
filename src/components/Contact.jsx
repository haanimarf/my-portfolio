
import React, { useEffect, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

function Contact() {
  const [contact, setContact] = useState({
    email: "fathimahaanim2003@gmail.com",
    phone: "",
    location: "Sri Lanka",
    linkedin:
      "https://www.linkedin.com/in/fathima-haanim/",
    github: "https://github.com/haanimarf",
  });

  useEffect(() => {
    const savedContact =
      localStorage.getItem("portfolioContact");

    if (savedContact) {
      try {
        const parsedContact = JSON.parse(savedContact);

        setContact({
          email:
            parsedContact.email ||
            "fathimahaanim2003@gmail.com",

          phone:
            parsedContact.phone || "",

          location:
            parsedContact.location ||
            "Sri Lanka",

          linkedin:
            parsedContact.linkedin ||
            "https://www.linkedin.com/in/fathima-haanim/",

          github:
            parsedContact.github ||
            "https://github.com/haanimarf",
        });
      } catch (error) {
        console.error(
          "Unable to load contact information:",
          error
        );
      }
    }
  }, []);

  return (
    <section
      className="contact-section"
      id="contact"
    >
      <div className="contact-container">

        {/* Heading */}
        <div className="section-heading contact-heading">
          <p>GET IN TOUCH</p>

          <h2>
            Let's <span>Connect</span>
          </h2>

          <p className="contact-description">
            Feel free to connect with me through any
            of the platforms below.
          </p>
        </div>

        {/* Contact Details */}
        <div className="contact-links">

          {/* Email */}
          <a
            href={`mailto:${contact.email}`}
            className="contact-pill"
          >
            <div className="contact-pill-icon">
              <Mail size={20} />
            </div>

            <div className="contact-pill-text">
              <span>Email</span>

              <strong>
                {contact.email}
              </strong>
            </div>
          </a>


          {/* Phone */}
          {contact.phone && (
            <a
              href={`tel:${contact.phone}`}
              className="contact-pill"
            >
              <div className="contact-pill-icon">
                <Phone size={20} />
              </div>

              <div className="contact-pill-text">
                <span>Phone</span>

                <strong>
                  {contact.phone}
                </strong>
              </div>
            </a>
          )}


          {/* GitHub */}
          {contact.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-pill"
            >
              <div className="contact-pill-icon">
                <span className="social-text">
                  GH
                </span>
              </div>

              <div className="contact-pill-text">
                <span>GitHub</span>

                <strong>
                  {contact.github
                    .replace("https://", "")
                    .replace("www.", "")}
                </strong>
              </div>
            </a>
          )}


          {/* LinkedIn */}
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-pill"
            >
              <div className="contact-pill-icon">
                <span className="social-text">
                  in
                </span>
              </div>

              <div className="contact-pill-text">
                <span>LinkedIn</span>

                <strong>
                  Fathima Haanim
                </strong>
              </div>
            </a>
          )}


          {/* Location */}
          <div className="contact-pill">
            <div className="contact-pill-icon">
              <MapPin size={20} />
            </div>

            <div className="contact-pill-text">
              <span>Location</span>

              <strong>
                {contact.location}
              </strong>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;
