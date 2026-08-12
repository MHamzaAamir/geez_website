import Image from "next/image";
import BookingForm from "../components/BookingForm";

export default function BookingSection() {
  return (
    <section className="w-full bg-linear-to-b from-[#000123] to-[#782995] py-10 text-white md:py-32 z-10 ">
      <div className="section-container">
        <div className="grid min-h-[80vh] grid-cols-1 overflow-hidden md:grid-cols-2">
          <div className="relative min-h-80 md:min-h-full">
            <Image
              src="/NEAT.png"
              alt="Book a call"
              fill
              className="object-contain object-center"
              priority={false}
            />
          </div>

          <div className="flex items-center px-5 py-8 sm:px-8 md:px-10 md:py-10">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
