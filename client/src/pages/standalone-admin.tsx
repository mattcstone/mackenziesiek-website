import { useState, useEffect } from "react";

export default function StandaloneAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Check authentication on load
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("admin_logged_in");
    if (isLoggedIn === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    if (password === "mackenzie2024") {
      sessionStorage.setItem("admin_logged_in", "true");
      setIsAuthenticated(true);
    } else {
      setLoginError("Incorrect password. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_logged_in");
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        backgroundColor: "#f9fafb", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "32px",
            height: "32px",
            border: "2px solid #e5e7eb",
            borderTop: "2px solid #2563eb",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px"
          }}></div>
          <p style={{ color: "#6b7280" }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        backgroundColor: "#f9fafb", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        padding: "16px"
      }}>
        <div style={{
          backgroundColor: "white",
          padding: "32px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px"
        }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <h1 style={{ 
              fontSize: "24px", 
              fontWeight: "bold", 
              color: "#111827",
              margin: "0 0 8px 0"
            }}>
              Admin Login
            </h1>
            <p style={{ color: "#6b7280", margin: 0 }}>
              Enter password to manage your blog
            </p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "16px" }}>
              <label 
                htmlFor="password" 
                style={{ 
                  display: "block", 
                  fontSize: "14px", 
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "8px"
                }}
              >
                Admin Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "16px",
                  boxSizing: "border-box"
                }}
                required
              />
            </div>

            {loginError && (
              <div style={{ 
                color: "#dc2626", 
                fontSize: "14px", 
                marginBottom: "16px" 
              }}>
                {loginError}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#2563eb",
                color: "white",
                padding: "12px",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer"
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#f9fafb", 
      padding: "16px" 
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "24px" 
        }}>
          <h1 style={{ 
            fontSize: "30px", 
            fontWeight: "bold", 
            color: "#111827",
            margin: 0
          }}>
            Blog Admin
          </h1>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "white",
              color: "#374151",
              padding: "8px 16px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "14px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
        
        <div style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
        }}>
          <h2 style={{ 
            fontSize: "20px", 
            fontWeight: "600", 
            color: "#111827",
            margin: "0 0 16px 0"
          }}>
            Welcome to the Admin Panel
          </h2>
          <p style={{ color: "#6b7280", marginBottom: "16px" }}>
            You are successfully logged in to the blog administration system.
          </p>
          <p style={{ 
            fontSize: "14px", 
            color: "#9ca3af",
            margin: 0
          }}>
            Full blog management features will be available once the React component issues are resolved.
          </p>
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}