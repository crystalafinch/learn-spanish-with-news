import type { NewsArticle } from "../types/news";
import { TRANSLATED_ARTICLES } from "@/app/consts/translated-articles"; // TODO: Remove

export async function translateNews(articles: NewsArticle[]) {
  const translatedArticles: NewsArticle[] = structuredClone(articles);

  TRANSLATED_ARTICLES.forEach((translation: Partial<NewsArticle>) => {
    const article = translatedArticles.find((a) => a.uuid === translation.uuid);
    if (article) {
      Object.assign(article, translation);
    }
  });

  return translatedArticles;
}
