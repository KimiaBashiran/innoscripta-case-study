import { ArticlesResponse } from '../../types/articles';
import { api } from '../app/api';
import { SelectedFilters } from '../features/articleSlice';

const apiKey = process.env.REACT_APP_PUBLIC_NEWS_API_KEY || '';

export const generalEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllArticles: builder.query<ArticlesResponse, string[]>({
      query: (sources) => ({
        url: `top-headlines?sources=${sources.join(',')}&sortBy=publishedAt&apiKey=${apiKey}`,
      }),
      transformResponse: (response: ArticlesResponse) => response,
    }),
    getFilteredArticles: builder.query<ArticlesResponse, SelectedFilters & { page: number }>({
      query: ({ sources, category, q, dateFrom, dateTo, page }) => ({
        url: `everything?apiKey=${apiKey}
        ${sources?.length ? `&sources=${sources.join(',')}` : ''}
        ${category?.length ? `&domains=${category.join(',')}` : ''}
        ${q?.length ? `&q=${q}` : ''}
        ${dateFrom?.length ? `&from=${dateFrom}` : ''}
        ${dateTo?.length ? `&to=${dateTo}` : ''}
        ${page ? `&page=${page}` : ''}
        &sortBy=publishedAt`,
      }),
      transformResponse: (response: ArticlesResponse) => {
        return response;
      },
    }),
  }),
});

export const { useGetAllArticlesQuery, useGetFilteredArticlesQuery } = generalEndpoints;
