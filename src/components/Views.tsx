import React, { useEffect } from 'react';
import { Backdrop, CircularProgress, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'src/store/app/hooks';
import {
  preChosenSources,
  SelectedFilters,
  setLoading,
  setTotalResults,
  SingleFilterProps,
} from 'src/store/features/articleSlice';
import { useGetFilteredArticlesQuery } from 'src/store/services/general-endpoints';

import TableView from './table/TableView';

const Views = () => {
  const { allArticles, topHeadlines, filters, page, loading } = useAppSelector(
    (state) => state.article,
  );
  const [articles, setArticles] = React.useState(allArticles?.articles || []);
  const [selectedFilters, setSelectedFilters] = React.useState<SelectedFilters>({
    sources: preChosenSources,
  });
  const { data: filtersArticles } = useGetFilteredArticlesQuery({
    ...selectedFilters,
    page: page + 1,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    let finalFilters: SelectedFilters = {};
    dispatch(setLoading(true));

    if (!filters.length) {
      setArticles(topHeadlines.articles);
      dispatch(setTotalResults(topHeadlines.totalResults));
      dispatch(setLoading(false));
    }

    if (filters.length) {
      filters.map((singleFilter: SingleFilterProps) => {
        if (singleFilter.key) {
          finalFilters[singleFilter.key as keyof SelectedFilters] = singleFilter.value as any;
        }
      });

      setSelectedFilters(finalFilters);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filters]);

  useEffect(() => {
    setArticles(allArticles?.articles);
    dispatch(setTotalResults(allArticles?.totalResults));
    dispatch(setLoading(false));
  }, [allArticles, dispatch]);

  useEffect(() => {
    if (filters.length) {
      setArticles(filtersArticles?.articles || []);
      dispatch(setTotalResults(filtersArticles?.totalResults || 0));
      dispatch(setLoading(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersArticles]);

  return (
    <>
      <Paper
        sx={{
          position: 'relative',
          width: '100%',
          mx: 2,
        }}
      >
        <TableView articles={articles} />

        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Paper>
    </>
  );
};

export default Views;
