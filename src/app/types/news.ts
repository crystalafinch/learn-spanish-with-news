import type { CATEGORIES } from "../consts";

export interface NewsArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
  fields: {
    headline: string | TranslatedNewsArticleData;
    trailText: string | TranslatedNewsArticleData;
    thumbnail?: string;
  };
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
  response: {
    results: NewsArticle[];
  };
}
