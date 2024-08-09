import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import AuthContextProvider from "./contexts/AuthContextProvider.tsx";
import "@fontsource/abeezee";
import "@fontsource/hammersmith-one";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 60,
    },
  },
});

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        minHeight: "100vh",
        bg: "linear-gradient(to top, rgba(7,16,19,1), rgba(50,55,59,1))",
        backgroundRepeat: "no-repeat",
        color: "#E6E8E6",
      },
    }),
  },
  colors: {
    brand: {
      black: "#071013",
      "dark-gray": "#32373B",
      gray: "#555358",
      white: "#E6E8E6",
      yellow: "#FDCA40",
      red: "#DF2935",
      blue: "#3772FF",
    },
  },
  fonts: {
    heading: "'Hammersmith One', sans-serif",
    body: "'ABeeZee', sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
