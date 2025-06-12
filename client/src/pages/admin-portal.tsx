import { useState, useEffect } from "react";

export default function AdminPortal() {
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('admin_logged_in') === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'mackenzie2024') {
      setIsLoggedIn(true);
      sessionStorage.setItem('admin_logged_in', 'true');
      sessionStorage.setItem('admin_login_time', new Date().toISOString());
      setShowError(false);
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setPassword('');
      }, 3000);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('admin_logged_in');
    sessionStorage.removeItem('admin_login_time');
    setPassword('');
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-5">
        <div className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-full">
          <div className="bg-green-50 border-2 border-green-200 text-green-800 p-5 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-green-700">🎉 Welcome, Mackenzie!</h3>
            <p className="mb-4">You have successfully accessed the blog admin panel.</p>
            
            <div className="mt-6 p-5 bg-gray-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold mb-3 text-gray-800">Blog Management Features</h4>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center">
                  <span className="text-green-500 font-bold mr-2">✓</span>
                  Create and publish new blog posts
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 font-bold mr-2">✓</span>
                  Edit existing blog content
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 font-bold mr-2">✓</span>
                  Manage media uploads and images
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 font-bold mr-2">✓</span>
                  Monitor blog performance
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 font-bold mr-2">✓</span>
                  SEO optimization tools
                </div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-5">
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Blog Admin</h1>
        <p className="text-center text-gray-600 mb-8">Secure access to blog management</p>
        
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2 text-sm">
              Admin Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your admin password"
              className="w-full p-4 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg text-base font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-100 transform hover:-translate-y-0.5 transition-all"
          >
            Access Blog Admin
          </button>
          
          {showError && (
            <div className="mt-3 text-red-600 text-sm p-2 bg-red-50 rounded border border-red-200">
              ❌ Incorrect password. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}