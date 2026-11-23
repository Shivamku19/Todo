import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-5 text-center">
          <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '540px' }}>
            <h2 className="text-danger mb-3">Something went wrong</h2>
            <p className="text-muted mb-4">
              An unexpected error occurred while rendering the application. You can reload or reset local data.
            </p>
            <div className="d-flex justify-content-center gap-2">
              <button className="btn btn-primary" onClick={this.handleReload}>
                Reload Application
              </button>
              <button className="btn btn-outline-secondary" onClick={this.handleReset}>
                Reset Cache & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
