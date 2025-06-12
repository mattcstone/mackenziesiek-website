import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initPerformanceOptimizations } from "./utils/performance";

// Initialize performance monitoring for SEO optimization
initPerformanceOptimizations();

// Force complete cache invalidation - NO BLOG FUNCTIONALITY - FINAL VERSION
const timestamp = Date.now();
const cacheBreaker = `NO_BLOG_FINAL_${timestamp}`;
console.log(`Loading app without blog functionality - v4.0.${cacheBreaker}`);

// Clear any existing cached data
if ('caches' in window) {
  caches.keys().then(names => {
    names.forEach(name => {
      caches.delete(name);
    });
  });
}

// Force cache reload for existing users
if (window.location.hostname === 'mackenziesiek.com') {
  localStorage.setItem('cache-cleared', 'v4.0-no-blog');
}

createRoot(document.getElementById("root")!).render(<App />);
