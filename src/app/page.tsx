import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
import NewsList from "@components/news-list/NewsList";

export default function Home() {
  return (
    <div className="container grid grid-rows-[auto_1fr_auto] md:min-h-screen min-h-dvh max-w-6xl">
      <Header />
      <main>
        <NewsList />
      </main>
      <Footer />
    </div>
  );
}
