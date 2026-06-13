import { Helmet } from "react-helmet-async";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import NewGame from "@/components/sections/NewGame";
import Positioning from "@/components/sections/Positioning";
import OfferStack from "@/components/sections/OfferStack";
import Process from "@/components/sections/Process";
import Scarcity from "@/components/sections/Scarcity";
import FinalCTA from "@/components/sections/FinalCTA";
import AnswerEngineSection from "@/components/sections/AnswerEngineSection";
import AboutPreview from "@/components/sections/AboutPreview";

export default function Home() {
  return (
    <div data-testid="page-home">
      <Helmet>
        <title>Kokowa Labs | Strategic Coffee Consultancy for Serious Founders</title>
        <meta name="description" content="Kokowa Labs helps serious coffee founders build profitable, differentiated coffee businesses through strategic positioning, commercial logic, and full value chain expertise from origin to crema." />
        <link rel="canonical" href="https://kokowalabs.com/" />
        <meta property="og:url" content="https://kokowalabs.com/" />
        <meta property="og:title" content="Kokowa Labs | Strategic Coffee Consultancy for Serious Founders" />
      </Helmet>
      <Hero />
      <Problem />
      <NewGame />
      {/* Anchor: Approach (mapped from mobile menu) */}
      <div id="approach">
        <Positioning />
      </div>
      {/* Anchor: Work With Us */}
      <div id="work-with-us">
        <OfferStack />
      </div>
      <Process />
      <Scarcity />
      {/* Anchor: Insights, short on-page summary that also serves as AEO content */}
      <div id="insights">
        <AnswerEngineSection />
      </div>
      {/* Anchor: About, preview block with founder portrait */}
      <div id="about">
        <AboutPreview />
      </div>
      {/* Anchor: Apply */}
      <div id="apply">
        <FinalCTA />
      </div>
    </div>
  );
}
