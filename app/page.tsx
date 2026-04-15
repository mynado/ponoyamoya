import Link from "next/link";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center gap-12 h-full">
      {/** TODO: Add logo */}
      <div className="flex flex-col md:flex-row gap-2">
        <Link
          href="/ndumba"
          className="group relative border-1 border-stone-200 p-6 w-full bg-spiritblue/10 text-spiritblack md:bg-transparent md:w-1/2 h-auto md:mb-0 hover:bg-spiritblue/10 hover:text-spiritblue! transition-colors duration-300"
        >
          <div className="p-6 md:text-right flex flex-col justify-center gap-2 h-full">
            <div className="h-[2px] w-10 bg-spiritblue mb-8 md:self-end"></div>
            <h2 className={`text-4xl font-bold group-hover:text-spiritblue`}>
              Ndumba
            </h2>
            <p className="text-lg uppercase font-body text-stone-600">
              The healing space
            </p>
            <p className="mt-4 font-body leading-relaxed text-stone-500">
              Ancestral consultations, herbal medicine, spiritual cleansing, and
              ceremony.
            </p>
          </div>
        </Link>
        <Link
          href="/practice"
          className="group relative border-1 border-stone-200 p-6 w-full bg-spiritred/10 text-spiritblack md:bg-transparent md:w-1/2 h-auto md:mb-0 hover:bg-spiritred/10 hover:text-spiritred! transition-colors duration-300"
        >
          <div className="p-6 flex flex-col justify-center gap-2 h-full">
            <div className="h-[2px] w-10 bg-spiritred mb-8"></div>
            <h2 className={`text-4xl font-bold group-hover:text-spiritred`}>
              Practice
            </h2>
            <p className="text-lg uppercase font-body text-stone-600">
              The creative space
            </p>
            <p className="mt-4 font-body leading-relaxed text-stone-500">
              Past work and ongoing experiments across art, poetry, prose, and
              curated experiences.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
