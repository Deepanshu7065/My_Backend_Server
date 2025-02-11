import { createTheme } from '@mui/material/styles';

const createThemeI = createTheme({
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: { fontSize: '2.5rem', fontWeight: 700, fontFamily: "'Pacifico', cursive" },
    h2: { fontSize: '2rem', fontWeight: 600, fontFamily: "'Dancing Script', cursive" },
    h3: { fontSize: '1.75rem', fontWeight: 500 },
    body1: { fontSize: '1rem', fontWeight: 400 },
    button: { textTransform: 'none', fontWeight: 600 }
  }
});

export default createThemeI;