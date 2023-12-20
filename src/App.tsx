import { ThemeProvider } from "@mui/material/styles";
import { ThemeSettings } from "./theme/Theme.ts";
import { useRoutes } from "react-router-dom";
import Router from "./routes/Router.tsx";
import ScrollToTop from "./components/share/scrollToTop/ScrollToTop.tsx";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const App = (): JSX.Element => {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchIntervalInBackground: true,
        refetchOnMount: true,
        refetchInterval: 5000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ScrollToTop>{routing}</ScrollToTop>
      </ThemeProvider>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;
