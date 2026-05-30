import { useState, useEffect } from "react";
import { useLazyGetSummaryQuery } from "../services/article";

import { ARTICLES_STORAGE_KEY as STORAGE_KEY } from "../constants";

const useArticleHistory = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });
  const [allArticles, setAllArticles] = useState([]);
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored) setAllArticles(stored);
  }, []);

  const submitArticle = async (e) => {
    e.preventDefault();
    try {
      const data = await getSummary(article.url).unwrap();
      if (!data?.summary) return;
      const newArticle = {
        ...article,
        summary: data.summary,
        id: crypto.randomUUID(),
      };
      const updated = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // error state is handled via the RTK Query error from useLazyGetSummaryQuery
    }
  };

  return {
    article,
    setArticle,
    allArticles,
    submitArticle,
    error,
    isFetching,
  };
};

export default useArticleHistory;
