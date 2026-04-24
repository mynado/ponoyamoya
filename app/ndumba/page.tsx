import Link from "next/link";

export default async function NdumbaPage() {
  const offerings = [
    {
      title: "Connection Call",
      description:
        "A 15-minute introductory call to connect, discuss your needs, and explore how I can support you on your journey.",
      duration: "15 min",
    },
    {
      title: "Ancestral Consultation",
      description:
        "A deep spiritual reading connecting you with your ancestors for guidance, clarity, and healing. Sessions are held in a sacred space with traditional ceremony.",
      duration: "45 min",
    },
    {
      title: "Spiritual Cleansing",
      description:
        "A purification ritual to remove negative energies, restore balance, and create space for renewal and growth.",
      duration: "45 min",
    },
    {
      title: "Home Fortification",
      description:
        "Home fortification spiritually cleanses, protects and strengthens one’s home.",
      duration: "Varies",
    },
    {
      title: "Dream Interpretation",
      description:
        "Understanding the messages carried in your dreams through the lens of traditional wisdom and ancestral communication.",
      duration: "45 min",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-16">
      <div className="max-w-(--breakpoint-md) mx-auto w-full px-4">
        <div className="h-[2px] w-10 bg-spiritblue mb-8"></div>
        <h1 className="text-4xl md:text-5xl font-medium mb-6 text-foreground animate-fade-in">
          Ndumba
        </h1>
        <p
          className="text-lg max-w-2xl leading-relaxed animate-fade-in"
          style={{ animationDelay: "0.15s" }}
        >
          The ndumba is the sacred healing space — a room between worlds. Here,
          ancestral wisdom meets those who seek guidance, restoration, and
          spiritual clarity.
        </p>
      </div>
      <div className="max-w-(--breakpoint-md) mx-auto w-full px-4">
        {offerings.map((offering, i) => (
          <div
            key={offering.title}
            className={`border-t border-stone-200 py-10 grid md:grid-cols-[1fr_auto] gap-6 items-start animate-fade-in`}
            style={{ animationDelay: `${0.1 * (i + 1)}s` }}
          >
            <div>
              <h2 className="text-2xl font-medium mb-3 text-foreground">
                {offering.title}
              </h2>
              <p className="leading-relaxed max-w-lg">{offering.description}</p>
            </div>
            <span className="text-sm text-primary uppercase tracking-widest whitespace-nowrap">
              {offering.duration}
            </span>
          </div>
        ))}
        <p
          className="border-t border-stone-200 pt-10 mb-8 text-lg leading-relaxed animate-fade-in"
          style={{ animationDelay: `${0.1 * (offerings.length + 1)}s` }}
        >
          To book a consultation or inquire about healing work:
        </p>
        <Link
          href="/contact"
          className="uppercase border-1 border-spiritblack text-spiritblack block py-2 px-4 w-max hover:border-spiritblue hover:text-spiritblue transition-colors"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
