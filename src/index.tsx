import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { store } from 'src/store/app/store';

import News from './routes/News';
import theme from './theme';

import 'src/react-global.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

const router = createHashRouter([{ path: '/', element: <News /> }]);

root.render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </LocalizationProvider>
  </Provider>,
);
