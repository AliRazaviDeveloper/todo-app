import { ThemeProvider } from "@mui/material/styles";
import { ThemeSettings } from "./theme/Theme.ts";
import { useRoutes } from "react-router-dom";
import Router from "./routes/Router.tsx";
import ScrollToTop from "./components/share/scrollToTop/ScrollToTop.tsx";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const App = (): JSX.Element => {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ScrollToTop>{routing}</ScrollToTop>
      </ThemeProvider>
      <Toaster />
    </QueryClientProvider>
  );
};
export default App;
