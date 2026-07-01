import Image from "next/image";
import AccordionItem from "@/components/AccordianItem";

const faqs = [
  {
    side: "left",
    question: "What industries does Geez specialize in?",
    answer:
      "Geez works across tech, fintech, healthcare, and creative industries — delivering tailored digital solutions for each vertical.",
  },
  {
    side: "left",
    question: "How do I get started with Geez's services?",
    answer:
      "Simply reach out through our contact page or book a discovery call. Our team will walk you through the onboarding process.",
  },
  {
    side: "left",
    question: "What is the typical project timeline?",
    answer:
      "Timelines vary by scope, but most projects range from 4 to 12 weeks. We'll give you a clear estimate during the kickoff phase.",
  },
  {
    side: "right",
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes — we offer flexible retainer plans for maintenance, updates, and continuous improvements post-launch.",
  },
  {
    side: "right",
    question: "Can Geez handle both design and development?",
    answer:
      "Absolutely. We're a full-service team covering UX/UI design, frontend and backend development, and QA under one roof.",
  },
  {
    side: "right",
    question: "What does the pricing look like?",
    answer:
      "Pricing is project-based and tailored to your needs. We're transparent about costs upfront — no hidden fees.",
  },
];

export default function FaqSection() {
  const left = faqs.filter((f) => f.side === "left");
  const right = faqs.filter((f) => f.side === "right");

  return (
    <section className="w-screen bg-[#000123]">
      <div className="section-container flex h-full flex-col py-12 md:py-16 lg:py-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-6xl font-bold sm:text-7xl md:text-8xl lg:text-[150px]">
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
