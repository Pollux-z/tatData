'use client';
import Link from 'next/link';
import { FileText, ArrowRight, Database, Users, MapPin, TrendingUp, BarChart3 } from 'lucide-react';
import Image from 'next/image';

const pdfFiles = [
  {
    name: 'ชุดข้อมูลลูกค้า/พันธมิตร',
    href: '/datasets/partners',
    icon: '/images/customer_partner_data.png',
    description: 'ข้อมูลลูกค้าและพันธมิตรทางการค้า',
    gradient: 'from-indigo-500 to-purple-600',
    bgGradient: 'from-indigo-50 to-purple-50',
  },
  {
    name: 'ชุดข้อมูลสถานการณ์ท่องเที่ยว',
    href: '/datasets/tourism-situation',
    icon: '/images/travel_circumstance_data.png',
    description: 'ข้อมูลสถานการณ์และแนวโน้มการท่องเที่ยว',
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50',
  },
  {
    name: 'ชุดข้อมูลเส้นทางการท่องเที่ยว',
    href: '/datasets/tourist-routes',
    icon: '/images/travel_path_data.png',
    description: 'เส้นทางและจุดหมายปลายทางยอดนิยม',
    gradient: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-50 to-orange-50',
  },
  {
    name: 'ชุดข้อมูลมาตรฐานสินค้า',
    href: '/datasets/products',
    icon: '/images/product_standard.png',
    description: 'มาตรฐานและคุณภาพสินค้าท่องเที่ยว',
    gradient: 'from-blue-500 to-cyan-600',
    bgGradient: 'from-blue-50 to-cyan-50',
  },
  {
    name: 'ชุดข้อมูลพฤติกรรมการท่องเที่ยวของนักท่องเที่ยวไทย',
    href: '/datasets/thai-tourist-behavior',
    icon: '/images/thai_tourist_habit.png',
    description: 'พฤติกรรมการท่องเที่ยวของนักท่องเที่ยวไทย',
    gradient: 'from-rose-500 to-pink-600',
    bgGradient: 'from-rose-50 to-pink-50',
  },
];

export default function DataStandardPage() {
  return (
    <div className="px-4 pb-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            มาตรฐานชุดข้อมูล
          </h1>
          {/* <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            descriptions [optional]
          </p> */}
          <div className="w-24 h-1 bg-linear-to-r from-[#0069aa] to-[#0077c2] mx-auto rounded-full"></div>
        </div>

        {/* Data Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {pdfFiles.map((file, idx) => (
            <Link
              key={idx}
              href={file.href}
              className="group block"
            >
              <div className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200 hover:border-slate-300 overflow-hidden group-hover:bg-linear-to-br ${file.bgGradient}`}>
                <div className="flex items-start space-x-4 relative z-10">
                  {/* Icon */}
                  <Image src={file.icon} alt={file.name} width={100} height={100} />
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#0069aa] transition-colors duration-300">
                      {file.name}
                    </h3>
                    
                    {/* Action */}
                    <div className="flex items-center text-[#0069aa] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span>ดูข้อมูล</span>
                      <ArrowRight size={20} className="ml-2" />
                    </div>
                  </div>
                </div>
                
                {/* Subtle hover effect */}
                <div className="absolute inset-0 bg-linear-to-r from-[#0069aa]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
