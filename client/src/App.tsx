import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

function MinimalHomePage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", padding: "20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#111827", marginBottom: "20px" }}>
          Mackenzie Siek - Charlotte Realtor
        </h1>
        <p style={{ fontSize: "18px", color: "#6b7280", marginBottom: "30px" }}>
          Your trusted Charlotte real estate expert specializing in SouthEnd, NoDa, Dilworth & Fourth Ward properties.
        </p>
        <div style={{ 
          backgroundColor: "white", 
          padding: "30px", 
          borderRadius: "8px", 
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
          marginBottom: "20px"
        }}>
          <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "15px" }}>Contact Information</h2>
          <p style={{ marginBottom: "10px" }}>Phone: (704) 610-0959</p>
          <p style={{ marginBottom: "10px" }}>Email: mackenzie@mattstoneteam.com</p>
          <p>Specializing in in-town Charlotte neighborhoods</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <a 
            href="/admin"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/admin';
            }}
            style={{
              display: "inline-block",
              backgroundColor: "#2563eb",
              color: "white",
              padding: "12px 24px",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "500"
            }}
          >
            Admin Login
          </a>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: "#f9fafb"
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "bold", color: "#111827" }}>404</h1>
        <p style={{ fontSize: "18px", color: "#6b7280" }}>Page not found</p>
        <a 
          href="/" 
          style={{
            display: "inline-block",
            marginTop: "20px",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "12px 24px",
            textDecoration: "none",
            borderRadius: "6px"
          }}
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
      <Route path="/" component={MinimalHomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;