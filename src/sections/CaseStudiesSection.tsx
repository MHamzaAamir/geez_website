import ClientCard from "@/components/ClientCard";
import { ClientCardProps } from "@/types/CaseStudiesSectionTypes";

const cards: ClientCardProps[] = [
  {
    text: "HELPED THEM GROW THEIR ONLINE AUDIENCE WITH HIGH QUALITY CONTENT. PRODUCED LIVE ACTION + ANIMATED PROMOS AND ADS. BUILT THEIR VISUAL IDENTITY AND HELPED THEM CREATE A STRONG BRAND PRESENCE AS A PREMIUM PADEL FACILITY",
    image: "/BOS.png",
  },
  {
    text: "This is test string2",
    image: "/L.png",
  },
  {
    text: "This is test string3",
    image: "/LM.png",
  },
  {
    text: "This is test string4",
    image: "/PP.png",
  },
  {
    text: "This is test string5",
    image: "/R.png",
  },
  {
    text: "HELPED THEM LAUNCH THEIR SaaS AI PRODUCT WITH AN ANIMATED STORY-STYLE AD, ALONG WITH SOCIAL CUTS EXPLAINING THEIR PRODUCT.",
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
          <h1 className="text-4xl text-center font-bold sm:text-5xl md:text-[79px]">
            CASE STUDIES
          </h1>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 py-8 sm:gap-8 md:gap-12 md:py-10">
          {cards.map((card) => (
            <ClientCard key={card.text} text={card.text} image={card.image} />
          ))}
        </div>
      </div>
    </section>
  );
}
