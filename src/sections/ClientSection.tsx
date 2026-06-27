export default function ClientSection() {
  return (
    <section className="w-screen">
      <div className="flex flex-col bg-[#000123] gap-2">
        {/* First Heading */}
        <div className="flex items-center gap-10">
          <div className="h-1 bg-[#A036C5] flex-1"></div>
          <h1 className="text-2xl">LOYAL CLIENTS ACROSS THE WORLD</h1>
          <div className="h-1 bg-[#A036C5] flex-1"></div>
        </div>
        <div className="bg-[#3B3C58] min-h-30 mx-22 rounded-2xl shadow-2xl"></div>
        <div className="flex items-center gap-12">
          <div className="h-1 bg-[#A036C5] flex-1"></div>
          <h1 className="text-2xl">TRUSTING OUR CREATIVITY</h1>
          <div className="h-1 bg-[#A036C5] flex-1"></div>
        </div>
      </div>
    </section>
  );
}
