import { ThemeProvider }  from '@material-ui/styles';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ErrorBoundary } from 'react-error-boundary';

import customTheme from './assets/theme/custom-theme';
import Header from './components/header/header';
import Homepage from './components/homepage/homepage';
import ErrorComponent from './shared/error-boundary';
import './App.css';

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
