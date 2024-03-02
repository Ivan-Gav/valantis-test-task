import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import CatalogPage from "./pages/CatalogPage";
import Footer from "./components/Footer/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CatalogPage />
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
