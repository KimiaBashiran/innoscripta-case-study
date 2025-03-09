import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// A custom theme for this app
let theme = createTheme({
  palette: {
    primary: {
      main: '#0ddd86',
    },
  },
  typography: {
    fontFamily: ['Lato', 'Roboto', 'Arial', 'sans-serif'].join(','),
  },
});
theme = responsiveFontSizes(theme, { factor: 10 });

export default theme;
