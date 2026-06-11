"use client";
import { useState, useEffect } from "react";
import { Download, ArrowLeft, FileText, Eye, ExternalLink, Info, Smartphone, AlertTriangle } from "lucide-react";
import Link from "next/link";

const MANUAL_PDF_URL = "/PDF/คู่มือการใช้งานมาตรฐานข้อมูล.pdf";

export default function ManualPage() {
  const pdfUrl = MANUAL_PDF_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("embedded"); // "embedded" or "external"
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'คู่มือการใช้งานมาตรฐานข้อมูล.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, '_blank');
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0069aa] mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลดคู่มือการใช้งาน...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <FileText size={64} className="mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">ไม่สามารถโหลดไฟล์ได้</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-[#0069aa] text-white px-6 py-3 rounded-lg hover:bg-[#005a8f] transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            กลับหน้าหลัก
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 mt-[-40px]">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-[#0069aa] to-[#0077c2]">
                  <FileText size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">คู่มือการใช้งานมาตรฐานข้อมูล</h1>
                  <p className="hidden sm:block text-sm text-gray-500">คู่มือการใช้งานระบบมาตรฐานข้อมูลการท่องเที่ยว</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-gradient-to-r from-[#0069aa] to-[#0077c2] text-white px-4 py-3 rounded-lg hover:from-[#005a8f] hover:to-[#0069aa] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Download size={18} />
                <span className="hidden sm:inline">ดาวน์โหลด PDF</span>
                <span className="sm:hidden">ดาวน์โหลด</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Warning */}
      {isMobile && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-amber-800 mb-1">หมายเหตุสำหรับมือถือ</h3>
                <p className="text-sm text-amber-700">
                  การดู PDF ในมือถืออาจมีปัญหา กรุณาใช้ปุ่ม {`"ดาวน์โหลด PDF"`} เพื่อดาวน์โหลดไฟล์และดูในแอป PDF reader ของคุณ
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Mode Selector */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">โหมดการแสดงผล:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleViewModeChange("embedded")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === "embedded"
                      ? "bg-[#0069aa] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  แสดงในหน้าเว็บ
                </button>
                <button
                  onClick={() => handleViewModeChange("external")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    viewMode === "external"
                      ? "bg-[#0069aa] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  เปิดในแท็บใหม่
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {viewMode === "embedded" ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-center min-h-[600px] bg-gray-100">
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-[800px] border-0"
                title="คู่มือการใช้งานมาตรฐานข้อมูล"
                onError={() => {
                  setError("ไม่สามารถโหลดไฟล์ PDF ได้");
                }}
              />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <ExternalLink size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                เปิดคู่มือการใช้งานในแท็บใหม่
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                คลิกปุ่มด้านล่างเพื่อเปิดคู่มือการใช้งานในแท็บใหม่ ซึ่งจะให้คุณควบคุมการดู PDF ได้ดีกว่า
              </p>
              <button
                onClick={handleOpenInNewTab}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0069aa] to-[#0077c2] text-white px-6 py-3 rounded-lg hover:from-[#005a8f] hover:to-[#0069aa] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <ExternalLink size={18} />
                เปิดในแท็บใหม่
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Information Section */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-blue-800 mb-1">คำแนะนำการใช้งาน</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>โหมดแสดงในหน้าเว็บ:</strong> ดู PDF ในหน้าเว็บนี้ (อาจมีข้อจำกัดในการควบคุม)</li>
                <li>• <strong>โหมดเปิดในแท็บใหม่:</strong> เปิด PDF ในแท็บใหม่เพื่อควบคุมได้เต็มที่</li>
                <li>• <strong>ดาวน์โหลด:</strong> บันทึกไฟล์ PDF ลงเครื่องเพื่อดูในโปรแกรม PDF reader</li>
                {isMobile && (
                  <li className="font-semibold text-amber-700">• <strong>สำหรับมือถือ:</strong> แนะนำให้ดาวน์โหลดไฟล์เพื่อดูในแอป PDF reader</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
