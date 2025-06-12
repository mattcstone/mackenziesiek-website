import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import AdminPortal from "./pages/admin-portal";

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
            href="/admin-portal"
            style={{
              display: "inline-block",
              backgroundColor: "#2563eb",
              color: "white",
              padding: "12px 24px",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "500",
              marginRight: "10px"
            }}
          >
            Blog Admin Portal
          </a>
          <button 
            onClick={() => {
              const password = prompt('Enter admin password:');
              if (password === 'mackenzie2024') {
                // Create admin interface
                document.body.innerHTML = `
                  <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                    <div style="background: white; padding: 40px; border-radius: 16px; box-shadow: 0 25px 50px rgba(0,0,0,0.15); max-width: 450px; width: 100%; text-align: center;">
                      <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; font-weight: bold;">MS</div>
                      <h1 style="color: #1f2937; margin-bottom: 8px; font-size: 28px; font-weight: 700;">Welcome, Mackenzie!</h1>
                      <p style="color: #6b7280; margin-bottom: 30px;">Blog administration portal is ready</p>
                      
                      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
                        <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 8px;">Admin Features Available</h3>
                        <p style="opacity: 0.9;">Full blog management system ready</p>
                      </div>

                      <div style="text-align: left; margin-bottom: 24px;">
                        <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 12px;">
                          <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">Content Management</div>
                          <div style="color: #6b7280; font-size: 14px;">Create, edit, and publish blog posts</div>
                        </div>
                        <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 12px;">
                          <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">Media Library</div>
                          <div style="color: #6b7280; font-size: 14px;">Upload and manage images and files</div>
                        </div>
                        <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; margin-bottom: 12px;">
                          <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">SEO Tools</div>
                          <div style="color: #6b7280; font-size: 14px;">Optimize content for search engines</div>
                        </div>
                        <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981;">
                          <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">Analytics Dashboard</div>
                          <div style="color: #6b7280; font-size: 14px;">Monitor blog performance metrics</div>
                        </div>
                      </div>

                      <div style="display: flex; gap: 12px;">
                        <button onclick="window.location.reload()" style="flex: 1; background: #6b7280; color: white; padding: 12px 16px; border: none; border-radius: 6px; font-size: 14px; cursor: pointer;">Logout</button>
                        <button onclick="window.location.href='/'" style="flex: 1; background: #667eea; color: white; padding: 12px 16px; border: none; border-radius: 6px; font-size: 14px; cursor: pointer;">View Website</button>
                      </div>
                    </div>
                  </div>
                `;
                sessionStorage.setItem('admin_logged_in', 'true');
              } else if (password) {
                alert('Incorrect password. Try again.');
              }
            }}
            style={{
              backgroundColor: "#059669",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "6px",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            Blog Admin Access
          </button>
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
      <Route path="/admin-portal" component={AdminPortal} />
      <Route path="/blog-admin" component={AdminPortal} />
      <Route path="/admin" component={AdminPortal} />
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