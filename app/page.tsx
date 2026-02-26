import Link from "next/link";
import AltarSession1920 from "../public/altar-session-1920w.jpg";
import AltarSessions from "../public/altar-sessions-01.webp";
import Image from "next/image";

const pillars = [
  {
    title: "Healing",
    description:
      "Traditional consultations, herbal medicine, and spiritual guidance rooted in ancestral practice.",
    link: "/offerings",
    color: "text-spiritred",
    border: "border-spiritred",
  },
  {
    title: "Art",
    description:
      "Visual works exploring identity, spirituality, and the intersection of the seen and unseen.",
    link: "/about",
    color: "text-spiritblue",
    border: "border-spiritblue",
  },
  {
    title: "Writing & Poetry",
    description:
      "Words as medicine — prose and verse that give voice to ancestral memory and transformation.",
    link: "/journal",
    color: "text-spirityellow",
    border: "border-spirityellow",
  },
  {
    title: "Curation",
    description:
      "Exhibitions and experiences that center indigenous knowledge systems.",
    link: "/journal",
    color: "text-spiritblue",
    border: "border-spiritblue",
  },
];

const Home = () => {
  return (
    <div>
      <section className="relative h-[90vh] md:h-[75vh] w-full">
        <Image
          src={AltarSessions}
          alt="Altar session"
          width={1920}
          height={1080}
          className="object-cover h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-primary via-background-primary/60 to-transparent" />
        <div className="absolute left-4 right-4 md:left-1/2 md:transform md:-translate-x-1/2 bottom-4 max-w-xl flex flex-col items-center gap-4">
          <h1 className="text-4xl md:text-5xl font-display font-medium text-foreground animate-fade-in">
            Pono ya Moya
          </h1>
          <p className="text-xl text-stone-700">
            An anti-disciplinary platform that centers traditional healing and
            similar immersions in the &apos;otherwise&apos;
          </p>
          <div className="flex flex-col w-full md:w-auto md:flex-row gap-4 justify-start">
            <Link
              href="/offerings"
              className="bg-spiritblue text-white flex justify-center items-center font-semibold w-full md:w-auto md:self-end px-8 py-4 hover:bg-spiritblue-200 w-full md:w-auto text-center"
            >
              Explore Offerings
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border border-spiritblue flex justify-center items-center font-semibold w-full md:w-auto md:self-end px-8 py-4 hover:bg-spiritblue-200 w-full md:w-auto text-center"
            >
              Book a Session
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-display font-medium mb-6 text-foreground">
            Rooted in Tradition, Expressed Through Art & Word
          </h2>
          <p className="text-muted-foreground font-body text-lg leading-relaxed max-w-2xl mx-auto">
            As a sangoma, artist, writer, and poet, I walk between worlds —
            bridging the ancestral and the contemporary. My practice honors the
            deep wisdom of traditional healing while finding new expression
            through visual art, poetry, prose, and curated experiences.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-card">
        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl">
          {pillars.map((pillar) => (
            <Link
              key={pillar.title}
              href={pillar.link}
              className={`group border-t-2 ${pillar.border} pt-6`}
            >
              <h3
                className={`text-2xl font-display font-medium mb-3 ${pillar.color} transition-colors`}
              >
                {pillar.title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                {pillar.description}
              </p>
              <span className="text-sm text-primary font-body uppercase tracking-widest">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
