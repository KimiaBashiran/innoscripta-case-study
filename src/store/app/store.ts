import { Action, configureStore, ConfigureStoreOptions, ThunkAction } from '@reduxjs/toolkit';
import { api } from 'src/store/app/api';
import articleSlice from 'src/store/features/articleSlice';

export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,

      article: articleSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
