import { ReactElement } from "react";
import { NewsPage } from "./components/news.page";
import { FiltersProvider } from "./providers/filters-provider";

export function News(): ReactElement | null {
  return (
    <FiltersProvider>
      <NewsPage />
    </FiltersProvider>
  );
}

export default News;
