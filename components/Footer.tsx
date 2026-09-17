import FlowerBlue from "@/icons/flower-blue";
import { SiteSettings } from "@/lib/sanity/types/index";

export default function Footer({
  settings,
}: {
  settings: SiteSettings | null;
}) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col items-center w-full justify-center gap-2 p-4">
      <FlowerBlue className="w-20 h-20 opacity-30" />
      <div className="flex flex-col gap-2 justify-center items-center w-full">
        {/* <div className="flex gap-2">
          <a
            href="https://www.instagram.com/moyabyssal"
            target="_blank"
            rel="noreferrer"
          >
            IG
          </a>
          {"•"}
          <a href="mailto:info@moyabyssal.com">EMAIL</a>
        </div> */}
        <div>{currentYear} &copy; moyabyssal.com</div>
      </div>
    </footer>
  );
}
