'use client';
import Link from 'next/link';
import { Home, Database, Link as LinkIcon, ArrowLeft, Info, Shield, Code } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="hidden md:block w-64 bg-white/95 backdrop-blur-md border-r border-slate-200/50 h-screen fixed left-0 top-16 overflow-y-auto shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
          <Code size={20} className="mr-2 text-[#0069aa]" />
          API Documentation
        </h2>
        
        <div className="space-y-6">

          <div className="border-t border-b border-slate-200 py-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center">
              <Shield size={16} className="mr-2 text-[#0069aa]" />
              API Info
            </h3>
            <div className="text-xs text-slate-600 space-y-3">
              <div>
                <p className="font-medium text-slate-700 mb-1">Base URL:</p>
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-3 rounded-lg border border-slate-200 font-mono text-[11px]">
                http://localhost:8000/docs
                </div>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-700">Version:</span>
                <span className="bg-[#0069aa] text-white px-2 py-1 rounded text-[10px] font-semibold">v1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-700">Format:</span>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-[10px] font-semibold">JSON</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 