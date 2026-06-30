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
      <div className="section-container h-full flex flex-col py-20">
        <div className="flex flex-col items-center">
          <h1 className="text-7xl">OUR CLIENTS &</h1>
          <h1 className="text-[79px] font-bold">CASE STUDIES</h1>
        </div>
        <div className="flex justify-center items-center flex-wrap gap-12 py-10">
          {cards.map((card) => (
            <ClientCard key={card.text} text={card.text} image={card.image} />
          ))}
        </div>
      </div>
    </section>
  );
}
