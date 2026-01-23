import "./globals.css";
import Header from "./components/Header";
import FooterWrapper from "./components/FooterWrapper";

export const metadata = {
  title: "Ponoyamoya",
  description: "Artist & Healer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" data-scroll-behavior="smooth">
      <body className="bg-white text-gray-900 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <FooterWrapper />
      </body>
    </html>
  );
}
