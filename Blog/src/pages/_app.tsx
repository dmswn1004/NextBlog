import '../styles/globals.css'
import { ThemeProvider } from 'next-themes';
import ThemeToggleButton from '../components/Mode';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute='class' themes={['light', 'dark']}>
      <ThemeToggleButton />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp
