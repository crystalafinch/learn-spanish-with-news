import type { Metadata } from "next";
import { Pirata_One, Newsreader } from "next/font/google";
import "./globals.css";

const pirataOne = Pirata_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pirata-one",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: "Aprende con Noticias - Learn Spanish with News",
  description: "Learn Spanish with news articles from around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${pirataOne.variable} ${newsreader.variable} antialiased flex flex-col min-w-[320px] min-h-screen place-items-center w-full`}
        translate="no"
      >
        {children}
      </body>
    </html>
  );
}
