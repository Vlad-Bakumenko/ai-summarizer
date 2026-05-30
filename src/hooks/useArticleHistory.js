import { useState, useEffect } from "react";
import { useLazyGetSummaryQuery } from "../services/article";

const STORAGE_KEY = "articles";

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
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = {
        ...article,
        summary: data.summary,
        id: crypto.randomUUID(),
      };
      const updated = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
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
