import ClientCard from "@/components/ClientCard";

export default function CaseStudiesSection() {
  return (
    <section className="h-screen w-screen">
      <div className="h-full bg-amber-950 flex items-center justify-center gap-10">
        <ClientCard />
        <ClientCard />
        <ClientCard />
      </div>
    </section>
  );
}
