import React from "react";
import { techSuite } from "../../mock";
import { Reveal } from "../Shared";
import { useApply } from "../../context/ApplyContext";
import { Button } from "../ui/button";
import {
  MonitorPlay,
  Database,
  Bot,
  FileCheck2,
  Headphones,
  Smartphone,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import "../css/TechSuite.css";

const icons = {
  MonitorPlay,
  Database,
  Bot,
  FileCheck2,
  Headphones,
  Smartphone,
};

export default function TechSuite() {
  const { openApply } = useApply();

  return (
    <section className="tech-suite-section">
      {/* Background decorations */}
      <div className="tech-suite-pattern" />
      <div className="tech-suite-glow" />

      <div className="tech-suite-container">
        {/* Section header */}
        <div className="tech-suite-header">
          <div className="tech-suite-heading">
            <span className="tech-suite-eyebrow">
              Enterprise Learning Suite
            </span>

            <h2>
              One connected <span>Tech Suite</span>
            </h2>

            <p>
              Smart digital tools to manage learning, admissions, student
              support, communication and academic delivery — all in one
              platform.
            </p>
          </div>

          <Button
            type="button"
            onClick={openApply}
            className="tech-suite-button"
          >
            Preview Platform
            <ArrowRight />
          </Button>
        </div>

        {/* Technology cards */}
        <div className="tech-suite-grid">
          {techSuite.map((item, index) => {
            const Icon = icons[item.icon] || MonitorPlay;
            const featured = index === 0;

            return (
              <div className="tech-suite-grid-item" key={item.name}>
                <Reveal delay={index * 50}>
                  <article
                    className={`tech-suite-card ${
                      featured ? "tech-suite-card-featured" : ""
                    }`}
                  >
                    <div className="tech-suite-card-top">
                      <span className="tech-suite-icon">
                        <Icon />
                      </span>

                      <ArrowUpRight className="tech-suite-arrow" />
                    </div>

                    <h3>{item.name}</h3>
                    <p>{item.tagline}</p>
                  </article>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}