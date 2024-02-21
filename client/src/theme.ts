'use client';

import { createTheme } from '@mui/material/styles';
// import { grey } from '@mui/material/colors';

// const poppins = Poppins({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
// });

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
  palette: {
    secondary: {
      main: "#000"
    }
  }
});

export default theme;

