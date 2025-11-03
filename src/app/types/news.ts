import type { CATEGORIES } from "../consts";

export interface NewsArticle {
  uuid: string;
  title: string | TranslatedNewsArticleData;
  description: string | TranslatedNewsArticleData;
  keywords: string; // comma separated list
  snippet: string;
  url: string;
  image_url: string;
  language: string;
  published_at: string;
  source: string;
  categories: string[];
  locale: string;
  similar?: NewsArticle[];
  relevance_score?: number | null;
}

export interface TranslatedNewsArticleData {
  translated: string;
  parts: Array<TranslatedNewsArticlePart>;
}

export interface TranslatedNewsArticlePart {
  en: string | undefined;
  es: string;
}

export type NewsCategory = keyof typeof CATEGORIES;

export interface NewsHeadlinesResponse {
  data: NewsArticle[];
}
