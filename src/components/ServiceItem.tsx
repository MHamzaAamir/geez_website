import { ServiceItemProps } from "@/types/ServicesSectionTypes";

export default function ServiceItem({
  heading,
  description,
}: ServiceItemProps) {
  return (
    <div className="pt-8">
      <h3 className="text-4xl leading-none">{heading}</h3>
      <p className="max-w-2xl font-medium leading-tight text-[#7B7C8E]">
        {description}
      </p>
    </div>
  );
}
