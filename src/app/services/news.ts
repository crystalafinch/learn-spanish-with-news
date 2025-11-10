import type {
  NewsArticle,
  NewsCategory,
  NewsHeadlinesResponse,
} from "../types/news";
import { getPublishedDateString } from "@/app/utils";
// import { translateNews } from "./translate";

export async function fetchTopNews({
  section,
}: {
  section: NewsCategory;
}): Promise<NewsArticle[]> {
  const baseUrl = "https://content.guardianapis.com";
  const requestUrl = `${baseUrl}/search`;

  const params = new URLSearchParams({
    "api-key": process.env.NEWS_API_KEY!,
    "show-fields": "headline,trailText,thumbnail",
    "from-date": getPublishedDateString(),
    section: section,
  });

  const url = `${requestUrl}?${params.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`News API Error: ${res.statusText}`);
  }

  const json: NewsHeadlinesResponse = await res.json();
  const articles = json.response.results;
  // const translatedArticles = translateNews(articles);
  // return translatedArticles;

  return articles;
}
