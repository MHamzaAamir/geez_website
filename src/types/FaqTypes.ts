export type FaqSide = "left" | "right";

export type Faq = {
  order: number;
  side: FaqSide;
  question: string;
  answer: string;
};
