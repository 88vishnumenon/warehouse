
import './App.css';
import { ThemeProvider }  from '@material-ui/styles';
import customTheme from './assets/theme/custom-theme';
import Header from './components/header/header';
import Homepage from './components/homepage/homepage';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from './shared/error-boundary';
import { Provider } from 'react-redux';
import { store } from './store/store';
function App() {
  return (
    <Provider store={store}>
    <ErrorBoundary FallbackComponent={ErrorComponent}>
    <ThemeProvider theme={customTheme}>
      <Header></Header>
      <Homepage></Homepage>
    </ThemeProvider>
    </ErrorBoundary>
    </Provider>
  );
}

export default App;
