import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const url = process.env.REACT_APP_PUBLIC_NEWS_API_URL || '';

const baseQuery = fetchBaseQuery({
  baseUrl: url,
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
  reducerPath: 'splitApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: [],
  endpoints: () => ({}),
});
