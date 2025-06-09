import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initPerformanceOptimizations } from "./utils/performance";

// Initialize performance monitoring for SEO optimization
initPerformanceOptimizations();

createRoot(document.getElementById("root")!).render(<App />);
