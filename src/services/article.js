import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RAPIDAPI_BASE_URL, RAPIDAPI_HOST, SUMMARY_LANG } from "../constants";

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

const baseQuery = fetchBaseQuery({
  baseUrl: RAPIDAPI_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("X-RapidAPI-Key", rapidApiKey);
    headers.set("X-RapidAPI-Host", RAPIDAPI_HOST);
    return headers;
  },
});

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery,
  endpoints: (builder) => ({
    getSummary: builder.query({
      async queryFn(articleUrl, _api, _extraOptions, fetchWithBQ) {
        // Step 1: extract article text from URL
        const extractResult = await fetchWithBQ(
          `extract?url=${encodeURIComponent(articleUrl)}`
        );
        if (extractResult.error) return { error: extractResult.error };

        const text = extractResult.data?.md;
        if (!text) {
          return { error: { status: "CUSTOM_ERROR", error: "No article text found at that URL." } };
        }

        // Step 2: summarize the extracted text
        const summarizeResult = await fetchWithBQ({
          url: "summarize-text",
          method: "POST",
          body: { lang: SUMMARY_LANG, text },
        });
        if (summarizeResult.error) return { error: summarizeResult.error };

        return { data: { summary: summarizeResult.data?.summary } };
      },
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;
