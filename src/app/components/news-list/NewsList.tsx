import { Suspense } from "react";
import { fetchNewsFromDatabase } from "@/app/services/news";
import type { NewsCategory, TranslatedNewsArticle } from "@/app/types/news";
import NewsArticleParts from "../news-article-parts/NewsArticleParts";
import NewsArticleImage from "../news-article-image/NewsArticleImage";

export default async function NewsList({
  section,
}: {
  section?: NewsCategory | undefined;
}) {
  let articles: TranslatedNewsArticle[] | undefined;

  try {
    articles = await fetchNewsFromDatabase({ section: section || "world" });
  } catch (error) {
    console.error((error as Error).message);
    return <div>Error fetching news: {(error as Error).message}</div>;
  }

  return (
    <div className="columns-1 gap-8 py-6 sm:columns-2 md:columns-3 lg:columns-4">
      <Suspense fallback={<div>Loading news…</div>}>
        {articles?.map((a) => (
          <article
            key={a.webUrl}
            className="border-border mb-6 break-inside-avoid border-b pb-4"
          >
            <NewsArticleImage article={a} />
            <h2 className="mt-2 cursor-default text-xl leading-[1.1] font-bold">
              <NewsArticleParts data={a.headlineParts} />
            </h2>
            <div className="mt-2 cursor-default">
              <NewsArticleParts data={a.trailTextParts} />
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              <a href={a.webUrl} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </p>
          </article>
        ))}
      </Suspense>
    </div>
  );
}
