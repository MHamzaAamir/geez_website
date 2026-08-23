import CaseStudiesMarquee from "@/components/CaseStudiesMarquee";
import { ClientCardProps } from "@/types/CaseStudiesSectionTypes";

const cards: ClientCardProps[] = [
  {
    title: "BIG O SOFT",
    text: `AUGMENTED OUR CREATIVE TEAM, HANDLED THEIR ANIMATION, EDITING AND POST PRODUCTION WORK ALONG WITH ASSET CREATION FOR GAMES AND THEOR CLIENTS.`,
    image: "/BOS.png",
  },
  {
    title: "LIORA",
    text: `CREATED GAME ART, CHARACTER ANIMATION & GAME
UI/UX. FROM WIREFRAME AND STORYBOARDS TO POST
PRODUCTION AND VFX, WE GAVE OUR ALL TO THIS
AMAZING GAME.`,
    image: "/L.png",
  },
  {
    title: "LAKE MERIT",
    text: `DIRECTED AND PRODUCED A SHORT-FILM TRAILER IN
COLLABORATION WITH PEP FILM STUDIOS. SORTED THE
FULL PROCESS FROM PRE-PROD, PRODUCTION UPTO
POST-PROD AND PUBLISHING.`,
    image: "/LM.png",
  },
  {
    title: "PADEL PLUS",
    text: `HELPED GROW THEIR ONLINE AUDIENCE, PRODUCE PROMOTIONAL CONTENT, AND BUILD A PREMIUM BRAND IDENTITY FOR THEIR PADEL FACILITY.`,
    image: "/PP.png",
  },
  {
    title: "RIBBIOT",
    text: "PRODUCED AN ANIMATED INTRO FOR THIS CONSTRUCTION AGENCY, SHOWCASING THEIR EXPERTISE AND SKILLS, WHICH HELPED THEM REACH A WIDER AUDIENCE AND CLIENT BASE.",
    image: "/R.png",
  },
  {
    title: "SAPYGE",
    text: "HELPED THEM LAUNCH THEIR SAAS AI PRODUCT WITH AN ANIMATED STORY-STYLE AD, ALONG WITH SOCIAL CUTS EXPLAINING THEIR PRODUCT.",
    image: "/S.png",
  },
];

export default function CaseStudiesSection() {
  return (
    <section className="w-full bg-[#000123] z-10 ">
      <div className="section-container flex h-full flex-col py-14 md:py-20">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl text-center sm:text-5xl md:text-7xl">
            OUR CLIENTS &
          </h1>
          <h1 className="text-4xl text-center font-bold sm:text-5xl md:text-[79px] text-[#A036C5] [text-shadow:0_0_18px_#A036C5]">
            CASE STUDIES
          </h1>
        </div>
        <CaseStudiesMarquee cards={cards} />
      </div>
    </section>
  );
}
