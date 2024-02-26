import React from "react";
import { LandingHeroTop } from "./landing-hero-top";
import { LandingHeroVideo } from "./landing-hero-video";
import { LandingHeroBottom } from "./landing-hero-bottom";

export const LandingHero = () => {
  return (
    <>
      <LandingHeroTop />
      <LandingHeroVideo />
      <LandingHeroBottom />
    </>
  );
};
