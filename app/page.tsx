import Link from "next/link";
import AltarSession1200 from "../public/altar-session-1200w.jpg";
import AltarSession1920 from "../public/altar-session-1920w.jpg";
import AltarSession3840 from "../public/altar-session-3840w.jpg";
import Image from "next/image";

const Home = () => {
  return (
    <div>
      <section className="h-screen relative">
        <figure className="h-full">
          <picture>
            <source
              srcSet={`
    ${AltarSession1200} 1200w,
    ${AltarSession1920} 1920w,
    ${AltarSession3840} 3840w
  `}
              sizes="100vw"
            ></source>
            <Image
              src={AltarSession1920}
              alt="Altar session"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
            />
            <figcaption className="absolute right-1 bottom-1 text-sm text-stone-200 md:text-stone-800 md:right-unset md:left-1">
              Photo by Saleen Gomani
            </figcaption>
          </picture>
        </figure>
        <div className="absolute left-4 right-4 bottom-8 max-w-xl md:left-[unset] py-8 px-4 bg-black/40 p-4 rounded-lg flex flex-col justify-center gap-4 md:items-center text-white">
          <h1 className="self-start text-white!">Pono ya Moya</h1>
          <p className="text-xl">
            An anti-disciplinary platform that centers traditional healing and
            similar immersions in the &apos;otherwise&apos;
          </p>
          <Link
            href="/contact"
            className="bg-spiritblue rounded-lg text-white flex justify-center items-center font-semibold md:self-end px-8 py-4 hover:bg-spiritblue-200"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
