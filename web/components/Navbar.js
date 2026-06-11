'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <>
    <nav className="z-10 bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-sm opacity-0">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo / Title */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#004a91] to-[#0059aa] bg-clip-text text-transparent hover:from-[#005a91] hover:to-[#0069aa] transition-all duration-300"
          >
            <Image 
              src="/tat_logo.png" 
              alt="TAT Logo" 
              width={40} 
              height={40} 
              className="w-10 h-10"
            />
            <span>มาตรฐานข้อมูลการท่องเที่ยวแห่งประเทศไทย</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-4 text-sm font-medium">
            <Link
              href="/" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md border ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-[#004a91] to-[#0059aa] text-white shadow-md border-[#004a91]' 
                  : 'bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 text-slate-700 hover:text-[#005a91] border-blue-200 hover:border-blue-300'
              }`}
            >
              มาตรฐานชุดข้อมูล
            </Link>
            <Link 
              href="/codelist" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md border ${
                isActive('/codelist') 
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md border-emerald-600' 
                  : 'bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 text-slate-700 hover:text-emerald-700 border-emerald-100 hover:border-emerald-200'
              }`}
            >
              Code List
            </Link>
            <Link 
              href="https://datacatalog.tat.or.th/" target="_blank" 
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-slate-700 hover:text-amber-700 transition-all duration-300 shadow-sm hover:shadow-md border border-amber-100 hover:border-amber-200"
            >
              TAT data catalog
            </Link>
            <Link 
              href="/example-api" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md border ${
                isActive('/example-api') 
                  ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-md border-purple-600' 
                  : 'bg-gradient-to-r from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 text-slate-700 hover:text-purple-700 border-purple-100 hover:border-purple-200'
              }`}
            >
              ตัวอย่าง API
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} className="text-slate-700" /> : <Menu size={24} className="text-slate-700" />}
          </button>
        </div>
      </div>
    </nav>
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between">
          {/* Logo / Title */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#004a91] to-[#0059aa] bg-clip-text text-transparent hover:from-[#005a91] hover:to-[#0069aa] transition-all duration-300"
          >
            <Image 
              src="/tat_logo.png" 
              alt="TAT Logo" 
              width={40} 
              height={40} 
              className="w-10 h-10"
            />
            <span>มาตรฐานข้อมูลการท่องเที่ยวแห่งประเทศไทย</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-4 text-sm font-medium">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md border ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-[#004a91] to-[#0059aa] text-white shadow-md border-[#004a91]' 
                  : 'bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-slate-700 hover:text-[#0059aa] border-blue-100 hover:border-blue-200'
              }`}
            >
              มาตรฐานชุดข้อมูล
            </Link>
            <Link 
              href="/codelist" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md border ${
                isActive('/codelist') 
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md border-emerald-500' 
                  : 'bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 text-slate-700 hover:text-emerald-700 border-emerald-100 hover:border-emerald-200'
              }`}
            >
              Code List
            </Link>
            <Link 
              href="https://datacatalog.tat.or.th/" target="_blank" 
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-slate-700 hover:text-amber-700 transition-all duration-300 shadow-sm hover:shadow-md border border-amber-100 hover:border-amber-200"
            >
              TAT data catalog
            </Link>
            <Link 
              href="/example-api" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md border ${
                isActive('/example-api') 
                  ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-md border-purple-500' 
                  : 'bg-gradient-to-r from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 text-slate-700 hover:text-purple-700 border-purple-100 hover:border-purple-200'
              }`}
            >
              ตัวอย่าง API
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} className="text-slate-700" /> : <Menu size={24} className="text-slate-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-slate-200">
            <div className="flex flex-col space-y-3 pt-4">
              <Link 
                href="/" 
                className={`px-4 py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md border ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-[#004a91] to-[#0059aa] text-white shadow-md border-[#004a91]' 
                    : 'bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-slate-700 hover:text-[#0059aa] border-blue-100 hover:border-blue-200'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                มาตรฐานชุดข้อมูล
              </Link>
              <Link 
                href="/codelist" 
                className={`px-4 py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md border ${
                  isActive('/codelist') 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md border-emerald-500' 
                  : 'bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 text-slate-700 hover:text-emerald-700 border-emerald-100 hover:border-emerald-200'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Code List
              </Link>
              <Link 
                href="https://datacatalog.tat.or.th/" target="_blank" 
                className="px-4 py-3 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-slate-700 hover:text-amber-700 transition-all duration-300 shadow-sm hover:shadow-md border border-amber-100 hover:border-amber-200"
                onClick={() => setIsMenuOpen(false)}
              >
                TAT data catalog
              </Link>
              <Link 
                href="/example-api" 
                className={`px-4 py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md border ${
                  isActive('/example-api') 
                    ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-md border-purple-500' 
                    : 'bg-gradient-to-r from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 text-slate-700 hover:text-purple-700 border-purple-100 hover:border-purple-200'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                ตัวอย่าง API
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}
