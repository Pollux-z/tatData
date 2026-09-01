"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play, ArrowRight, Database, Users, MapPin, TrendingUp, BarChart3, Search, ChevronDown } from "lucide-react";
import Link from "next/link";

const images = [
  "/banner/banner.png",
];

const datasetCards = [
  {
    title: "ชุดข้อมูลลูกค้า/พันธมิตร",
    href: "/datasets/partners",
    image: "/images/customer_partner_data.png",
    colorTheme: {
      gradient: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-50/50 to-purple-50/50",
      borderColor: "border-indigo-200",
      hoverBorderColor: "group-hover:border-indigo-400",
      textColor: "group-hover:text-indigo-700",
      overlayGradient: "from-indigo-500/20 to-purple-600/20",
      indicatorGradient: "from-indigo-500 to-purple-600"
    }
  },
  {
    title: "ชุดข้อมูลมาตรฐานสินค้า",
    href: "/datasets/products",
    image: "/images/product_standard.png",
    colorTheme: {
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50/50 to-cyan-50/50",
      borderColor: "border-blue-200",
      hoverBorderColor: "group-hover:border-blue-400",
      textColor: "group-hover:text-blue-700",
      overlayGradient: "from-blue-500/20 to-cyan-600/20",
      indicatorGradient: "from-blue-500 to-cyan-600"
    }
  },
  {
    title: "ชุดข้อมูลสถานการณ์การท่องเที่ยว",
    href: "/datasets/tourism-situation",
    image: "/images/travel_circumstance_data.png",
    colorTheme: {
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50/50 to-teal-50/50",
      borderColor: "border-emerald-200",
      hoverBorderColor: "group-hover:border-emerald-400",
      textColor: "group-hover:text-emerald-700",
      overlayGradient: "from-emerald-500/20 to-teal-600/20",
      indicatorGradient: "from-emerald-500 to-teal-600"
    }
  },
  {
    title: "ชุดข้อมูลเส้นทางท่องเที่ยว",
    href: "/datasets/tourist-routes",
    image: "/images/travel_path_data.png",
    colorTheme: {
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50/50 to-orange-50/50",
      borderColor: "border-amber-200",
      hoverBorderColor: "group-hover:border-amber-400",
      textColor: "group-hover:text-amber-700",
      overlayGradient: "from-amber-500/20 to-orange-600/20",
      indicatorGradient: "from-amber-500 to-orange-600"
    }
  },
  {
    title: "ชุดข้อมูลพฤติกรรมนักท่องเที่ยวชาวไทย",
    href: "/datasets/thai-tourist-behavior",
    image: "/images/thai_tourist_habit.png",
    colorTheme: {
      gradient: "from-rose-500 to-pink-600",
      bgGradient: "from-rose-50/50 to-pink-50/50",
      borderColor: "border-rose-200",
      hoverBorderColor: "group-hover:border-rose-400",
      textColor: "group-hover:text-rose-700",
      overlayGradient: "from-rose-500/20 to-pink-600/20",
      indicatorGradient: "from-rose-500 to-pink-600"
    }
  },
  {
    title: "ชุดข้อมูลร้องเรียน",
    href: "/datasets/customer-appeal",
    image: "/images/appeal.png",
    colorTheme: {
      gradient: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-50/50 to-purple-50/50",
      borderColor: "border-indigo-200",
      hoverBorderColor: "group-hover:border-indigo-400",
      textColor: "group-hover:text-indigo-700",
      overlayGradient: "from-indigo-500/20 to-purple-600/20",
      indicatorGradient: "from-indigo-500 to-purple-600"
    }
  },
  {
    title: "ขุดข้อมูลกิจกรรมท่องเที่ยว",
    href: "/datasets/tourism-activity",
    image: "/images/travel_activity.png",
    colorTheme: {
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50/50 to-cyan-50/50",
      borderColor: "border-blue-200",
      hoverBorderColor: "group-hover:border-blue-400",
      textColor: "group-hover:text-blue-700",
      overlayGradient: "from-blue-500/20 to-cyan-600/20",
      indicatorGradient: "from-blue-500 to-cyan-600"
    }
  },
  {
    title: "ชุดข้อมูลแหล่งท่องเที่ยว",
    href: "/datasets/tourism-attraction",
    image: "/images/travel_spot.png",
    colorTheme: {
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50/50 to-teal-50/50",
      borderColor: "border-emerald-200",
      hoverBorderColor: "group-hover:border-emerald-400",
      textColor: "group-hover:text-emerald-700",
      overlayGradient: "from-emerald-500/20 to-teal-600/20",
      indicatorGradient: "from-emerald-500 to-teal-600"
    }
  },
  {
    title: "ชุดข้อมูลธุรกิจหลัก/ธุรกิจเกี่ยวเนื่องส่วนของที่พัก",
    href: "/datasets/accommodation-business",
    image: "/images/tourist_resident.png",
    colorTheme: {
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50/50 to-orange-50/50",
      borderColor: "border-amber-200",
      hoverBorderColor: "group-hover:border-amber-400",
      textColor: "group-hover:text-amber-700",
      overlayGradient: "from-amber-500/20 to-orange-600/20",
      indicatorGradient: "from-amber-500 to-orange-600"
    }
  },
  {
    title: "ชุดข้อมูลธุรกิจหลัก/ธุรกิจเกี่ยวเนื่องส่วนของภัตตาคารร้านอาหาร",
    href: "/datasets/restaurant-business",
    image: "/images/tourism_restaurant.png",
    colorTheme: {
      gradient: "from-rose-500 to-pink-600",
      bgGradient: "from-rose-50/50 to-pink-50/50",
      borderColor: "border-rose-200",
      hoverBorderColor: "group-hover:border-rose-400",
      textColor: "group-hover:text-rose-700",
      overlayGradient: "from-rose-500/20 to-pink-600/20",
      indicatorGradient: "from-rose-500 to-pink-600"
    }
  },
  {
    title: "ชุดข้อมูลธุรกิจหลัก/ธุรกิจเกี่ยวเนื่องส่วนของร้านขายของที่ระลึก",
    href: "/datasets/souvenir-business",
    image: "/images/tourism_souvenir.png",
    colorTheme: {
      gradient: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-50/50 to-purple-50/50",
      borderColor: "border-indigo-200",
      hoverBorderColor: "group-hover:border-indigo-400",
      textColor: "group-hover:text-indigo-700",
      overlayGradient: "from-indigo-500/20 to-purple-600/20",
      indicatorGradient: "from-indigo-500 to-purple-600"
    }
  },
  {
    title: "ชุดข้อมูลพฤติกรรมนักท่องเที่ยวระหว่างประเทศ",
    href: "/datasets/international-tourist-behavior",
    image: "/images/inter_tourist_behavior.png",
    colorTheme: {
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50/50 to-cyan-50/50",
      borderColor: "border-blue-200",
      hoverBorderColor: "group-hover:border-blue-400",
      textColor: "group-hover:text-blue-700",
      overlayGradient: "from-blue-500/20 to-cyan-600/20",
      indicatorGradient: "from-blue-500 to-cyan-600"
    }
  },
  {
    title: "ชุดข้อมูลการบิน",
    href: "/datasets/flight-data",
    image: "/images/placeholder.png",
    colorTheme: {
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50/50 to-teal-50/50",
      borderColor: "border-emerald-200",
      hoverBorderColor: "group-hover:border-emerald-400",
      textColor: "group-hover:text-emerald-700",
      overlayGradient: "from-emerald-500/20 to-teal-600/20",
      indicatorGradient: "from-emerald-500 to-teal-600"
    }
  },
  {
    title: "ชุดข้อมูลสถิตินักท่องเที่ยวระหว่างประเทศ",
    href: "/datasets/international-tourist-statistics",
    image: "/images/placeholder.png",
    colorTheme: {
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50/50 to-orange-50/50",
      borderColor: "border-amber-200",
      hoverBorderColor: "group-hover:border-amber-400",
      textColor: "group-hover:text-amber-700",
      overlayGradient: "from-amber-500/20 to-orange-600/20",
      indicatorGradient: "from-amber-500 to-orange-600"
    }
  },
  {
    title: "ชุดข้อมูลอัตราการเข้าพักเฉลี่ยของสถานพักแรม",
    href: "/datasets/occupancy-rate",
    image: "/images/placeholder.png",
    colorTheme: {
      gradient: "from-rose-500 to-pink-600",
      bgGradient: "from-rose-50/50 to-pink-50/50",
      borderColor: "border-rose-200",
      hoverBorderColor: "group-hover:border-rose-400",
      textColor: "group-hover:text-rose-700",
      overlayGradient: "from-rose-500/20 to-pink-600/20",
      indicatorGradient: "from-rose-500 to-pink-600"
    }
  },
  {
    title: "ชุดข้อมูลสถานการณ์การท่องเที่ยว",
    href: "/datasets/tourism-situation-standard",
    image: "/images/travel_circumstance_data.png",
    colorTheme: {
      gradient: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-50/50 to-purple-50/50",
      borderColor: "border-indigo-200",
      hoverBorderColor: "group-hover:border-indigo-400",
      textColor: "group-hover:text-indigo-700",
      overlayGradient: "from-indigo-500/20 to-purple-600/20",
      indicatorGradient: "from-indigo-500 to-purple-600"
    }
  },
  {
    title: "ชุดข้อมูลเสียงจากลูกค้า",
    href: "/datasets/voice-of-customer",
    image: "/images/appeal.png",
    colorTheme: {
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50/50 to-cyan-50/50",
      borderColor: "border-blue-200",
      hoverBorderColor: "group-hover:border-blue-400",
      textColor: "group-hover:text-blue-700",
      overlayGradient: "from-blue-500/20 to-cyan-600/20",
      indicatorGradient: "from-blue-500 to-cyan-600"
    }
  }
];

