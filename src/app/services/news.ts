import type {
  NewsCategory,
  NewsHeadlinesResponse,
  TranslatedNewsArticle,
} from "../types/news";
import { getPublishedDateString } from "@/app/utils";
import { translateNews } from "./translate";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function fetchNewsFromDatabase({
  section,
}: {
  section: NewsCategory;
}): Promise<TranslatedNewsArticle[]> {
  const translatedArticles =
    await sql`SELECT * FROM articles WHERE section_id = ${section}`;

  const result = (translatedArticles || []).map((article) => {
    return {
      id: article.id,
      sectionId: article.section_id,
      sectionName: article.section_name,
      webPublicationDate: article.web_publication_date,
      webTitle: article.web_title,
      webUrl: article.web_url,
      headlineParts:
        typeof article.headline_parts === "string"
          ? JSON.parse(article.headline_parts)
          : article.headline_parts || [],
      trailTextParts:
        typeof article.trail_text_parts === "string"
          ? JSON.parse(article.trail_text_parts)
          : article.trail_text_parts || [],
      thumbnail: article.thumbnail,
    };
  });

  return result;
}

export async function fetchNews({
  section,
}: {
  section: NewsCategory;
}): Promise<TranslatedNewsArticle[]> {
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
  const translatedArticles = await translateNews(articles);

  return translatedArticles;
}
