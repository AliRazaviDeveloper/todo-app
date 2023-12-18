import { CssBaseline, ThemeProvider } from "@mui/material";
import { ThemeSettings } from "./theme/Theme.ts";
import { useRoutes } from "react-router-dom";
import Router from "./routes/Router.tsx";
import ScrollToTop from "./components/share/scrollToTop/ScrollToTop.tsx";

const App = (): JSX.Element => {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop>{routing}</ScrollToTop>
    </ThemeProvider>
  );
};
export default App;
