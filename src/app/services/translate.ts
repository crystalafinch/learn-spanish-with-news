import OpenAI from "openai";
import type { NewsArticle, TranslatedNewsArticle } from "../types/news";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  dangerouslyAllowBrowser: process.env.NODE_ENV === "development",
  maxRetries: 0,
});

export async function translateNews(
  articles: NewsArticle[],
): Promise<TranslatedNewsArticle[]> {
  const translatedArticles: TranslatedNewsArticle[] = [];
  const articlesData = articles.map((a) => ({
    id: a.id,
    headline: a.fields.headline,
    trailText: a.fields.trailText,
  }));

  const prompt = `
    Translate these Spanish news headlines and descriptions into simple Spanish (A1–A2). 
    Keep UUIDs unchanged and avoid complex phrases or idioms.
    
    ${JSON.stringify(articlesData, null, 2)}
    
    Then, break each translated title and description into parts (single words or short phrases). 
    Each part must have both English and Spanish values. 
    If a part is a name or acronym, set "es" to the original value (don't guess).

    Example of parts:
    "El presidente de España se reunió con líderes locales en Madrid."
    Parts:
    [
      { "en": "The president of Spain", "es": "El presidente de España" },
      { "en": "met with local leaders", "es": "se reunió con líderes locales" },
      { "en": "in Madrid", "es": "en Madrid" }
    ]

    Respond **only** with a top-level JSON array called "result", no extra text:
    result: [
      {
        "id": string,
        "headlineParts": Array<{ "en": string; "es": string }>,
        "trailTextParts": Array<{ "en": string; "es": string }>,
      }
    ]
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.1,
  });

  const translations = JSON.parse(
    response.choices[0].message?.content?.trim() || "[]",
  );

  translations.result.forEach((translation: Partial<TranslatedNewsArticle>) => {
    const article = articles.find((a) => a.id === translation.id);
    if (article) {
      translatedArticles.push({
        id: article.id,
        sectionId: article.sectionId,
        sectionName: article.sectionName,
        webPublicationDate: article.webPublicationDate,
        webTitle: article.webTitle,
        webUrl: article.webUrl,
        headlineParts: translation.headlineParts || [],
        trailTextParts: translation.trailTextParts || [],
        thumbnail: article.fields.thumbnail,
      });
    }
  });

  return translatedArticles;
}
