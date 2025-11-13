import { neon } from "@neondatabase/serverless";
import { CATEGORIES } from "@/app/consts";
import { fetchNews } from "@/app/services/news";
import { NewsCategory } from "@/app/types/news";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const sections = Object.keys(CATEGORIES) as NewsCategory[];
    const translatedArticles = [];

    // Fetch news for each section
    for (const section of sections) {
      const translatedSectionArticles = await fetchNews({ section });
      translatedArticles.push(...translatedSectionArticles);
    }

    // Insert translated articles into the database
    for (const article of translatedArticles) {
      const headlineData = article.headlineParts.map((part) => ({
        en: part.en,
        es: part.es,
      }));
      const trailData = article.trailTextParts.map((part) => ({
        en: part.en,
        es: part.es,
      }));

      await sql`
        INSERT INTO articles (
          id, section_id, section_name, 
          web_publication_date, web_title, web_url,
          headline_parts, trail_text_parts, 
          thumbnail
        )
        VALUES (
          ${article.id}, ${article.sectionId}, ${article.sectionName},
          ${article.webPublicationDate}, ${article.webTitle}, ${article.webUrl},
          ${JSON.stringify(headlineData)}, ${JSON.stringify(trailData)},
          ${article.thumbnail ?? null}
        )
        ON CONFLICT (id) DO UPDATE SET
          headline_parts = EXCLUDED.headline_parts,
          trail_text_parts = EXCLUDED.trail_text_parts,
          updated_at = NOW();
      `;
    }

    return Response.json({ ok: true });
  } catch (err: unknown) {
    console.error(err);
    return new Response((err as Error).message ?? "Unknown error", {
      status: 500,
    });
  }
}
