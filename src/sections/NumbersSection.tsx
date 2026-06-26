import NumberBox from "@/components/NumberBox";
import { NumberBoxProps } from "@/types/NumberSectionTypes";

const stats: NumberBoxProps[] = [
  {
    figure: 300,
    symbol: "+",
    text: "SUCCESSFUL AND ACTIVE <br/> BRANDS AND PARTNERS",
  },
  {
    figure: 90,
    symbol: "%",
    text: "PARTNER RETENTION RATE <br/> AND GROWTH SUCCESS",
  },
  {
    figure: 10,
    symbol: "+",
    text: "YEARS OF CREATIVE AND <br/> TECHNICAL EXCELLENCE",
  },
  {
    figure: 20,
    symbol: "+",
    text: "CREATIVE-HEADS AND TECH <br/> EXPERTS IN-HOUSE",
  },
];

export default function NumbersSection() {
  return (
    <>
      <section className="relative h-screen w-screen overflow-hidden bg-[#000123]">
        <div className="absolute top-0 right-0 translate-y-[-50%] translate-x-[50%] bg-[#D948FD] h-[60%] w-[60%] blur-[230px]"></div>
        <div className="section-container relative z-10 flex h-full items-center justify-between gap-14">
          <div className="w-1/2">
            <h1 className="text-7xl">FULFIL ALL YOUR</h1>
            <h1 className="text-[63.5px] font-bold">CREATIVE DREAMS</h1>
            <p className="text-lg">
              We specialize in high quality, production level creative solutions
              and scroll stopping visuals.
              <br />
              Our mission is to make your product stick in your customer&apos;s
              mind by disrupting the pattern and producing premium content.
            </p>
          </div>
          <div className="w-1/2">
            <div className="grid grid-cols-2 grid-rows-2 gap-40">
              {stats.map((stat) => (
                <NumberBox
                  key={stat.figure}
                  figure={stat.figure}
                  symbol={stat.symbol}
                  text={stat.text}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
