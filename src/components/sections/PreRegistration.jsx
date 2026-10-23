import React from "react";
import { preRegSteps } from "../../mock";
import { Reveal } from "../Shared";
import { useApply } from "../../context/ApplyContext";
import { Button } from "../ui/button";
import "../css/PreRegistration.css";
import {
  Search,
  ClipboardList,
  UploadCloud,
  ShieldCheck,
  Users,
  GraduationCap,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import "../css/PreRegistration.css";

const stepIcons = [
  Search,
  ClipboardList,
  UploadCloud,
  ShieldCheck,
  Users,
  GraduationCap,
];

function StepNode({ step, index, active }) {
  const Icon = stepIcons[index] || Search;

  return (
    <div className="journey-step-node">
      <div
        className={`journey-step-icon ${active ? "journey-step-icon-active" : ""
          }`}
      >
        <Icon />
      </div>

      <span
        className={`journey-step-number ${active ? "journey-step-number-active" : ""
          }`}
      >
        STEP {step.step}
      </span>

      <h3>{step.title}</h3>
      <p>{step.desc}</p>
    </div>
  );
}

function StepNodeMobile({ index, active }) {
  const Icon = stepIcons[index] || Search;

  return (
    <div
      className={`journey-mobile-icon ${active ? "journey-mobile-icon-active" : ""
        }`}
    >
      <Icon />
    </div>
  );
}

export default function PreRegistration() {
  const { openApply } = useApply();

  const chevronPositions = [16.67, 33.33, 50, 66.67, 83.33];

  return (
    <section
      className="journey-section"
      data-testid="admission-journey"
    >
      {/* Background decoration */}
      <div className="journey-dot-pattern" />
      <div className="journey-circle journey-circle-large" />
      <div className="journey-circle journey-circle-small" />

      <div className="journey-container">
        {/* Heading */}
        <div className="journey-heading">
          <span className="journey-label">
            <span />
            Pathway to Action
            <span />
          </span>

          <h2>
            From Pre-Registration to{" "}
            <strong>Enrolment</strong>
          </h2>

          <p>
            Explore our programmes and choose the one that fits your goals.
          </p>
        </div>

        {/* Desktop timeline */}
        <div className="journey-desktop">
          <div className="journey-horizontal-line" />
          <div className="journey-start-dot" />
          <div className="journey-end-dot" />

          {chevronPositions.map((position, index) => (
            <span
              key={position}
              className="journey-chevron"
              style={{ left: `${position}%` }}
            >
              <ChevronRight />
            </span>
          ))}

    

<div className="journey-desktop-steps">
  {preRegSteps.map((step, index) => (
    <div className="journey-desktop-item" key={step.step}>
      <Reveal delay={index * 90}>
        <StepNode
          step={step}
          index={index}
          active={true}
        />
      </Reveal>
    </div>
  ))}
</div>
        </div>

        {/* Mobile timeline */}
        <div className="journey-mobile">
          <div className="journey-vertical-line" />

          <div className="journey-mobile-steps">
           {preRegSteps.map((step, index) => (
  <Reveal key={step.step} delay={index * 60}>
    <div className="journey-mobile-item">
      <StepNodeMobile
        index={index}
        active={true}
      />

      <div className="journey-mobile-content">
        <span className="journey-mobile-number journey-mobile-number-active">
          STEP {step.step}
        </span>

        <h3>{step.title}</h3>
        <p>{step.desc}</p>
      </div>
    </div>
  </Reveal>
))}
          </div>
        </div>

        {/* CTA */}
        <div className="journey-action">
          <Button
            onClick={openApply}
            className="journey-button"
            data-testid="journey-start-btn"
          >
            Start Pre-Registration
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}