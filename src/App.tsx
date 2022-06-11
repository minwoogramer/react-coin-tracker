import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import styled, { ThemeProvider } from "styled-components";
import Router from "./Router";
import { Container } from "./styled/Container";
import GlobalStyle from "./styled/GlobalStyle";
import { darkTheme, lightTheme } from './styled/theme';
import { faLightbulb, faMoon } from "@fortawesome/free-solid-svg-icons";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const FloatingButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 20px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.textColor};
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => (props.theme.name === "light") ? darkTheme.accentColor : lightTheme.accentColor};
  }
`;

function App() {
  const [theme, setTheme] = useState(lightTheme);

  const onClickDarkModeButton = () => {
    setTheme((theme) => theme.name === "light" ? darkTheme : lightTheme);
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <Container>
              <Router/>
            </Container>
            <FloatingButton onClick={onClickDarkModeButton}>
              <FontAwesomeIcon icon={theme.name === "light" ? faMoon : faLightbulb}/>
            </FloatingButton>
            <ReactQueryDevtools/>
          </ThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
