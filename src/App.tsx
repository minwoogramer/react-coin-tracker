import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import Router from "./Router";
import GlobalStyle from "./styled/GlobalStyle";
import { theme } from './styled/theme';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Router></Router>
          <GlobalStyle></GlobalStyle>
          <ReactQueryDevtools></ReactQueryDevtools>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