// Reusable Dataset Card Component
const DatasetCard = ({ card }) => (
  <Link href={card.href} className="group h-full">
    <div className={`relative bg-white h-full rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-slate-100 hover:border-slate-200 overflow-hidden group-hover:bg-gradient-to-br ${card.colorTheme.bgGradient} flex flex-col`}>
      {/* Image container with enhanced styling */}
      <div className="relative z-10 mb-4 flex-shrink-0">
        <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-105">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Image overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${card.colorTheme.overlayGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
        </div>

        {/* Decorative ring */}
        <div className={`absolute inset-0 mx-auto w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-2 ${card.colorTheme.borderColor} ${card.colorTheme.hoverBorderColor} transition-colors duration-500`}></div>
      </div>

      {/* Title with enhanced styling */}
      <h3 className={`relative z-10 text-sm sm:text-base md:text-lg leading-5 md:leading-6 font-semibold text-slate-800 ${card.colorTheme.textColor} transition-colors duration-300 flex-grow flex items-center justify-center text-center`}>
        {card.title}
      </h3>

      {/* Hover indicator */}
      <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r ${card.colorTheme.indicatorGradient} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-12`}></div>
    </div>
  </Link>
);

export default function Main() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCards, setVisibleCards] = useState(10);
  const [showAllCards, setShowAllCards] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Filter cards based on search term
  const filteredCards = datasetCards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show cards based on pagination
  const displayedCards = showAllCards ? filteredCards : filteredCards.slice(0, visibleCards);

  const handleShowMore = () => {
    if (showAllCards) {
      setShowAllCards(false);
      setVisibleCards(10);
    } else {
      setVisibleCards(prev => Math.min(prev + 10, filteredCards.length));
      if (visibleCards + 10 >= filteredCards.length) {
        setShowAllCards(true);
      }
    }
  };

  const scrollToSection = (sectionId, offset = 0) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section with Image Slider */}
      <div className="relative w-full max-w-7xl mx-auto px-6">
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-2xl">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((url, idx) => (
              <div
                key={idx}
                className="relative min-w-full h-full flex-shrink-0"
              >
                <Image
                  src={url}
                  alt={`Slide ${idx + 1}`}
                  fill
                  className="object-cover object-bottom"
                  sizes="100vw"
                  priority={idx === 0}
                />
                {/* Overlay gradient */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-[#021141]/30 to-black/0" /> */}
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          {/* <button
            onClick={handlePrev}
            className="cursor-pointer z-10 absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-1 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={24} className="text-[#0069aa]" />
          </button>
          <button
            onClick={handleNext}
            className="cursor-pointer z-10 absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-1 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={24} className="text-[#0069aa]" />
          </button> */}

          {/* Play/Pause button */}
          {/* <button
            onClick={() => setIsPlaying((prev) => !prev)}
            className="cursor-pointer z-10 absolute top-4 right-4 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-1 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isPlaying ? <Pause size={20} className="text-[#0069aa]" /> : <Play size={20} className="text-[#0069aa]" />}
          </button> */}

          {/* Dots indicator */}
          {/* <div className="absolute z-10 bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex 
                    ? "bg-white shadow-lg scale-125" 
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div> */}

          {/* Hero content overlay */}
          <div className="absolute inset-0 flex justify-start py-10 md:py-15 px-10 md:px-20">
            <div className="">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#0059aa] mb-2 drop-shadow-2xl" style={{ lineHeight: "1.2", textShadow: "2px 2px 4px rgba(0,0,0,0.2)" }}>
                มาตรฐานข้อมูล
              </h1>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#0059aa] mb-8 drop-shadow-2xl" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.2)" }}>
                การท่องเที่ยวแห่งประเทศไทย
              </h1>
              <div className="flex gap-4">
                <button
                  onClick={() => scrollToSection('dataset', 64)}
                  className="cursor-pointer text-sm sm:text-base bg-white text-[#0059aa] px-3 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  เริ่มต้นใช้งาน
                </button>
                <a href="/manual" className=" cursor-pointer text-sm sm:text-base bg-gradient-to-r from-[#004a91] to-[#0059aa] text-white px-3 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-[#0059aa] transition-all duration-300 shadow-lg hover:shadow-xl">
                  คู่มือการใช้งาน
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Section */}
      <div className="mt-20 w-full max-w-7xl mx-auto px-6">
        <div className="text-center">
          <p className="text-base xs:text-lg md:text-xl text-left indent-[40px] text-slate-600 max-w-4xl mx-auto leading-relaxed">
            การท่องเที่ยวแห่งประเทศไทย (ททท.) ได้จัดทำมาตรฐานข้อมูลเพื่อสนับสนุนการเชื่อมโยงและแลกเปลี่ยนข้อมูลดิจิทัลด้านการท่องเที่ยวระหว่างหน่วยงานภาครัฐและเอกชน เพื่อเพิ่มประสิทธิภาพการเข้าถึงข้อมูลให้เป็นไปได้อย่างสะดวก รวดเร็ว และอัตโนมัติ โดยมุ่งเน้นการสร้างมาตรฐานที่เป็นสากล รองรับการใช้งานและบูรณาการข้อมูลได้อย่างต่อเนื่อง อำนวยความสะดวกให้ผู้เกี่ยวข้องเข้าถึงข้อมูล เพื่อขับเคลื่อนนวัตกรรมและบริการใหม่ ๆ ตลอดจนยกระดับองค์กรให้มีสมรรถนะสูงผ่านฐานข้อมูลดิจิทัลที่ได้มาตรฐาน โดยเว็บไซต์นี้จะเป็นช่องทางหลักในการเผยแพร่มาตรฐานข้อมูล และพร้อมรองรับการแลกเปลี่ยนข้อมูลกับหน่วยงานภายในและหน่วยงานพันธมิตรทั้งภาครัฐและเอกชน ให้นำไปใช้ประโยชน์ได้ต่อไป
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#004a91] to-[#0059aa] mx-auto mt-6 rounded-full"></div>
        </div>

        <div id="dataset" className="text-center mb-16 pt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            การจัดทำมาตรฐานข้อมูลของ <span className="text-[#0059aa]">ททท. </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#004a91] to-[#0059aa] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Search Filter */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="ค้นหาชุดข้อมูล..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCards(10);
                setShowAllCards(false);
              }}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-[#0069aa] focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
            />
          </div>
        </div>

        {/* Results count */}
        {searchTerm && (
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600">
              พบ {filteredCards.length} ชุดข้อมูลจากคำค้นหา {`"${searchTerm}"`}
            </p>
          </div>
        )}

        <div className="mt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-center text-center">
          {displayedCards.map((card, index) => (
            <div key={index} className="h-64 sm:h-72 md:h-80">
              <DatasetCard card={card} />
            </div>
          ))}
        </div>

        {/* Show More Button */}
        {filteredCards.length >= visibleCards && (
          <div className="text-center mt-8 mb-12">
            <button
              onClick={handleShowMore}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#004a91] to-[#0059aa] text-white px-8 py-3 rounded-full font-semibold hover:from-[#005a8f] hover:to-[#0069aa] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {showAllCards ? (
                <>
                  แสดงน้อยลง
                  <ChevronDown className="h-5 w-5 rotate-180 transition-transform duration-300" />
                </>
              ) : (
                <>
                  แสดงเพิ่มเติม ({filteredCards.length - visibleCards} รายการ)
                  <ChevronDown className="h-5 w-5 transition-transform duration-300" />
                </>
              )}
            </button>
          </div>
        )}

        {/* No results message */}
        {searchTerm && filteredCards.length === 0 && (
          <div className="text-center pb-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">ไม่พบชุดข้อมูล</h3>
            <p className="text-gray-500">ลองค้นหาด้วยคำอื่น หรือล้างการค้นหา</p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-[#0069aa] hover:text-[#005a8f] font-medium transition-colors duration-300"
            >
              ล้างการค้นหา
            </button>
          </div>
        )}

      </div>
    </div>
  );
}