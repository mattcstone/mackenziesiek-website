import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Accessibility components removed to fix crashes
import NotFound from "@/pages/not-found";
import AgentPage from "@/pages/agent";
import NeighborhoodPage from "@/pages/neighborhood";
import NeighborhoodsPage from "@/pages/neighborhoods";
import GuidePage from "@/pages/guide";
import SellPage from "@/pages/sell";
import ComparePage from "@/pages/compare";
import ReviewsPage from "@/pages/reviews";
import DataPage from "@/pages/data";
import MarketAnalyticsPage from "@/pages/market-analytics";
import MarketTrendsPage from "@/pages/market-trends";
import MarketInsightsPage from "@/pages/market-insights";
import BlogPage from "@/pages/blog";
import BlogPostPage from "@/pages/blog-post";
import SimpleAdminPage from "@/pages/simple-admin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AgentPage} />
      <Route path="/agent/:slug" component={AgentPage} />
      <Route path="/neighborhoods" component={NeighborhoodsPage} />
      <Route path="/neighborhood/:slug" component={NeighborhoodPage} />
      <Route path="/guide/:slug" component={GuidePage} />
      <Route path="/sell" component={SellPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route path="/admin" component={SimpleAdminPage} />
      <Route path="/data" component={DataPage} />
      <Route path="/market-analytics" component={MarketAnalyticsPage} />
      <Route path="/market-trends" component={MarketTrendsPage} />
      <Route path="/market-insights" component={MarketInsightsPage} />
      <Route path="/reviews" component={ReviewsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <Router />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
