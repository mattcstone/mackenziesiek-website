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
          <button 
            onClick={() => {
              const password = prompt('🔐 Blog Admin Access\n\nEnter admin password:');
              if (password === 'mackenzie2024') {
                // Create fullscreen admin interface
                const adminPortal = document.createElement('div');
                adminPortal.id = 'adminPortal';
                adminPortal.innerHTML = `
                  <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; z-index: 10000;">
                    <div style="background: white; padding: 50px; border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.2); max-width: 500px; width: 100%; text-align: center; position: relative;">
                      <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">MS</div>
                      
                      <h1 style="color: #1f2937; margin-bottom: 12px; font-size: 32px; font-weight: 700;">Welcome Back, Mackenzie!</h1>
                      <p style="color: #6b7280; margin-bottom: 36px; font-size: 16px;">Blog administration portal is now active</p>
                      
                      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 28px; border-radius: 16px; margin-bottom: 32px;">
                        <h3 style="font-size: 22px; font-weight: bold; margin-bottom: 8px;">✅ Admin Access Granted</h3>
                        <p style="opacity: 0.95; font-size: 15px;">Full blog management capabilities enabled</p>
                      </div>

                      <div style="text-align: left; margin-bottom: 32px;">
                        <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #10b981; margin-bottom: 16px;">
                          <div style="font-weight: 600; color: #1f2937; margin-bottom: 6px; font-size: 16px;">📝 Content Management</div>
                          <div style="color: #6b7280; font-size: 14px;">Create, edit, and publish blog posts with rich editor</div>
                        </div>
                        <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #10b981; margin-bottom: 16px;">
                          <div style="font-weight: 600; color: #1f2937; margin-bottom: 6px; font-size: 16px;">🖼️ Media Library</div>
                          <div style="color: #6b7280; font-size: 14px;">Upload and organize images, documents, and media files</div>
                        </div>
                        <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #10b981; margin-bottom: 16px;">
                          <div style="font-weight: 600; color: #1f2937; margin-bottom: 6px; font-size: 16px;">🔍 SEO Optimization</div>
                          <div style="color: #6b7280; font-size: 14px;">Optimize content for search engines and social media</div>
                        </div>
                        <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #10b981;">
                          <div style="font-weight: 600; color: #1f2937; margin-bottom: 6px; font-size: 16px;">📊 Analytics Dashboard</div>
                          <div style="color: #6b7280; font-size: 14px;">Monitor blog performance and visitor engagement</div>
                        </div>
                      </div>

                      <div style="display: flex; gap: 16px;">
                        <button onclick="document.getElementById('adminPortal').remove(); sessionStorage.removeItem('admin_active');" style="flex: 1; background: #6b7280; color: white; padding: 14px 20px; border: none; border-radius: 8px; font-size: 15px; font-weight: 500; cursor: pointer; transition: all 0.2s;">Logout & Return</button>
                        <button onclick="window.open('/', '_blank');" style="flex: 1; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 20px; border: none; border-radius: 8px; font-size: 15px; font-weight: 500; cursor: pointer; transition: all 0.2s;">View Website</button>
                      </div>
                      
                      <div style="position: absolute; top: 20px; right: 20px;">
                        <button onclick="document.getElementById('adminPortal').remove();" style="background: rgba(255,255,255,0.2); color: #666; border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; font-size: 18px;">×</button>
                      </div>
                    </div>
                  </div>
                `;
                document.body.appendChild(adminPortal);
                sessionStorage.setItem('admin_active', 'true');
                sessionStorage.setItem('admin_timestamp', new Date().toISOString());
              } else if (password) {
                alert('❌ Incorrect password. Please try again.');
              }
            }}
            style={{
              backgroundColor: "#059669",
              color: "white",
              padding: "16px 32px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "16px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#047857"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#059669"}
          >
            🔐 Blog Admin Access
          </button>
          <div style={{ marginTop: "16px" }}>
            <a 
              href="/admin-access"
              style={{
                display: "inline-block",
                backgroundColor: "#7c3aed",
                color: "white",
                padding: "12px 24px",
                textDecoration: "none",
                borderRadius: "6px",
                fontWeight: "500",
                fontSize: "14px",
                border: "2px solid #7c3aed"
              }}
            >
              Direct Admin Portal →
            </a>
          </div>
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