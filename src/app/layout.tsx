import type { Metadata } from "next";
import { Pirata_One, Newsreader } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

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
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${pirataOne.variable} ${newsreader.variable} bg-background flex min-h-screen w-full min-w-[320px] flex-col place-items-center antialiased`}
        translate="no"
      >
        <ThemeProvider attribute="class">
          <div className="container grid min-h-dvh max-w-6xl grid-rows-[auto_1fr_auto] md:min-h-screen">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
