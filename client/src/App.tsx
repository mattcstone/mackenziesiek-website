import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import AgentPage from "@/pages/agent";
import SellPage from "@/pages/sell";
import ReviewsPage from "@/pages/reviews";
import MarketInsightsPage from "@/pages/market-insights";
import NeighborhoodsPage from "@/pages/neighborhoods";
import NeighborhoodPage from "@/pages/neighborhood";
import GuidePage from "@/pages/guide";
import ComparePage from "@/pages/compare";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: false,
    },
  },
});

// Set up default fetcher for all queries
queryClient.setQueryDefaults([], {
  queryFn: async ({ queryKey }) => {
    const url = queryKey[0] as string;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response.json();
  },
});

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <a 
          href="/" 
          className="bg-stone-600 text-white px-6 py-3 rounded-lg hover:bg-stone-700 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={AgentPage} />
      <Route path="/agent/:slug" component={AgentPage} />
      <Route path="/sell" component={SellPage} />
      <Route path="/reviews" component={ReviewsPage} />
      <Route path="/market-insights" component={MarketInsightsPage} />
      <Route path="/neighborhoods" component={NeighborhoodsPage} />
      <Route path="/neighborhoods/:slug" component={NeighborhoodPage} />
      <Route path="/guides/:slug" component={GuidePage} />
      <Route path="/compare" component={ComparePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;