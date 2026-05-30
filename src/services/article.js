import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RAPIDAPI_BASE_URL, RAPIDAPI_HOST, SUMMARY_LENGTH } from "../constants";

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: RAPIDAPI_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", rapidApiKey);
      headers.set("X-RapidAPI-Host", RAPIDAPI_HOST);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        `summarize?url=${encodeURIComponent(params.articleUrl)}&length=${SUMMARY_LENGTH}`,
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;
