import { Suspense } from "react";
import { fetchTopNews } from "@/app/services/news";
import type { NewsArticle, TranslatedNewsArticleData } from "@/app/types/news";
import NewsArticleParts from "../news-article-parts/NewsArticleParts";
import Image from "next/image";

function NewsArticleContent({
  data,
}: {
  data: TranslatedNewsArticleData | string;
}) {
  return typeof data === "string" ? data : <NewsArticleParts data={data} />;
}

function NewsArticleImage({ article }: { article: NewsArticle }) {
  if (!article.image_url) return null;
  return (
    <div className="relative h-20 w-30">
      <Image
        src={article.image_url}
        alt={
          typeof article.title === "string"
            ? article.title
            : article.title.translated
        }
        className="saturate-50 object-cover rounded"
        fill={true} // Image width and height are unknown
        sizes="(max-width: 768px) 5rem, (max-width: 1200px) 10rem, 5rem"
      />
    </div>
  );
}

export default async function NewsList() {
  let articles: NewsArticle[] | undefined;

  try {
    articles = await fetchTopNews();
  } catch (error) {
    console.error((error as Error).message);
    return <div>Error fetching news: {(error as Error).message}</div>;
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-8 py-6">
      <Suspense fallback={<div>Loading news…</div>}></Suspense>
      {articles?.map((a) => (
        <article
          key={a.url}
          className="border-border border-b break-inside-avoid mb-6 pb-4"
        >
          <NewsArticleImage article={a} />
          <h2 className="cursor-default text-xl font-bold leading-[1.1] mt-2">
            <NewsArticleContent data={a.title} />
          </h2>
          <div className="cursor-default mt-2">
            <NewsArticleContent data={a.description} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            <a href={a.url} target="_blank" rel="noopener noreferrer">
              Read more on {a.source}
            </a>
          </p>
        </article>
      ))}
    </div>
  );
}
