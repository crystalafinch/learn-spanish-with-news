import React, { createContext, useContext, useState } from "react";
import type { NewsArticle } from "../types/news";

interface NewsContextType {
  articles: NewsArticle[];
  setArticles: (articles: NewsArticle[]) => void;
}

export const NewsContext = createContext<NewsContextType | null>(null);

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
};

export const NewsProvider = ({ children }: { children: React.ReactNode }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  return (
    <NewsContext.Provider value={{ articles, setArticles }}>
      {children}
    </NewsContext.Provider>
  );
};

export default NewsProvider;
