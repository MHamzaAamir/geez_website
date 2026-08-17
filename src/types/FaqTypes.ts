export type FaqSide = "left" | "right";

export type Faq = {
  _id?: string;
  order: number;
  side: FaqSide;
  question: string;
  answer: string;
};
