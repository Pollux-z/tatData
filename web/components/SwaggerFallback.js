'use client';

export default function SwaggerFallback() {
  return (
    <div className="p-8 text-center">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">FastAPI Docs Unavailable</h3>
        <p className="text-gray-600 mb-6">
          Unable to load FastAPI documentation. Please ensure your FastAPI server is running on localhost:8000.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 text-left">
          <h4 className="font-medium text-gray-900 mb-2">To start your FastAPI server:</h4>
          <ol className="text-sm text-gray-600 space-y-1">
            <li>1. Navigate to your backend directory</li>
            <li>2. Run: <code className="bg-gray-200 px-1 rounded">uvicorn main:app --reload --host 0.0.0.0 --port 8000</code></li>
            <li>3. Refresh this page</li>
          </ol>
        </div>
        <div className="mt-6">
          <button 
            onClick={() => window.location.reload()} 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
} 