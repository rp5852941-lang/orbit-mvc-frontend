import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { footerCols } from "../mock";
import footerLogo from "./images/logo-white.webp";
import "./css/Footer.css";

import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  ChevronRight,
  MessageCircle,
  Video,
  ContactRound,
  ArrowUp,
  Headphones,
  X,
} from "lucide-react";

/* Footer link column */
function FooterColumn({ title, links }) {
  return (
    <div className="footer-column">
      <h4>{title}</h4>

      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to}>
              <ChevronRight />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Right-side enquiry form */
function FooterEnquiryForm() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const enquiryData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    console.log("Footer enquiry:", enquiryData);

    setTimeout(() => {
      alert("Thank you! Your enquiry has been submitted.");
      form.reset();
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className="footer-enquiry">
      <h4>Quick Enquiry</h4>

      <form onSubmit={handleSubmit}>
        <div className="footer-form-row">
          <label htmlFor="footer-name">Name</label>

          <input
            type="text"
            id="footer-name"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </div>

        <div className="footer-form-row">
          <label htmlFor="footer-email">Email</label>

          <input
            type="email"
            id="footer-email"
            name="email"
            placeholder="Your email"
            autoComplete="email"
            required
          />
        </div>

        <div className="footer-form-row">
          <label htmlFor="footer-phone">Phone</label>

          <input
            type="tel"
            id="footer-phone"
            name="phone"
            placeholder="Your phone number"
            autoComplete="tel"
            inputMode="numeric"
            pattern="[6-9][0-9]{9}"
            maxLength="10"
            required
          />
        </div>

        <div className="footer-form-row">
          <label htmlFor="footer-message">Message</label>

          <textarea
            id="footer-message"
            name="message"
            placeholder="Write your message"
            rows="3"
            required
          />
        </div>

        <button
          type="submit"
          className="footer-form-submit"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Enquiry"}
        </button>
      </form>
    </div>
  );
}

const socialLinks = [
  { icon: Facebook, label: "Facebook", url: "#" },
  { icon: Linkedin, label: "LinkedIn", url: "#" },
  { icon: Youtube, label: "YouTube", url: "#" },
  { icon: Instagram, label: "Instagram", url: "#" },
  { icon: X, label: "Twitter", url: "#" },
];

export default function Footer() {
  const [contactMenuOpen, setContactMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY || document.documentElement.scrollTop;

      const scrollableHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress =
        scrollableHeight > 0
          ? Math.min(
            Math.max((scrollTop / scrollableHeight) * 100, 0),
            100
          )
          : 0;

      setShowScrollTop(scrollTop > 120);
      setScrollProgress(progress);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeContactMenu = () => {
    setContactMenuOpen(false);
  };

  const progressRadius = 26;
  const progressCircumference = 2 * Math.PI * progressRadius;

  const progressOffset =
    progressCircumference -
    (scrollProgress / 100) * progressCircumference;

  return (
    <>

      <style>{`
        /* =====================================================
           FOOTER COLUMN WIDTH AND ENQUIRY FORM
        ===================================================== */

        .site-footer .footer-main-container {
          display: grid;
          grid-template-columns:
            minmax(290px, 0.66fr)
            minmax(145px, 0.68fr)
            minmax(150px, 0.72fr)
            minmax(140px, 0.60fr)
            minmax(225px, 0.58fr);
          align-items: start;
          gap: 10px;
        }

    
        .site-footer .footer-column {
          width: 100%;
          min-width: 0;
        }

        .site-footer .footer-column h4,
        .site-footer .footer-enquiry h4 {
          margin: 0 0 21px;
          color: #ffffff;
          font-size: 19px;
          font-weight: 700;
          line-height: 1.25;
        }

        .site-footer .footer-column ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .site-footer .footer-column li {
          margin: 0 0 13px;
          padding: 0;
        }

        .site-footer .footer-column li a {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          color: inherit;
          text-decoration: none;
        }

        .site-footer .footer-column li a svg {
          width: 14px;
          height: 14px;
          flex: 0 0 14px;
          margin-top: 4px;
          color: #ff6b1b;
        }

        /* =====================================================
           QUICK ENQUIRY FORM
        ===================================================== */

        .site-footer .footer-enquiry {
          width: 100%;
          min-width: 0;
          padding-left: 22px;
          border-left: 2px solid #ff6b1b;
          // height: 362px;
        }

        .site-footer .footer-enquiry form {
          display: grid;
          width: 100%;
          gap: 9px;
        }

        .site-footer .footer-form-row {
          width: 100%;
        }

    
        .site-footer .footer-form-row label {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .site-footer .footer-form-row input,
        .site-footer .footer-form-row textarea {
          display: block;
          width: 100%;
          box-sizing: border-box;
          padding: 9px 11px;
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 5px;
          outline: none;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.07);
          font-family: inherit;
          font-size: 12.5px;
          line-height: 1.4;
          transition:
            border-color 0.2s ease,
            background-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .site-footer .footer-form-row input {
          height: 34px;
        }

        .site-footer .footer-form-row textarea {
          min-height: 68px;
          resize: vertical;
        }

        .site-footer .footer-form-row input::placeholder,
        .site-footer .footer-form-row textarea::placeholder {
          color: rgba(255, 255, 255, 0.64);
        }

        .site-footer .footer-form-row input:hover,
        .site-footer .footer-form-row textarea:hover {
          border-color: rgba(255, 107, 27, 0.8);
        }

        .site-footer .footer-form-row input:focus,
        .site-footer .footer-form-row textarea:focus {
          border-color: #ff6b1b;
          background: rgba(255, 255, 255, 0.11);
          box-shadow: 0 0 0 3px rgba(255, 107, 27, 0.17);
        }

        .site-footer .footer-form-submit {
          width: 100%;
          min-height: 40px;
          padding: 9px 15px;
          border: 1px solid #ff6b1b;
          border-radius: 5px;
          outline: none;
          color: #ffffff;
          background: #ff6b1b;
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.2;
          cursor: pointer;
          transition:
            border-color 0.2s ease,
            background-color 0.2s ease,
            transform 0.2s ease;
        }

        .site-footer .footer-form-submit:hover:not(:disabled) {
          border-color: #e9560a;
          background: #e9560a;
        }

        .site-footer .footer-form-submit:active:not(:disabled) {
          transform: translateY(1px);
        }

        .site-footer .footer-form-submit:focus-visible {
          outline: 3px solid rgba(255, 255, 255, 0.9);
          outline-offset: 3px;
        }

        .site-footer .footer-form-submit:disabled {
          cursor: not-allowed;
          opacity: 0.65;
        }

        /* =====================================================
           FOOTER DESCRIPTION STRIP
        ===================================================== */

        .site-footer .footer-description-wrap {
      width: min(100% - 48px, 1210px);
    margin: 20px auto 0;
    padding: 20px 6px 0px;
    border-top: 1px solid rgba(255, 255, 255, 0.18);
        }

        .site-footer .footer-description {
          max-width: 1360px;
          margin: 0 auto;
          color: rgba(255, 255, 255, 0.92);
          font-size: 13px;
          font-weight: 400;
          line-height: 1.85;
          text-align: center;
        }

        .site-footer .footer-description strong,
        .site-footer .footer-description a {
          color: #ff6b1b;
          font-weight: 600;
          text-decoration: none;
        }

        .site-footer .footer-description a:hover {
          color: #ffffff;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .site-footer .footer-description a:focus-visible {
          border-radius: 2px;
          outline: 2px solid #ffffff;
          outline-offset: 3px;
        }

        /* Smaller desktop */
        @media (max-width: 1350px) {
          .site-footer .footer-main-container {
            grid-template-columns:
              minmax(260px, 1.4fr)
              minmax(135px, 0.66fr)
              minmax(140px, 0.66fr)
              minmax(135px, 0.62fr)
              minmax(210px, 0.94fr);
            gap: 15px;
          }

          .site-footer .footer-enquiry {
            padding-left: 18px;
          }
        }

        /* Tablet and small laptop */
        @media (max-width: 1100px) {
          .site-footer .footer-main-container {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 38px 30px;
          }

          .site-footer .footer-about {
            grid-column: 1 / -1;
          }

          .site-footer .footer-enquiry {
            padding-left: 22px;
          }

          .site-footer .footer-description-wrap {
            width: min(100% - 40px, 1440px);
            margin-top: 32px;
            padding: 25px 8px 27px;
          }

          .site-footer .footer-description {
            font-size: 13.5px;
            line-height: 1.8;
          }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .site-footer .footer-main-container {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .site-footer .footer-about {
            grid-column: auto;
          }

          .site-footer .footer-enquiry {
            max-width: 100%;
            padding-top: 25px;
            padding-left: 0;
            border-top: 2px solid #ff6b1b;
            border-left: 0;
          }

          .site-footer .footer-form-row input {
            height: 43px;
          }

          .site-footer .footer-form-row textarea {
            min-height: 90px;
          }

          .site-footer .footer-form-submit {
            min-height: 44px;
          }

          .site-footer .footer-description-wrap {
            width: calc(100% - 32px);
            margin-top: 30px;
            padding: 22px 2px 24px;
          }

          .site-footer .footer-description {
            font-size: 13px;
            line-height: 1.75;
            text-align: left;
          }
        }
      `}</style>

      <footer className="site-footer">
        <div className="footer-background-glow" />

        <div className="footer-main-container">
          {/* University information */}
          <div className="footer-about footer-about-card">
            {/* Logo */}
            <div className="footer-logo-box">
              <img
                src={footerLogo}
                alt="Orbit Digital University"
                className="footer-logo"
              />
            </div>

            {/* Campus */}
            <div className="footer-info-group">
              <h5>Campus:</h5>

              <div className="footer-info-content">
                <MapPin />

                <span>
                  VPO Shahpurkandi, Tehsil Dhar Kalan, District
                  Pathankot, Punjab – 145029, India.
                </span>
              </div>
            </div>

            {/* Contact number */}
            <div className="footer-info-group">
              <h5>Toll Free:</h5>

              <a
                href="tel:+919876543210"
                className="footer-info-content footer-phone-link"
              >
                <Phone />
                <span>+91 98765 43210</span>
              </a>
            </div>

            {/* Email */}
            <div className="footer-info-group">
              <h5>Mail Support:</h5>

              <a
                href="mailto:admissions@orbitdu.edu.in"
                className="footer-info-content"
              >
                <Mail />
                <span>admissions@orbitdu.edu.in</span>
              </a>
            </div>
            <div className="footer-info-group">
              <h5>General Enquiries :</h5>

              <a
                href="mailto:admissions@orbitdu.edu.in"
                className="footer-info-content"
              >
                <Mail />
                <span>admissions@orbitdu.edu.in</span>
              </a>
            </div>

            {/* Social media */}
            <div className="footer-social-links footer-color-socials">
              {socialLinks.map(({ icon: Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  className={`footer-social-${label
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  aria-label={label}
                  title={label}
                  target={url !== "#" ? "_blank" : undefined}
                  rel={url !== "#" ? "noreferrer" : undefined}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <FooterColumn
            title="Quick Links"
            links={footerCols.quickLinks}
          />

          {/* Programmes */}
          <FooterColumn
            title="Programmes"
            links={footerCols.programmes}
          />

          {/* Student Zone */}
          <FooterColumn
            title="Student Zone"
            links={footerCols.studentZone}
          />

          {/* Right enquiry form */}
          <FooterEnquiryForm />
        </div>

        {/* University description */}
        <div className="footer-description-wrap">
          <p className="footer-description">
            <strong>Orbit Digital University</strong> offers flexible,
            technology-enabled and industry-relevant programmes, including{" "}
            <strong>
               BBA, B.Com, BCA, B.Sc Computer Science, B.Tech, BA, B.Sc Data
              Science, B.Sc Artificial Intelligence, MBA, M.Com, MCA, M.Sc
              Computer Science/IT, M.Tech, MA, M.Sc Data Science and M.Sc
              Artificial Intelligence &amp; Machine Learning
            </strong>
            . Through its smart LMS, live and recorded classes, digital study
            resources, practical learning and dedicated academic support, the
            University prepares students and working professionals for
            successful careers in the rapidly evolving digital economy — visit{" "}
            <a
              href="https://www.orbitdu.edu.in"
              target="_blank"
              rel="noreferrer"
            >
              Orbit Digital University
            </a>{" "}
            or email{" "}
            <a href="mailto:admissions@orbitdu.edu.in">
              admissions@orbitdu.edu.in
            </a>
            .
          </p>
        </div>

        {/* Bottom footer */}
        <div className="footer-bottom-container">
          <div className="footer-bottom">
            <p>
              © 2026 Orbit Digital University, Pathankot, Punjab. All
              rights reserved.
            </p>

            <nav
              className="footer-legal-links"
              aria-label="Legal links"
            >
              <Link to="/">Privacy Policy</Link>
              <Link to="/">Terms of Use</Link>
              <Link to="/">Refund Policy</Link>
              <Link to="/contact">Grievance Portal</Link>
              <Link to="/">Sitemap</Link>
            </nav>
          </div>
        </div>

      </footer>

      {/* Fixed quick-contact menu */}
      <div
        className={`footer-quick-contact ${contactMenuOpen ? "footer-quick-contact-open" : ""
          }`}
      >
        <button
          type="button"
          className="footer-contact-backdrop"
          onClick={closeContactMenu}
          aria-label="Close quick contact menu"
          tabIndex={contactMenuOpen ? 0 : -1}
        />

        <nav
          className="footer-contact-menu"
          aria-label="Quick contact actions"
        >
          <ul className="footer-contact-actions">
            {/* WhatsApp */}
            <li className="footer-action-whatsapp">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
                tabIndex={contactMenuOpen ? 0 : -1}
              >
                <MessageCircle />
              </a>
            </li>

            {/* Phone */}
            <li className="footer-action-phone">
              <a
                href="tel:+919876543210"
                aria-label="Call Admissions"
                title="Call Admissions"
                tabIndex={contactMenuOpen ? 0 : -1}
              >
                <Phone />
              </a>
            </li>

            {/* Video consultation */}
            <li className="footer-action-video">
              <button
                type="button"
                aria-label="Schedule Video Consultation"
                title="Schedule Video Consultation"
                tabIndex={contactMenuOpen ? 0 : -1}
                onClick={closeContactMenu}
              >
                <Video />
              </button>
            </li>

            {/* Admission counsellor */}
            <li className="footer-action-counsellor">
              <Link
                to="/contact"
                aria-label="Connect with Admission Counselor"
                title="Connect with Admission Counselor"
                tabIndex={contactMenuOpen ? 0 : -1}
                onClick={closeContactMenu}
              >
                <ContactRound />
              </Link>
            </li>
          </ul>

          {/* Main contact button */}
          <button
            type="button"
            className="footer-contact-fab"
            onClick={() => {
              setContactMenuOpen((current) => !current);
            }}
            aria-expanded={contactMenuOpen}
            aria-label={
              contactMenuOpen
                ? "Close quick contact actions"
                : "Open quick contact actions"
            }
            title={
              contactMenuOpen
                ? "Close contact menu"
                : "Quick contact"
            }
          >
            <span className="footer-contact-fab-icon">
              {contactMenuOpen ? <X /> : <Headphones />}
            </span>
          </button>
        </nav>
      </div>

      {/* Fixed scroll-to-top progress button */}
      <button
        type="button"
        className={`footer-scroll-top ${showScrollTop ? "footer-scroll-top-visible" : ""
          }`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title={`Scroll to top — ${Math.round(
          scrollProgress
        )}% page viewed`}
      >
        <svg
          className="footer-scroll-progress"
          viewBox="0 0 58 58"
          aria-hidden="true"
        >
          <circle
            className="footer-scroll-progress-track"
            cx="29"
            cy="29"
            r={progressRadius}
          />

          <circle
            className="footer-scroll-progress-value"
            cx="29"
            cy="29"
            r={progressRadius}
            style={{
              strokeDasharray: progressCircumference,
              strokeDashoffset: progressOffset,
            }}
          />
        </svg>

        <span className="footer-scroll-icon">
          <ArrowUp />
        </span>
      </button>
    </>
  );
}
