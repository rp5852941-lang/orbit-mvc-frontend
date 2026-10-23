import React from "react";
import { accreditations } from "../../mock";
import { Reveal } from "../Shared";
import { ShieldCheck, Check } from "lucide-react";
import "../css/RecognisedAccredited.css";

export default function RecognisedAccredited() {
  return (
    <section
      className="accreditation-section"
      data-testid="accreditations"
    >
      <div className="accreditation-container">
        {/* Heading */}
        <div className="accreditation-heading">
          <span className="accreditation-label">
            <ShieldCheck size={14} />
            Recognised &amp; Accredited By
          </span>

          <h2>
            Trust, verified by <span>regulators</span>
          </h2>

          <p>
            Our programmes are aligned with India&apos;s leading statutory,
            technical and international recognition bodies.
          </p>
        </div>

        {/* Accreditation Cards */}
        <div className="accreditation-list">
          {accreditations.map((item, index) => (
            <div className="accreditation-item" key={item.title}>
              <Reveal delay={index * 60}>
                <article
                  className="accreditation-card"
                  data-testid={`accreditation-${item.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <div className="accreditation-card-accent" />

                  <div className="accreditation-card-content">
                    <div className="accreditation-card-header">
                      <div className="accreditation-logo">
                        <img
                          src={item.logo}
                          alt={`${item.name} logo`}
                        />
                      </div>

                      <ShieldCheck className="accreditation-shield" />
                    </div>

                    <div className="accreditation-information">
                      <span className="accreditation-category">
                        {item.category}
                      </span>

                      <h3>{item.title}</h3>

                      <p>{item.name}</p>
                    </div>

                    <div className="accreditation-footer">
                      <span className="accreditation-tag">
                        <Check size={13} />
                        <span>{item.tag}</span>
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}