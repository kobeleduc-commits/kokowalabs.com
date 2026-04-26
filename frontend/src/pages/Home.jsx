import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import NewGame from "@/components/sections/NewGame";
import Positioning from "@/components/sections/Positioning";
import OfferStack from "@/components/sections/OfferStack";
import Process from "@/components/sections/Process";
import Scarcity from "@/components/sections/Scarcity";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <div data-testid="page-home">
      <Hero />
      <Problem />
      <NewGame />
      <Positioning />
      <OfferStack />
      <Process />
      <Scarcity />
      <FinalCTA />
    </div>
  );
}
