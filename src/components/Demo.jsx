import { useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import useArticleHistory from "../hooks/useArticleHistory";
import useTypingEffect from "../hooks/useTypingEffect";

const Demo = () => {
  const [copied, setCopied] = useState("");
  const { article, setArticle, allArticles, submitArticle, error, isFetching } =
    useArticleHistory();
  const { typedText, endRef } = useTypingEffect(article.summary);

  const handleCopy = (url) => {
    setCopied(url);
    navigator.clipboard.writeText(url);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={submitArticle}
        >
          <label htmlFor="article-url" className="sr-only">
            Article URL
          </label>
          <img
            src={linkIcon}
            alt=""
            aria-hidden="true"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            id="article-url"
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            required
            className="url_input peer"
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
            aria-label="Summarize article"
          >
            ↵
          </button>
        </form>

        {/* URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => setArticle(item)}
              onKeyDown={(e) => e.key === "Enter" && setArticle(item)}
              className="link_card"
              aria-label={`Load article: ${item.url}`}
            >
              <button
                type="button"
                className="copy_btn"
                aria-label="Copy URL"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(item.url);
                }}
              >
                <img
                  src={copied === item.url ? tick : copy}
                  alt=""
                  aria-hidden="true"
                  className="w-[40%] h-[40%] object-contain"
                />
              </button>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="Loading summary..." className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasn&apos;t supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-lg text-gray-700">
                  {typedText}
                </p>
              </div>
            </div>
          )
        )}
        <div ref={endRef} />
      </div>
    </section>
  );
};

export default Demo;
