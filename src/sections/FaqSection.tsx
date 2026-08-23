import Image from "next/image";
import AccordionItem from "@/components/AccordianItem";
import { connectToDatabase } from "@/lib/mongodb";
import type { Faq } from "@/types/FaqTypes";

async function getFaqs(): Promise<Faq[]> {
  try {
    const { db } = await connectToDatabase();

    const faqs = await db
      .collection<Faq>("faqs")
      .find({})
      .sort({ order: 1 })
      .toArray();

    return faqs;
  } catch (error) {
    console.error("Failed to load FAQs", error);
    return [];
  }
}

export default async function FaqSection() {
  const faqs = await getFaqs();
  const left = faqs.filter((f) => f.side === "left");
  const right = faqs.filter((f) => f.side === "right");

  return (
    <section className="w-full bg-[#000123] z-10 ">
      <div className="section-container flex h-full flex-col py-12 md:py-16 lg:py-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-6xl font-bold sm:text-7xl md:text-8xl lg:text-[150px] text-[#A036C5] [text-shadow:0_0_12px_#A036C5]">
            FAQs
          </h1>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:hidden">
          <div className="mb-3 flex justify-center">
            <Image
              src="/bubzi_faq.webp"
              height={400}
              width={400}
              alt="bubzi_faq"
              className="h-auto w-44 sm:w-56 md:w-64"
            />
          </div>
          {faqs.map((faq, i) => (
            <AccordionItem
              key={`${faq.question}-${i}`}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>

        <div className="mt-10 hidden w-full lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 xl:gap-8">
          <div className="flex flex-col gap-6">
            {left.map((faq, i) => (
              <AccordionItem
                key={`left-${faq.question}-${i}`}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <Image
              src="/bubzi_faq.webp"
              height={400}
              width={400}
              alt="bubzi_faq"
              className="h-auto w-80 xl:w-100"
            />
          </div>

          <div className="flex flex-col gap-6">
            {right.map((faq, i) => (
              <AccordionItem
                key={`right-${faq.question}-${i}`}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
