import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initPerformanceOptimizations } from "./utils/performance";

// Initialize performance monitoring for SEO optimization
initPerformanceOptimizations();

// Force cache clear - NO BLOG FUNCTIONALITY
console.log("Loading app without blog functionality - v2.0.1");

createRoot(document.getElementById("root")!).render(<App />);
