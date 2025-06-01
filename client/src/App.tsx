import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import AgentPage from "@/pages/agent";
import NeighborhoodPage from "@/pages/neighborhood";
import GuidePage from "@/pages/guide";
import SellPage from "@/pages/sell";
import ComparePage from "@/pages/compare";
import ReviewsPage from "@/pages/reviews";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AgentPage} />
      <Route path="/agent/:slug" component={AgentPage} />
      <Route path="/neighborhood/:slug" component={NeighborhoodPage} />
      <Route path="/guide/:slug" component={GuidePage} />
      <Route path="/sell" component={SellPage} />
      <Route path="/compare" component={ComparePage} />
      <Route path="/reviews" component={ReviewsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
