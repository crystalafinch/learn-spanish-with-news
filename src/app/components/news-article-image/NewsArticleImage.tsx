import { TranslatedNewsArticle } from "@/app/types/news";
import Image from "next/image";

export default function NewsArticleImage({
  article,
}: {
  article: TranslatedNewsArticle;
}) {
  if (!article.thumbnail) return null;
  return (
    <div className="relative h-20 w-30">
      <Image
        src={article.thumbnail}
        alt={article.headlineParts.map((part) => part.es).join(" ")}
        className="rounded object-cover saturate-50"
        fill={true} // Image width and height are unknown
        sizes="(max-width: 768px) 5rem, (max-width: 1200px) 10rem, 5rem"
      />
    </div>
  );
}
