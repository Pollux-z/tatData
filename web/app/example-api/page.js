'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import SwaggerFallback from '@/components/SwaggerFallback';

export default function DataStandardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let timeoutId;

    // Check if FastAPI server is running
    const checkServer = async () => {
      try {
        const response = await fetch('/openapi.json', {
          method: 'GET',
          // mode: 'cors',
        });
        
        if (!response.ok) {
          throw new Error('Server not responding');
        }
        
        // Server is running, hide loading
        setIsLoading(false);
      } catch (error) {
        console.error('FastAPI server not available:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    // Set a timeout to show loading state
    timeoutId = setTimeout(() => {
      checkServer();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-0 md:ml-64">
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">FastAPI Documentation</h1>
              <p className="text-gray-600">
                Interactive FastAPI documentation from http://localhost:8000/docs
              </p>
            </div>
            
            {isLoading && (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading API documentation...</p>
              </div>
            )}
            
            {hasError && <SwaggerFallback />}
            
            {!isLoading && !hasError && (
              <div className="w-full h-screen">
                <iframe
                  src="/docs"
                  className="w-full h-full border-0"
                  title="FastAPI Documentation"
                  allow="fullscreen"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
