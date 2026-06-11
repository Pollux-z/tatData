"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Database,
  Users,
  MapPin,
  TrendingUp,
  BarChart3,
  FileText,
  Award,
  Star,
  Building,
  Route,
  Calendar,
  Target,
  UserCheck,
  CreditCard,
  Globe,
  MessageSquare,
  ThumbsUp,
  Heart,
  Mail,
  Search,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Download,
  ShoppingBag,
} from "lucide-react";

// Custom hook for responsive behavior
const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return { isMobile };
};

// No mapping needed - all data comes from souvenir-business.json

// No static data needed - all data comes from souvenir-business.json

// Modal Component
const CodeListModal = ({ isOpen, onClose, data, title, colorTheme }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { isMobile } = useResponsive();

  // Function to convert data to CSV
  const convertToCSV = (data) => {
    if (data.length === 0) return "";

    // Get headers from the first item
    const headers = Object.keys(data[0]);

    // Convert headers to readable format
    const readableHeaders = headers.map((key) => {
      return key;
      // .replace(/([A-Z])/g, ' $1')
      // .replace(/^./, str => str.toUpperCase())
      // .replace(/_/g, ' ')
      // .replace(/TH$/, ' (ไทย)')
      // .replace(/EN$/, ' (English)');
    });

    // Create CSV content
    const csvContent = [
      readableHeaders.join(","),
      ...data.map((item) =>
        headers
          .map((header) => {
            const value = item[header] || "";
            // Escape quotes and wrap in quotes if contains comma or newline
            const escapedValue = String(value).replace(/"/g, '""');
            return escapedValue.includes(",") ||
              escapedValue.includes("\n") ||
              escapedValue.includes('"')
              ? `"${escapedValue}"`
              : escapedValue;
          })
          .join(","),
      ),
    ].join("\n");

    return csvContent;
  };

  // Function to download CSV
  const downloadCSV = () => {
    const csvContent = convertToCSV(data);

    console.log("csvContent", csvContent);

    // Add BOM for proper UTF-8 encoding
    const BOM = "\uFEFF";
    const csvWithBOM = BOM + csvContent;

    const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${title}_codelist.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return Object.values(item).some(
      (value) => value && value.toString().toLowerCase().includes(searchLower),
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Get table headers from the first item
  const getTableHeaders = () => {
    if (data.length === 0) return [];
    const firstItem = data[0];
    return Object.keys(firstItem).map((key) => {
      // Convert camelCase to readable format
      const readableKey = key;
      // .replace(/([A-Z])/g, ' $1')
      // .replace(/^./, str => str.toUpperCase())
      // .replace(/_/g, ' ')
      // .replace(/T H$/, ' (ไทย)')
      // .replace(/E N$/, ' (English)');
      return readableKey;
    });
  };

  const headers = getTableHeaders();

  // Handle modal close
  const handleClose = () => {
    setSearchTerm("");
    setCurrentPage(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`sm:p-6 p-4 border-b ${colorTheme.borderColor} bg-linear-to-r ${colorTheme.bgGradient}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div
                className={`p-2 rounded-lg bg-linear-to-r ${colorTheme.gradient}`}
              >
                <Database size={20} className="text-white" />
              </div>
              <h2
                className={`overflow-hidden text-ellipsis sm:text-xl xs:text-lg text-base font-bold ${colorTheme.textColor}`}
              >
                {title}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X size={24} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Search Bar and Download Button */}
        <div className="sm:p-6 p-4 border-b border-gray-200">
          <div className="flex items-center gap-4 mb-4 text-sm sm:text-base">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="ค้นหาข้อมูล..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={downloadCSV}
              className={`flex items-center gap-2 px-4 py-3 bg-linear-to-r ${colorTheme.gradient} text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5`}
            >
              <Download size={18} />
              <span>ดาวน์โหลด CSV</span>
            </button>
          </div>
          <div className="text-sm text-gray-500">
            พบ {filteredData.length} รายการ
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg sm:m-6 m-4">
          <table className="w-full bg-white">
            <thead className={`bg-gray-50 ${colorTheme.borderColor}`}>
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.length === 0 ? (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    ไม่พบข้อมูล
                  </td>
                </tr>
              ) : (
                currentData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    {Object.values(item).map((value, valueIndex) => (
                      <td
                        key={valueIndex}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {value || "-"}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Responsive Pagination */}
        {totalPages > 1 && (
          <div className="sm:px-4 px-3 sm:py-4 py-3 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Page info - responsive text */}
              <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
                <span className="hidden sm:inline">แสดง </span>
                {startIndex + 1}-{Math.min(endIndex, filteredData.length)}
                <span className="hidden sm:inline">
                  {" "}
                  จาก {filteredData.length} รายการ
                </span>
                <span className="sm:hidden"> / {filteredData.length}</span>
              </div>

              {/* Mobile pagination - simplified for very small screens */}
              {isMobile && totalPages > 5 ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-3 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-w-[44px] touch-manipulation"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <span className="px-3 py-2 text-sm font-medium text-gray-700">
                    หน้า {currentPage} จาก {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-3 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-w-[44px] touch-manipulation"
                  >
                    <ChevronRightIcon size={16} />
                  </button>
                </div>
              ) : (
                /* Desktop pagination controls */
                <div className="flex items-center gap-1 sm:gap-2">
                  {/* Previous button */}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-3 sm:p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-w-[44px] sm:min-w-[44px] touch-manipulation"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Dynamic page buttons - responsive */}
                  {(() => {
                    const pages = [];
                    const maxVisiblePages = isMobile ? 3 : 7; // 3 on mobile, 7 on desktop

                    if (totalPages <= maxVisiblePages) {
                      // Show all pages if total is small
                      for (let i = 1; i <= totalPages; i++) {
                        pages.push(i);
                      }
                    } else {
                      // Show dynamic range based on current page
                      let startPage = Math.max(
                        1,
                        currentPage - (isMobile ? 1 : 3),
                      );
                      let endPage = Math.min(
                        totalPages,
                        currentPage + (isMobile ? 1 : 3),
                      );

                      // Adjust if we're near the beginning
                      if (currentPage <= (isMobile ? 2 : 4)) {
                        endPage = Math.min(totalPages, maxVisiblePages);
                      }

                      // Adjust if we're near the end
                      if (currentPage >= totalPages - (isMobile ? 1 : 3)) {
                        startPage = Math.max(
                          1,
                          totalPages - maxVisiblePages + 1,
                        );
                      }

                      // Add first page and ellipsis if needed
                      if (startPage > 1) {
                        pages.push(1);
                        if (startPage > 2) {
                          pages.push("...");
                        }
                      }

                      // Add visible pages
                      for (let i = startPage; i <= endPage; i++) {
                        pages.push(i);
                      }

                      // Add last page and ellipsis if needed
                      if (endPage < totalPages) {
                        if (endPage < totalPages - 1) {
                          pages.push("...");
                        }
                        pages.push(totalPages);
                      }
                    }

                    return pages.map((page, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          typeof page === "number" ? setCurrentPage(page) : null
                        }
                        disabled={typeof page !== "number"}
                        className={`px-3 sm:px-3 py-3 sm:py-2 rounded-lg border transition-colors duration-200 min-w-[40px] sm:min-w-[40px] text-sm touch-manipulation ${
                          page === currentPage
                            ? `bg-linear-to-r ${colorTheme.gradient} text-white border-transparent`
                            : typeof page === "number"
                              ? "border-gray-300 hover:bg-gray-100"
                              : "border-transparent text-gray-400 cursor-default"
                        }`}
                      >
                        {page}
                      </button>
                    ));
                  })()}

                  {/* Next button */}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-3 sm:p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-w-[44px] sm:min-w-[44px] touch-manipulation"
                  >
                    <ChevronRightIcon size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function CodeListPage() {
  const [codelistDataCache, setCodelistDataCache] = useState({});
  const [modalData, setModalData] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalColorTheme, setModalColorTheme] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [codelistItems, setCodelistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination and search state
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Show 10 items per page
  const { isMobile } = useResponsive();

  // Load codelist data from souvenir-business.json
  useEffect(() => {
    const loadCodelistData = async () => {
      try {
        const response = await fetch("/codelist-json/codelists.json");
        const data = await response.json();

        console.log("codelist data", data);

        // Extract codelist names from the JSON structure
        const items = Object.keys(data).map((name) => ({ name }));

        // Sort items alphabetically by Thai characters (ก-ฮ)
        // const sortedItems = items.sort((a, b) => a.name.localeCompare(b.name, 'th'));

        setCodelistItems(items);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading codelist data:", error);
        setIsLoading(false);
      }
    };

    loadCodelistData();
  }, []);

  // Sort codelist items alphabetically by Thai characters (ก-ฮ)
  const allCodelistItems = useMemo(() => {
    return codelistItems;
  }, [codelistItems]);

  // Filter and paginate codelist data
  const filteredAndPaginatedData = useMemo(() => {
    // Filter data based on search term
    const filteredData = allCodelistItems.filter((item) => {
      if (!searchTerm) return true;

      const searchLower = searchTerm.toLowerCase();

      // Search in item name only
      return item.name.toLowerCase().includes(searchLower);
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      totalItems: filteredData.length,
      totalPages,
      currentPage,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    };
  }, [allCodelistItems, searchTerm, currentPage, itemsPerPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Load codelist JSON data
  const loadCodelistFile = async (filename) => {
    if (codelistDataCache[filename]) {
      return codelistDataCache[filename];
    }

    try {
      const response = await fetch(`/codelist-json/${filename}`);
      const data = await response.json();
      setCodelistDataCache((prev) => ({ ...prev, [filename]: data }));
      return data;
    } catch (error) {
      console.error(`Error loading ${filename}:`, error);
      return null;
    }
  };

  // Handle item click
  const handleItemClick = async (item) => {
    // Load the souvenir-business.json file
    const fileData = await loadCodelistFile("codelists.json");
    if (!fileData) return;

    const data = fileData[item.name] || [];

    if (data.length > 0) {
      setModalData(data);
      setModalTitle(item.name);
      // Use default color theme
      setModalColorTheme({
        gradient: "from-blue-500 to-cyan-600",
        bgGradient: "from-blue-50/50 to-cyan-50/50",
        borderColor: "border-blue-200",
        hoverBorderColor: "group-hover:border-blue-400",
        textColor: "group-hover:text-blue-700",
        iconColor: "text-blue-600",
      });
      setIsModalOpen(true);
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6 py-16">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-linear-to-r from-[#0069aa] to-[#0077c2] shadow-lg">
              <Database size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800">
              รายการรหัสข้อมูล
            </h1>
          </div>
          <div className="w-24 h-1 bg-linear-to-r from-[#0069aa] to-[#0077c2] mx-auto rounded-full mb-8"></div>
          <div className="text-lg text-gray-600">กำลังโหลดข้อมูล...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-linear-to-r from-[#0069aa] to-[#0077c2] shadow-lg">
              <Database size={32} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800">
              รายการรหัสข้อมูล
            </h1>
          </div>
          <div className="w-24 h-1 bg-linear-to-r from-[#0069aa] to-[#0077c2] mx-auto rounded-full"></div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 w-full lg:w-auto">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="ค้นหารายการรหัสข้อมูล..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Items per page selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  แสดง:
                </span>
                <select
                  value={itemsPerPage}
                  onChange={(e) =>
                    handleItemsPerPageChange(Number(e.target.value))
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value={5}>5 รายการ</option>
                  <option value={10}>10 รายการ</option>
                  <option value={20}>20 รายการ</option>
                  <option value={40}>40 รายการ</option>
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-sm text-gray-500">
              พบ {filteredAndPaginatedData.totalItems} รายการ
              {searchTerm && (
                <span className="ml-2">สำหรับคำค้นหา {`"${searchTerm}"`}</span>
              )}
            </div>
          </div>
        </div>

        {/* Code List Items */}
        <div className="space-y-4 mb-16">
          {filteredAndPaginatedData.data.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                ไม่พบรายการรหัสข้อมูล
              </h3>
              <p className="text-gray-500">
                {searchTerm ? (
                  <>ไม่พบรายการที่ตรงกับคำค้นหา {`"${searchTerm}"`}</>
                ) : (
                  "ไม่มีรายการรหัสข้อมูลในขณะนี้"
                )}
              </p>
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  ล้างการค้นหา
                </button>
              )}
            </div>
          ) : (
            filteredAndPaginatedData.data.map((item, index) => (
              <div
                onClick={() => handleItemClick(item)}
                key={index}
                className="cursor-pointer bg-white rounded-2xl shadow-lg border border-gray-200 sm:py-3 py-2 sm:px-5 px-3 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center gap-3">
                      <h3 className="sm:text-base text-sm font-semibold text-slate-800 overflow-hidden text-ellipsis">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`ml-2 sm:text-base text-sm cursor-pointer flex items-center gap-2 px-3 py-1 rounded-lg transition-all duration-200 bg-linear-to-r from-[#0069aa] to-[#0077c2] text-white hover:shadow-lg hover:-translate-y-0.5`}
                  >
                    <span className="text-nowrap">ดูข้อมูล</span>
                    <ChevronRight size={16} className="sm:block hidden" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Responsive Pagination */}
        {filteredAndPaginatedData.totalPages > 1 && (
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Page info - responsive text */}
                <div className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
                  <span className="hidden sm:inline">แสดง </span>
                  {(filteredAndPaginatedData.currentPage - 1) * itemsPerPage +
                    1}
                  -
                  {Math.min(
                    filteredAndPaginatedData.currentPage * itemsPerPage,
                    filteredAndPaginatedData.totalItems,
                  )}
                  <span className="hidden sm:inline">
                    {" "}
                    จาก {filteredAndPaginatedData.totalItems} รายการ
                  </span>
                  <span className="sm:hidden">
                    {" "}
                    / {filteredAndPaginatedData.totalItems}
                  </span>
                </div>

                {/* Mobile pagination - simplified for very small screens */}
                {isMobile && filteredAndPaginatedData.totalPages > 5 ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handlePageChange(
                          filteredAndPaginatedData.currentPage - 1,
                        )
                      }
                      disabled={!filteredAndPaginatedData.hasPrevPage}
                      className="p-3 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-w-[44px] touch-manipulation"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <span className="px-3 py-2 text-sm font-medium text-gray-700">
                      หน้า {filteredAndPaginatedData.currentPage} จาก{" "}
                      {filteredAndPaginatedData.totalPages}
                    </span>

                    <button
                      onClick={() =>
                        handlePageChange(
                          filteredAndPaginatedData.currentPage + 1,
                        )
                      }
                      disabled={!filteredAndPaginatedData.hasNextPage}
                      className="p-3 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-w-[44px] touch-manipulation"
                    >
                      <ChevronRightIcon size={16} />
                    </button>
                  </div>
                ) : (
                  /* Desktop pagination controls */
                  <div className="flex items-center gap-1 sm:gap-2">
                    {/* Previous button */}
                    <button
                      onClick={() =>
                        handlePageChange(
                          filteredAndPaginatedData.currentPage - 1,
                        )
                      }
                      disabled={!filteredAndPaginatedData.hasPrevPage}
                      className="p-3 sm:p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-w-[44px] sm:min-w-[44px] touch-manipulation"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    {/* Dynamic page buttons - responsive */}
                    {(() => {
                      const pages = [];
                      const maxVisiblePages = isMobile ? 3 : 7; // 3 on mobile, 7 on desktop

                      if (
                        filteredAndPaginatedData.totalPages <= maxVisiblePages
                      ) {
                        // Show all pages if total is small
                        for (
                          let i = 1;
                          i <= filteredAndPaginatedData.totalPages;
                          i++
                        ) {
                          pages.push(i);
                        }
                      } else {
                        // Show dynamic range based on current page
                        let startPage = Math.max(
                          1,
                          filteredAndPaginatedData.currentPage -
                            (isMobile ? 1 : 3),
                        );
                        let endPage = Math.min(
                          filteredAndPaginatedData.totalPages,
                          filteredAndPaginatedData.currentPage +
                            (isMobile ? 1 : 3),
                        );

                        // Adjust if we're near the beginning
                        if (
                          filteredAndPaginatedData.currentPage <=
                          (isMobile ? 2 : 4)
                        ) {
                          endPage = Math.min(
                            filteredAndPaginatedData.totalPages,
                            maxVisiblePages,
                          );
                        }

                        // Adjust if we're near the end
                        if (
                          filteredAndPaginatedData.currentPage >=
                          filteredAndPaginatedData.totalPages -
                            (isMobile ? 1 : 3)
                        ) {
                          startPage = Math.max(
                            1,
                            filteredAndPaginatedData.totalPages -
                              maxVisiblePages +
                              1,
                          );
                        }

                        // Add first page and ellipsis if needed
                        if (startPage > 1) {
                          pages.push(1);
                          if (startPage > 2) {
                            pages.push("...");
                          }
                        }

                        // Add visible pages
                        for (let i = startPage; i <= endPage; i++) {
                          pages.push(i);
                        }

                        // Add last page and ellipsis if needed
                        if (endPage < filteredAndPaginatedData.totalPages) {
                          if (
                            endPage <
                            filteredAndPaginatedData.totalPages - 1
                          ) {
                            pages.push("...");
                          }
                          pages.push(filteredAndPaginatedData.totalPages);
                        }
                      }

                      return pages.map((page, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            typeof page === "number"
                              ? handlePageChange(page)
                              : null
                          }
                          disabled={typeof page !== "number"}
                          className={`px-3 sm:px-3 py-3 sm:py-2 rounded-lg border transition-colors duration-200 min-w-[40px] sm:min-w-[40px] text-sm touch-manipulation ${
                            page === filteredAndPaginatedData.currentPage
                              ? "bg-linear-to-r from-[#0069aa] to-[#0077c2] text-white border-transparent"
                              : typeof page === "number"
                                ? "border-gray-300 hover:bg-gray-100"
                                : "border-transparent text-gray-400 cursor-default"
                          }`}
                        >
                          {page}
                        </button>
                      ));
                    })()}

                    {/* Next button */}
                    <button
                      onClick={() =>
                        handlePageChange(
                          filteredAndPaginatedData.currentPage + 1,
                        )
                      }
                      disabled={!filteredAndPaginatedData.hasNextPage}
                      className="p-3 sm:p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-w-[44px] sm:min-w-[44px] touch-manipulation"
                    >
                      <ChevronRightIcon size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <CodeListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData || []}
        title={modalTitle}
        colorTheme={modalColorTheme}
      />
    </div>
  );
}
