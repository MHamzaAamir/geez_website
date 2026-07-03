import { ServiceItemProps } from "@/types/ServicesSectionTypes";

export default function ServiceItem({
  heading,
  description,
}: ServiceItemProps) {
  return (
    <div className="border-t border-white/10 pt-6 first:border-t-0 first:pt-0 md:pt-8">
      <h3 className="max-w-3xl text-3xl leading-none sm:text-4xl md:text-5xl">
        {heading}
      </h3>
      <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-[#7B7C8E] sm:text-base md:mt-4 md:text-lg">
        {description}
      </p>
    </div>
  );
}
