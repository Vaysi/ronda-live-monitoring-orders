import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#bdbdbd',
    },
    secondary: {
      main: '#ffc400',
      light: '#ffc400',
    },
    success: {
      main: '#43a047',
      light: '#43a047'
    },
  },
  direction: 'rtl',
  typography: {
    fontFamily: ['Vazir FD'].join(','),
    htmlFontSize:  17.5,
  },
});

export default theme;
