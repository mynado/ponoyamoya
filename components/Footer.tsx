import FlowerBlue from "@/icons/flower-blue";
import { SiteSettings } from "@/lib/sanity/types/index";

export default function Footer({
  settings,
}: {
  settings: SiteSettings | null;
}) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col items-center w-full justify-center gap-4 p-4">
      <FlowerBlue className="w-20 h-20 opacity-30" />
      <div className="flex flex-col-reverse justify-center items-center md:flex-row md:justify-between w-full">
        <div className="w-[85px]"></div>
        <div>{currentYear} &copy; ponoyamoya.com</div>
        <div className="flex gap-2">
          <a
            href="https://www.instagram.com/pono.ya.moya"
            target="_blank"
            rel="noreferrer"
          >
            IG
          </a>
          {"|"}
          <a href="mailto:info@ponoyamoya.com">EMAIL</a>
        </div>
      </div>
    </footer>
  );
}
