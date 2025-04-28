// theme.js
'use client';
import { colors } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  
  components: {


    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-contained': {
            borderRadius: 40,
          },
          '&.Mui-disabled': {
            borderRadius: 40,
          }
          
          
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
   
      },
    }
    
  },



  palette: {
    primary: {
      main: '#212121',
      contrastText: '#fff',
    },
    
    secondary: {
      main: '#ff4081', // Un color secundario
    },
    // divider: '#ff4081',
    divider: '#ccc',
    // background: {
    //   default: '#88C200',
    // },

    
  },
});

export default theme;


// Tints of Violet Red #FF4081
// #FF4081 *
// #FF669A
// #FF85AE
// #FF9DBE
// #FFB1CB
// #FFC1D5
// #FFCDDD
// #FFD7E4
// #FFDFE9
// #FFE5ED
// White
