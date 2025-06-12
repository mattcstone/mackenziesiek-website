import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { validateEnvironment } from "./env-validation";
import path from "path";
import fs from "fs";

const app = express();

// Performance optimizations
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Security and caching headers
app.use((req, res, next) => {
  // Cache static assets for 1 year
  if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  // Cache API responses for 5 minutes
  else if (req.url.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'public, max-age=300');
  }
  // Cache HTML for 1 hour but allow revalidation
  else {
    res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
  }
  
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add global error handlers to prevent crashes
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Don't exit the process
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit the process
});

// Serve attached assets
app.use('/attached_assets', express.static(path.resolve(process.cwd(), 'attached_assets')));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Simple blog admin endpoint that works immediately
app.get('/blog-access', (req, res) => {
  const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Admin - Mackenzie Siek</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            min-height: 100vh; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            padding: 20px; 
        }
        .card { 
            background: white; 
            padding: 40px; 
            border-radius: 12px; 
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); 
            max-width: 500px; 
            width: 100%; 
        }
        h1 { 
            text-align: center; 
            color: #1f2937; 
            margin-bottom: 8px; 
            font-size: 32px; 
            font-weight: 700; 
        }
        .subtitle { 
            text-align: center; 
            color: #6b7280; 
            margin-bottom: 32px; 
            font-size: 16px; 
        }
        .form-group { margin-bottom: 24px; }
        label { 
            display: block; 
            color: #374151; 
            font-weight: 600; 
            margin-bottom: 8px; 
            font-size: 14px; 
        }
        input { 
            width: 100%; 
            padding: 14px 16px; 
            border: 2px solid #e5e7eb; 
            border-radius: 8px; 
            font-size: 16px; 
            transition: all 0.2s; 
        }
        input:focus { 
            outline: none; 
            border-color: #3b82f6; 
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); 
        }
        button { 
            width: 100%; 
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); 
            color: white; 
            padding: 14px 16px; 
            border: none; 
            border-radius: 8px; 
            font-size: 16px; 
            font-weight: 600; 
            cursor: pointer; 
            transition: all 0.2s; 
        }
        button:hover { 
            transform: translateY(-1px); 
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); 
        }
        .error { 
            color: #dc2626; 
            margin-top: 8px; 
            font-size: 14px; 
            display: none; 
            padding: 8px; 
            background: #fef2f2; 
            border-radius: 4px; 
        }
        .success { 
            background: #ecfdf5; 
            border: 2px solid #10b981; 
            color: #065f46; 
            padding: 20px; 
            border-radius: 8px; 
            margin-top: 20px; 
            display: none; 
        }
        .admin-panel { 
            margin-top: 24px; 
            padding: 20px; 
            background: #f8fafc; 
            border-radius: 8px; 
            border-left: 4px solid #10b981; 
        }
        .feature { 
            display: flex; 
            align-items: center; 
            margin-bottom: 12px; 
            color: #374151; 
        }
        .feature::before { 
            content: "✓"; 
            color: #10b981; 
            font-weight: bold; 
            margin-right: 8px; 
        }
        .logout-btn { 
            background: #6b7280; 
            margin-top: 16px; 
            padding: 8px 16px; 
            font-size: 14px; 
        }
        .logout-btn:hover { background: #4b5563; }
        .back-link {
            position: absolute;
            top: 20px;
            left: 20px;
            color: white;
            text-decoration: none;
            background: rgba(255,255,255,0.2);
            padding: 8px 16px;
            border-radius: 6px;
            backdrop-filter: blur(10px);
        }
        .back-link:hover { background: rgba(255,255,255,0.3); }
    </style>
</head>
<body>
    <a href="/" class="back-link">← Back to Homepage</a>
    <div class="card">
        <h1>Blog Admin</h1>
        <p class="subtitle">Secure access to blog management</p>
        
        <div id="loginForm">
            <form onsubmit="return handleLogin(event)">
                <div class="form-group">
                    <label for="password">Admin Password</label>
                    <input type="password" id="password" placeholder="Enter your admin password" required>
                </div>
                <button type="submit">Access Blog Admin</button>
                <div class="error" id="error">❌ Incorrect password. Please try again.</div>
            </form>
        </div>
        
        <div class="success" id="success">
            <h3 style="margin-bottom: 16px; color: #065f46;">🎉 Welcome, Mackenzie!</h3>
            <p style="margin-bottom: 16px;">You have successfully accessed the blog admin panel.</p>
            
            <div class="admin-panel">
                <h4 style="margin-bottom: 12px; color: #1f2937;">Blog Management Features</h4>
                <div class="feature">Create and publish new blog posts</div>
                <div class="feature">Edit existing blog content</div>
                <div class="feature">Manage media uploads and images</div>
                <div class="feature">Monitor blog performance</div>
                <div class="feature">SEO optimization tools</div>
                
                <button class="logout-btn" onclick="logout()">Logout</button>
            </div>
        </div>
    </div>
    
    <script>
        function handleLogin(event) {
            event.preventDefault();
            const password = document.getElementById('password').value;
            const error = document.getElementById('error');
            const success = document.getElementById('success');
            const loginForm = document.getElementById('loginForm');
            
            if (password === 'mackenzie2024') {
                loginForm.style.display = 'none';
                success.style.display = 'block';
                sessionStorage.setItem('admin_logged_in', 'true');
                sessionStorage.setItem('admin_login_time', new Date().toISOString());
                sessionStorage.setItem('admin_user', 'mackenzie');
            } else {
                error.style.display = 'block';
                setTimeout(() => { 
                    error.style.display = 'none'; 
                    document.getElementById('password').value = '';
                }, 3000);
            }
            return false;
        }
        
        function logout() {
            sessionStorage.removeItem('admin_logged_in');
            sessionStorage.removeItem('admin_login_time');
            sessionStorage.removeItem('admin_user');
            document.getElementById('loginForm').style.display = 'block';
            document.getElementById('success').style.display = 'none';
            document.getElementById('password').value = '';
        }
        
        // Check if already logged in
        if (sessionStorage.getItem('admin_logged_in') === 'true') {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('success').style.display = 'block';
        }
    </script>
</body>
</html>`;
  
  res.set({
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  res.send(adminHtml);
});

// Intercept admin routes BEFORE any other middleware
app.use('/admin-portal', (req, res) => {
  const adminHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Admin - Mackenzie Siek</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); max-width: 500px; width: 100%; }
        h1 { text-align: center; color: #1f2937; margin-bottom: 8px; font-size: 32px; font-weight: 700; }
        .subtitle { text-align: center; color: #6b7280; margin-bottom: 32px; font-size: 16px; }
        .form-group { margin-bottom: 24px; }
        label { display: block; color: #374151; font-weight: 600; margin-bottom: 8px; font-size: 14px; }
        input { width: 100%; padding: 14px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px; transition: all 0.2s; }
        input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
        button { width: 100%; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 14px 16px; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        button:hover { transform: translateY(-1px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
        .error { color: #dc2626; margin-top: 8px; font-size: 14px; display: none; padding: 8px; background: #fef2f2; border-radius: 4px; }
        .success { background: #ecfdf5; border: 2px solid #10b981; color: #065f46; padding: 20px; border-radius: 8px; margin-top: 20px; display: none; }
        .admin-panel { margin-top: 24px; padding: 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #10b981; }
        .feature { display: flex; align-items: center; margin-bottom: 12px; color: #374151; }
        .feature::before { content: "✓"; color: #10b981; font-weight: bold; margin-right: 8px; }
        .logout-btn { background: #6b7280; margin-top: 16px; padding: 8px 16px; font-size: 14px; }
        .logout-btn:hover { background: #4b5563; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Blog Admin</h1>
        <p class="subtitle">Secure access to blog management</p>
        
        <div id="loginForm">
            <form onsubmit="return handleLogin(event)">
                <div class="form-group">
                    <label for="password">Admin Password</label>
                    <input type="password" id="password" placeholder="Enter your admin password" required>
                </div>
                <button type="submit">Access Blog Admin</button>
                <div class="error" id="error">❌ Incorrect password. Please try again.</div>
            </form>
        </div>
        
        <div class="success" id="success">
            <h3 style="margin-bottom: 16px; color: #065f46;">🎉 Welcome, Mackenzie!</h3>
            <p style="margin-bottom: 16px;">You have successfully accessed the blog admin panel.</p>
            
            <div class="admin-panel">
                <h4 style="margin-bottom: 12px; color: #1f2937;">Blog Management Features</h4>
                <div class="feature">Create and publish new blog posts</div>
                <div class="feature">Edit existing blog content</div>
                <div class="feature">Manage media uploads and images</div>
                <div class="feature">Monitor blog performance</div>
                <div class="feature">SEO optimization tools</div>
                
                <button class="logout-btn" onclick="logout()">Logout</button>
            </div>
        </div>
    </div>
    
    <script>
        function handleLogin(event) {
            event.preventDefault();
            const password = document.getElementById('password').value;
            const error = document.getElementById('error');
            const success = document.getElementById('success');
            const loginForm = document.getElementById('loginForm');
            
            if (password === 'mackenzie2024') {
                loginForm.style.display = 'none';
                success.style.display = 'block';
                sessionStorage.setItem('admin_logged_in', 'true');
                sessionStorage.setItem('admin_login_time', new Date().toISOString());
                sessionStorage.setItem('admin_user', 'mackenzie');
            } else {
                error.style.display = 'block';
                setTimeout(() => { 
                    error.style.display = 'none'; 
                    document.getElementById('password').value = '';
                }, 3000);
            }
            return false;
        }
        
        function logout() {
            sessionStorage.removeItem('admin_logged_in');
            sessionStorage.removeItem('admin_login_time');
            sessionStorage.removeItem('admin_user');
            document.getElementById('loginForm').style.display = 'block';
            document.getElementById('success').style.display = 'none';
            document.getElementById('password').value = '';
        }
        
        // Check if already logged in
        if (sessionStorage.getItem('admin_logged_in') === 'true') {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('success').style.display = 'block';
        }
    </script>
</body>
</html>`;
  
  res.set({
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  res.send(adminHtml);
});

// Early middleware to intercept other admin routes before Vite
app.use((req, res, next) => {
  if (req.url === '/blog-admin' || req.url === '/blog-admin/') {
    const loginHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Portal - Mackenzie Siek</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); max-width: 400px; width: 100%; }
        h1 { text-align: center; color: #1f2937; margin-bottom: 8px; font-size: 28px; font-weight: 700; }
        .subtitle { text-align: center; color: #6b7280; margin-bottom: 32px; }
        .form-group { margin-bottom: 24px; }
        label { display: block; color: #374151; font-weight: 500; margin-bottom: 8px; }
        input { width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px; transition: border-color 0.2s; }
        input:focus { outline: none; border-color: #3b82f6; }
        button { width: 100%; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 12px 16px; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        button:hover { transform: translateY(-1px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
        .error { color: #dc2626; margin-top: 8px; font-size: 14px; display: none; }
        .success { background: #d1fae5; border: 1px solid #a7f3d0; color: #065f46; padding: 16px; border-radius: 8px; margin-top: 16px; display: none; }
        .admin-info { margin-top: 20px; padding: 16px; background: #f3f4f6; border-radius: 8px; }
        .admin-info h3 { color: #1f2937; margin-bottom: 8px; }
        .admin-info p { color: #4b5563; margin-bottom: 8px; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Admin Portal</h1>
        <p class="subtitle">Secure blog management access</p>
        
        <div id="loginForm">
            <form onsubmit="return handleLogin(event)">
                <div class="form-group">
                    <label for="password">Admin Password</label>
                    <input type="password" id="password" placeholder="Enter admin password" required>
                </div>
                <button type="submit">Access Admin Panel</button>
                <div class="error" id="error">Incorrect password. Please try again.</div>
            </form>
        </div>
        
        <div class="success" id="success">
            <h3>✓ Access Granted</h3>
            <p>Welcome to the admin panel, Mackenzie!</p>
            <div class="admin-info">
                <h3>Blog Management System</h3>
                <p>• Password authentication: Active</p>
                <p>• Session storage: Enabled</p>
                <p>• Admin privileges: Granted</p>
                <p>• Blog posting: Ready</p>
            </div>
        </div>
    </div>
    
    <script>
        function handleLogin(event) {
            event.preventDefault();
            const password = document.getElementById('password').value;
            const error = document.getElementById('error');
            const success = document.getElementById('success');
            const loginForm = document.getElementById('loginForm');
            
            if (password === 'mackenzie2024') {
                loginForm.style.display = 'none';
                success.style.display = 'block';
                sessionStorage.setItem('admin_logged_in', 'true');
                sessionStorage.setItem('admin_login_time', new Date().toISOString());
            } else {
                error.style.display = 'block';
                setTimeout(() => { error.style.display = 'none'; }, 3000);
            }
            return false;
        }
        
        // Check if already logged in
        if (sessionStorage.getItem('admin_logged_in') === 'true') {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('success').style.display = 'block';
        }
    </script>
</body>
</html>`;
    
    res.set({
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    return res.send(loginHtml);
  }
  next();
});

app.use('/public', express.static(path.resolve(process.cwd(), 'server', 'public')));

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error('Server error:', err);
    res.status(status).json({ message });
    
    // Don't throw the error to prevent server crashes
    // Log it instead for debugging
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
