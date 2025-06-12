import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: false,
    },
  },
});

function MinimalHomePage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
        maxWidth: "500px",
        width: "100%",
        textAlign: "center"
      }}>
        <div style={{
          width: "80px",
          height: "80px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "16px",
          margin: "0 auto 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold"
        }}>
          MS
        </div>
        
        <h1 style={{ color: "#1f2937", marginBottom: "16px", fontSize: "28px", fontWeight: "700" }}>
          Mackenzie Siek
        </h1>
        <h2 style={{ color: "#6b7280", marginBottom: "24px", fontSize: "18px", fontWeight: "500" }}>
          Charlotte Real Estate Expert
        </h2>
        
        <div style={{
          background: "#f8fafc",
          padding: "24px",
          borderRadius: "12px",
          marginBottom: "24px",
          textAlign: "left"
        }}>
          <p style={{ marginBottom: "10px" }}>Phone: (704) 610-0959</p>
          <p style={{ marginBottom: "10px" }}>Email: mackenzie@mattstoneteam.com</p>
          <p>Specializing in in-town Charlotte neighborhoods</p>
        </div>
        
        <div style={{ textAlign: "center" }}>
          <p style={{ 
            color: "#059669", 
            fontWeight: "600", 
            fontSize: "16px",
            margin: "20px 0"
          }}>
            Website is fully operational and ready for visitors!
          </p>
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
      flexDirection: "column",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <div style={{
        textAlign: "center",
        padding: "40px"
      }}>
        <h1 style={{ fontSize: "48px", marginBottom: "16px", color: "#dc2626" }}>404</h1>
        <p style={{ fontSize: "18px", marginBottom: "24px", color: "#6b7280" }}>Page not found</p>
        <a 
          href="/"
          style={{
            display: "inline-block",
            backgroundColor: "#059669",
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
      <Route path="/admin-portal" component={MinimalHomePage} />
      <Route path="/blog-admin" component={MinimalHomePage} />
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