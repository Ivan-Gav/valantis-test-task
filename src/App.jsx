import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import CatalogPage from "./pages/CatalogPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CatalogPage />
    </QueryClientProvider>
  );
}

export default App;
