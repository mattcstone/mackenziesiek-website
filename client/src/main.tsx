import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initPerformanceOptimizations } from "./utils/performance";

// Initialize performance monitoring for SEO optimization
initPerformanceOptimizations();

// Force complete cache invalidation - NO BLOG FUNCTIONALITY
const timestamp = Date.now();
console.log(`Loading app without blog functionality - v3.0.${timestamp}`);

createRoot(document.getElementById("root")!).render(<App />);
