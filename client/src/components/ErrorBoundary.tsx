import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Application error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're experiencing a technical issue. Please refresh the page or contact us directly.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
              >
                Refresh Page
              </button>
              <a
                href="tel:(704)610-0959"
                className="block w-full bg-gray-100 text-gray-900 px-6 py-3 rounded hover:bg-gray-200 transition-colors"
              >
                Call (704) 610-0959
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}