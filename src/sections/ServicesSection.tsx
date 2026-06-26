import Image from "next/image";

export default function ServicesSection() {
  return (
    <>
      <section className="h-screen w-screen bg-[#000123]">
        <div className="flex h-full items-center">
          <div className="w-1/2">
            <Image
              className="object-contain"
              src={"/bubzi_skateboard.webp"}
              width={1000}
              height={1000}
              alt="Bubzi Skateboard"
            ></Image>
          </div>
          <div className="w-1/2 flex flex-col">
            <div>
              <h1 className="text-5xl font-bold">EXPLORE OUR</h1>
              <h1 className="text-7xl font-bold">SERVICES</h1>
            </div>
            <div>
              <h1>ANIMATION & VIDEO PRODUCTION</h1>
              <p>
                PRODUCE AN ANIMATED OR LIVE ACTION (OR A HYBRID) VIDEO FOR YOUR
                BRAND. FROM CREATING A SCRIPT TO POST-PRODUCTION AND PUBLISHING.
                OUR TEAM WILL HANDLE IT ALL.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
