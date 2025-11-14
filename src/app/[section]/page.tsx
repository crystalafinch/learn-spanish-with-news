import NewsList from "../components/news-list/NewsList";
import { NewsCategory } from "../types/news";

export default async function Page({
  params,
}: {
  params: { section: string };
}) {
  const { section } = await params;
  return <NewsList section={section as NewsCategory} />;
}
