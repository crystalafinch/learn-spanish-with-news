import type { NewsArticle } from "../types/news";
import { translateNews } from "@/app/services/translate";
import { ARTICLES } from "@/app/consts/articles";

export async function fetchTopNews(): Promise<NewsArticle[]> {
  const articles = ARTICLES;
  const translatedArticles = await translateNews(articles);
  return translatedArticles;
}
