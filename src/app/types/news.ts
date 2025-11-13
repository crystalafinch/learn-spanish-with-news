import type { CATEGORIES } from "../consts";

// Guardian API response
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
    headline: string;
    trailText: string;
    thumbnail?: string;
  };
}

// Translated news article stored in the database
export interface TranslatedNewsArticle {
  id: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  headlineParts: Array<TranslatedNewsArticlePart>;
  trailTextParts: Array<TranslatedNewsArticlePart>;
  thumbnail?: string;
}

export interface TranslatedNewsArticlePart {
  en: string;
  es: string;
}

export type NewsCategory = keyof typeof CATEGORIES;

export interface NewsHeadlinesResponse {
  response: {
    results: NewsArticle[];
  };
}
