import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generalEndpoints } from 'src/store/services/general-endpoints';
import { ArticlesResponse } from 'src/types/articles';

export const preChosenSources = ['new-york-magazine', 'bbc-news', 'abc-news'];

export interface SingleFilterProps {
  key: string;
  value: string[] | string | undefined;
}
export interface SelectedFilters {
  sources?: string[];
  category?: string[];
  q?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface ArticleStateProps {
  topHeadlines: ArticlesResponse | null;
  allArticles: ArticlesResponse | null;
  totalResults: number;
  page: number;
  collapseIndex?: string;
  filters: SingleFilterProps[];
  loading: boolean;
}

const initialState: ArticleStateProps = {
  topHeadlines: null,
  allArticles: null,
  totalResults: 0,
  page: 0,
  filters: [
    {
      key: 'sources',
      value: preChosenSources,
    },
  ],
  loading: false,
};
const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    changeFilters: (state, action: PayloadAction<SingleFilterProps>) => {
      const newFilters = action.payload;
      const filterIndex = state.filters.findIndex((item) => item.key === newFilters.key);
      if (filterIndex === -1) {
        state.filters.push({ key: newFilters.key, value: newFilters.value });
      } else {
        if (newFilters && newFilters.value && newFilters.value.length) {
          state.filters[filterIndex].value = newFilters.value;
        } else {
          state.filters = state.filters.filter((singleFilter) => {
            return singleFilter.key != newFilters.key;
          });
        }
      }
    },
    replaceFilter: (state, action: PayloadAction<SingleFilterProps>) => {
      const newValues = action.payload;
      const filterIndex = state.filters.findIndex((item) => item.key === newValues.key);
      if (newValues.value) {
        if (filterIndex === -1) {
          state.filters.push({ key: newValues.key, value: newValues.value });
        } else {
          state.filters[filterIndex].value = newValues.value;
        }
      } else {
        state.filters = state.filters.filter((singleFilter) => {
          return singleFilter.key != newValues.key;
        });
      }
    },
    clearAllFilters: (state) => {
      state.filters = [];
      state.page = 0;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setTotalResults: (state, action: PayloadAction<number>) => {
      state.totalResults = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      generalEndpoints.endpoints.getAllArticles.matchFulfilled,
      (state, { payload }) => {
        state.topHeadlines = payload;
        // state.totalResults = payload.totalResults;
      },
    );
    builder.addMatcher(
      generalEndpoints.endpoints.getFilteredArticles.matchFulfilled,
      (state, { payload }) => {
        state.allArticles = payload;
        // state.totalResults = payload.totalResults;
      },
    );
  },
});

export const {
  changeFilters,
  replaceFilter,
  clearAllFilters,
  setPage,
  setTotalResults,
  setLoading,
} = articleSlice.actions;

export default articleSlice.reducer;
