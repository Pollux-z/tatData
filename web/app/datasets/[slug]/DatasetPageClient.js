"use client";
import Image from "next/image";
import { FileText, Download, Code, Database, FileSpreadsheet, X } from "lucide-react";
import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';

export default function DatasetPageClient({ data }) {
  // Most datasets have a single XSD/Data Dictionary pair (data.xsd/data.datadict).
  // A few (e.g. flight data) are backed by multiple source schemas, listed in data.schemas.
  const schemas = data.schemas ?? [{ xsd: data.xsd, datadict: data.datadict }];

  const [xmlContents, setXmlContents] = useState({});
  const [dataDictModalIndex, setDataDictModalIndex] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [loadingExcel, setLoadingExcel] = useState(false);

  useEffect(() => {
    schemas.forEach((schema, index) => {
      fetch(schema.xsd)
        .then((response) => response.text())
        .then((content) =>
          setXmlContents((prev) => ({ ...prev, [index]: content }))
        )
        .catch((error) => console.error("Error loading XML:", error));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const loadExcelPreview = async (index) => {
    setLoadingExcel(true);
    try {
      const response = await fetch(schemas[index].datadict);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      // Get the first sheet
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convert to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setExcelData({
        sheetName: firstSheetName,
        data: jsonData,
        allSheets: workbook.SheetNames
      });
    } catch (error) {
      console.error('Error loading Excel file:', error);
      alert('Error loading Excel file. Please try again.');
    } finally {
      setLoadingExcel(false);
    }
  };

  const handleDataDictClick = (index) => (e) => {
    e.preventDefault();
    setDataDictModalIndex(index);
    loadExcelPreview(index);
  };

  return (
    <div className="bg-linear-to-br from-slate-50 to-blue-50">
      <div className="px-6 max-w-7xl mx-auto">
        
        {/* Section 1: Logo and Title */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src={data.logo}
                alt={data.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            {data.title}
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-[#0069aa] to-[#0077c2] mx-auto rounded-full"></div>
        </div>

        {/* Section 2: Description and Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
              รายละเอียดชุดข้อมูล
            </h2>
            <p className="text-base xs:text-lg md:text-xl indent-[40px] text-left text-slate-600 leading-relaxed">
              {data.description}
            </p>
          </div>
          
          <div className="relative">
            <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Section 3: Data Dictionary */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <FileSpreadsheet size={28} className="mr-3 text-[#0069aa]" />
            Data Dictionary
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            {schemas.map((schema, index) => (
              <button
                key={schema.datadict}
                onClick={handleDataDictClick(index)}
                className="cursor-pointer group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200 hover:border-slate-300 text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-linear-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FileSpreadsheet size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                      {schema.label ? `Data Dictionary: ${schema.label}` : "Data Dictionary"}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      เอกสารอธิบายโครงสร้างและความหมายของข้อมูล
                    </p>
                    <div className="flex items-center text-emerald-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span>ดูตัวอย่าง</span>
                      <FileSpreadsheet size={20} className="ml-2" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Section 4: XML Code Display */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <Code size={28} className="mr-3 text-[#0069aa]" />
            โครงสร้างข้อมูล XML Schema
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {schemas.map((schema, index) => (
              <div key={schema.xsd}>
                {schema.label && (
                  <h3 className="text-lg font-semibold text-slate-700 mb-3">
                    {schema.label}
                  </h3>
                )}
                <div className="flex items-center justify-end mb-3">
                  <a
                    href={schema.xsd}
                    download
                    className="text-sm xs:text-base md:text-lg inline-flex items-center gap-2 bg-[#0069aa] text-white px-4 py-2 rounded-lg hover:bg-[#005a91] transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Download size={18} />
                    ดาวน์โหลด XSD
                  </a>
                </div>

                <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
                  <div className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-slate-300 text-sm font-mono">XML Schema Definition</span>
                  </div>
                  <div className="h-96 overflow-auto p-6">
                    <pre className="text-slate-300 text-sm font-mono leading-relaxed whitespace-pre-wrap">
                      {xmlContents[index] || "กำลังโหลด XML Schema..."}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: PDF and Data Catalog */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <Download size={28} className="mr-3 text-[#0069aa]" />
            เอกสารเพิ่มเติม
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href={data.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200 hover:border-slate-300"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-linear-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FileText size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-red-700 transition-colors duration-300">
                    เอกสาร PDF
                  </h3>
                  <p className="text-slate-600 mb-4">
                    เอกสารรายละเอียดชุดข้อมูลในรูปแบบ PDF
                  </p>
                  <div className="flex items-center text-red-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>เปิดดู</span>
                    <FileText size={20} className="ml-2" />
                  </div>
                </div>
              </div>
            </a>

            {data.data_catalog && (
              <a
                href={data.data_catalog}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200 hover:border-slate-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Database size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                      แคตตาล็อกข้อมูล
                    </h3>
                    <p className="text-slate-600 mb-4">
                      เข้าถึงข้อมูลชุดนี้ในระบบแคตตาล็อกข้อมูลของ TAT
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span>เปิดแคตตาล็อก</span>
                      <Database size={20} className="ml-2" />
                    </div>
                  </div>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Data Dictionary Modal */}
      {dataDictModalIndex !== null && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setDataDictModalIndex(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                <FileSpreadsheet size={28} className="mr-3 text-[#0069aa]" />
                Data Dictionary Preview
              </h2>
              <div className="flex items-center space-x-3">
                <a
                  href={schemas[dataDictModalIndex].datadict}
                  download
                  className="inline-flex items-center gap-2 bg-[#0069aa] text-white px-4 py-2 rounded-lg hover:bg-[#005a91] transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  <Download size={18} />
                  ดาวน์โหลด
                </a>
                <button
                  onClick={() => setDataDictModalIndex(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
              {loadingExcel ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0069aa]"></div>
                  <div className="mt-4 text-gray-600">กำลังโหลดไฟล์ Excel...</div>
                </div>
              ) : excelData ? (
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      Sheet: {excelData.sheetName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      แสดงข้อมูลตัวอย่างจาก 10 แถวแรกของข้อมูลทั้งหมด
                    </p>
                  </div>
                  
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-gray-50">
                          {excelData.data[0]?.map((header, index) => (
                            <th key={index} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                              {header || `Column ${index + 1}`}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {excelData.data.slice(1, 11).map((row, rowIndex) => (
                          <tr key={rowIndex} className="hover:bg-gray-50">
                            {excelData.data[0]?.map((_, colIndex) => (
                              <td key={colIndex} className="px-4 py-3 text-sm text-gray-900 border-b">
                                {row[colIndex] || ''}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-500">ไม่สามารถโหลดข้อมูลได้</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 