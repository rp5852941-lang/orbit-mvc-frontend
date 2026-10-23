import React from "react";
import HeroSlider from "../components/HeroSlider";
import HeroFeatures from "../components/sections/HeroFeatures";
import RecognisedAccredited from "../components/sections/RecognisedAccredited";
import AboutIntro from "../components/sections/AboutIntro";
import ProgrammesGrid from "../components/sections/ProgrammesGrid";
import PreRegistration from "../components/sections/PreRegistration";
import SmartLMS from "../components/sections/SmartLMS";
import TechSuite from "../components/sections/TechSuite";
import CtaBand from "../components/sections/CtaBand";
import AnnouncementsWhy from "../components/sections/AnnouncementsWhy";
import FaqSection from "../components/sections/FaqSection";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <HeroFeatures />
      <RecognisedAccredited />
      <AboutIntro />
      <ProgrammesGrid />
      <PreRegistration />
      <SmartLMS />
      <TechSuite />
      <CtaBand />
      <AnnouncementsWhy />
      <FaqSection />
    </div>
  );
}
