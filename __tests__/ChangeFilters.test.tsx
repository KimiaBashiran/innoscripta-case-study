import { configureStore } from '@reduxjs/toolkit';

import articleReducer, {
  changeFilters,
  SingleFilterProps,
} from '../src/store/features/articleSlice';

describe('articleSlice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        articles: articleReducer,
      },
    });
  });

  it('should add a new filter if it does not exist', () => {
    const newFilter: SingleFilterProps = {
      key: 'category',
      value: ['technology'],
    };

    // Dispatch the action to change filters
    store.dispatch(changeFilters(newFilter));

    // Get the updated state
    const state = store.getState().articles;

    // Assert that the new filter is in the state
    expect(state.filters).toContainEqual(newFilter);
  });

  it('should update an existing filter value', () => {
    const newFilter: SingleFilterProps = {
      key: 'category',
      value: ['business'],
    };

    // Add an existing filter first
    store.dispatch(changeFilters({ key: 'category', value: ['entertainment'] }));

    // Now update it with the new value
    store.dispatch(changeFilters(newFilter));

    // Get the updated state
    const state = store.getState().articles;

    // Assert that the filter has been updated
    expect(state.filters).toContainEqual(newFilter);
    expect(state.filters).not.toContainEqual({ key: 'category', value: ['sports'] });
  });

  it('should remove a filter if value is empty or undefined', () => {
    const filterToRemove: SingleFilterProps = {
      key: 'category',
      value: ['sports'],
    };

    // First add the filter
    store.dispatch(changeFilters(filterToRemove));

    // Now remove it by setting an empty value
    store.dispatch(changeFilters({ key: 'category', value: [] }));

    // Get the updated state
    const state = store.getState().articles;

    // Assert that the filter was removed
    expect(state.filters).not.toContainEqual(filterToRemove);
  });
});
