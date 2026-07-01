import ClientCard from "@/components/ClientCard";
import { ClientCardProps } from "@/types/CaseStudiesSectionTypes";

const cards: ClientCardProps[] = [
  {
    text: "This is test string1",
    image: "/hero-poster.jpg",
  },
  {
    text: "This is test string2",
    image: "/hero-poster.jpg",
  },
  {
    text: "This is test string3",
    image: "/hero-poster.jpg",
  },
  {
    text: "This is test string4",
    image: "/hero-poster.jpg",
  },
  {
    text: "This is test string5",
    image: "/hero-poster.jpg",
  },
  {
    text: "This is test string6",
    image: "/hero-poster.jpg",
  },
];

export default function CaseStudiesSection() {
  return (
    <section className="w-screen bg-[#000123]">
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
