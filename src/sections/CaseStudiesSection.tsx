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
];

export default function CaseStudiesSection() {
  return (
    <section className="h-screen w-screen">
      <div className="h-full bg-amber-950 flex items-center justify-center gap-20">
        {cards.map((card) => (
          <ClientCard key={card.text} text={card.text} image={card.image} />
        ))}
      </div>
    </section>
  );
}
