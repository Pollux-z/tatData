"use client";
import Link from "next/link";
import { 
  Home, 
  Database, 
  Users, 
  MapPin, 
  TrendingUp, 
  BarChart3, 
  FileText, 
  Award, 
  Route, 
  Building,
  Globe,
  ChevronRight,
  ExternalLink,
  Code
} from "lucide-react";

const sitemapData = [
  {
    id: 1,
    title: "หน้าหลัก",
    description: "หน้าแรกของเว็บไซต์ มาตรฐานข้อมูลการท่องเที่ยวแห่งประเทศไทย",
    icon: Home,
    href: "/",
    colorTheme: {
          gradient: "from-[#0069aa] to-[#0077c2]",
    bgGradient: "from-[#0069aa]/10 to-[#0077c2]/10",
    borderColor: "border-[#0069aa]/20",
    textColor: "text-[#0069aa]",
    iconColor: "text-[#0069aa]"
    }
  },
  {
    id: 2,
    title: "ชุดข้อมูลมาตรฐาน",
    description: "ชุดข้อมูลมาตรฐานการท่องเที่ยวแห่งประเทศไทย",
    icon: Database,
    colorTheme: {
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50/50 to-cyan-50/50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      iconColor: "text-blue-600"
    },
    sections: [
      {
        title: "ปี พ.ศ.2568",
        items: [
          {
            name: "ชุดข้อมูลลูกค้า/พันธมิตร",
            href: "/datasets/partners",
            description: "ข้อมูลลูกค้าและพันธมิตรทางการท่องเที่ยว"
          },
          {
            name: "ชุดข้อมูลมาตรฐานสินค้า",
            href: "/datasets/products",
            description: "มาตรฐานสินค้าและบริการการท่องเที่ยว"
          },
          {
            name: "ชุดข้อมูลสถานการณ์การท่องเที่ยว",
            href: "/datasets/tourism-situation",
            description: "ข้อมูลสถานการณ์และแนวโน้มการท่องเที่ยว"
          },
          {
            name: "ชุดข้อมูลเส้นทางท่องเที่ยว",
            href: "/datasets/tourist-routes",
            description: "เส้นทางและจุดหมายปลายทางการท่องเที่ยว"
          },
          {
            name: "ชุดข้อมูลพฤติกรรมนักท่องเที่ยวชาวไทย",
            href: "/datasets/thai-tourist-behavior",
            description: "พฤติกรรมและความต้องการของนักท่องเที่ยวชาวไทย"
          }
        ]
      },
      {
        title: "ปี พ.ศ.2567",
        items: [
          {
            name: "ชุดข้อมูลร้องเรียน",
            href: "/datasets/customer-appeal",
            description: "ข้อมูลการร้องเรียนและการจัดการปัญหา"
          },
          {
            name: "ชุดข้อมูลกิจกรรมท่องเที่ยว",
            href: "/datasets/tourism-activity",
            description: "กิจกรรมและโปรแกรมการท่องเที่ยว"
          },
          {
            name: "ชุดข้อมูลแหล่งท่องเที่ยว",
            href: "/datasets/tourism-attraction",
            description: "แหล่งท่องเที่ยวและสถานที่สำคัญ"
          },
          {
            name: "ชุดข้อมูลธุรกิจหลัก/ธุรกิจเกี่ยวเนื่องส่วนของที่พัก",
            href: "/datasets/accommodation-business",
            description: "ข้อมูลธุรกิจที่พักและโรงแรม"
          },
          {
            name: "ชุดข้อมูลธุรกิจหลัก/ธุรกิจเกี่ยวเนื่องส่วนของภัตตาคารร้านอาหาร",
            href: "/datasets/restaurant-business",
            description: "ข้อมูลร้านอาหารและภัตตาคาร"
          },
          {
            name: "ชุดข้อมูลธุรกิจหลัก/ธุรกิจเกี่ยวเนื่องส่วนของร้านขายของที่ระลึก",
            href: "/datasets/souvenir-business",
            description: "ข้อมูลร้านขายของที่ระลึกและสินค้า"
          },
          {
            name: "ชุดข้อมูลพฤติกรรมนักท่องเที่ยวระหว่างประเทศ",
            href: "/datasets/international-tourist-behavior",
            description: "พฤติกรรมของนักท่องเที่ยวต่างชาติ"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "รายการรหัสข้อมูล",
    description: "รหัสและมาตรฐานข้อมูลที่ใช้ในการจัดหมวดหมู่",
    icon: FileText,
    href: "/codelist",
    colorTheme: {
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50/50 to-teal-50/50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700",
      iconColor: "text-emerald-600"
    },
    categories: [
      {
        name: "มาตรฐานข้อมูลสินค้า",
        icon: Award,
        items: [
          "ประเภทผู้ประกอบการ",
          "ระดับดาว STAR",
          "จังหวัด",
          "อำเภอ",
          "ตำบล",
          "ประเภท SHA",
          "ประเภทรางวัล TTA"
        ]
      },
      {
        name: "ชุดข้อมูลเส้นทางท่องเที่ยว",
        icon: Route,
        items: [
          "ประเภทเส้นทางการท่องเที่ยว",
          "ฤดูกาลที่เหมาะสม",
          "กลุ่มเป้าหมาย"
        ]
      },
      {
        name: "มาตรฐานข้อมูลลูกค้า/พันธมิตร",
        icon: Users,
        items: [
          "กลุ่มอายุ",
          "เพศ",
          "สถานะภาพ",
          "ระดับการศึกษา",
          "อาชีพ",
          "กลุ่มรายได้",
          "การมีส่วนร่วมในการวางแผนท่องเที่ยว",
          "การออกค่าใช้จ่ายในการท่องเที่ยว",
          "ความถี่ในการท่องเที่ยวประเทศไทย"
        ]
      },
      {
        name: "ข้อมูลสถานการณ์การท่องเที่ยว",
        icon: TrendingUp,
        items: [
          "ประเภทเอกสาร",
          "ความถี่การปรับปรุง",
          "ภาษา",
          "สถานะเอกสาร",
          "รูปแบบไฟล์",
          "ประเภทสัญญาอนุญาต"
        ]
      },
      {
        name: "ข้อมูลพฤติกรรมนักท่องเที่ยวชาวไทย",
        icon: BarChart3,
        items: [
          "รหัสเพศ",
          "รหัสช่วงอายุ",
          "รหัสอาชีพ",
          "รหัสช่วงรายได้",
          "รหัสช่วงรายได้ครอบครัว",
          "รหัสสถานภาพสมรส",
          "รหัสประเภทที่พัก"
        ]
      },
      {
        name: "ข้อมูลพฤติกรรมนักท่องเที่ยวระหว่างประเทศ",
        icon: Globe,
        items: [
          "รหัสภูมิภาค",
          "รหัสประเทศ",
          "รหัสพฤติกรรมการเดินทาง",
          "รหัสประเภทการเดินทาง"
        ]
      },
      {
        name: "ข้อมูลธุรกิจที่พัก",
        icon: Building,
        items: [
          "ประเภทที่พัก",
          "ระดับมาตรฐาน",
          "สิ่งอำนวยความสะดวก",
          "ประเภทบริการ"
        ]
      },
      {
        name: "ข้อมูลร้านอาหาร",
        icon: Building,
        items: [
          "ประเภทร้านอาหาร",
          "ระดับมาตรฐาน",
          "ประเภทอาหาร",
          "สิ่งอำนวยความสะดวก"
        ]
      },
      {
        name: "ข้อมูลร้านขายของที่ระลึก",
        icon: Building,
        items: [
          "ประเภทสินค้า",
          "ประเภทร้านค้า",
          "ระดับมาตรฐาน",
          "ประเภทการขาย"
        ]
      },
      {
        name: "ข้อมูลกิจกรรมท่องเที่ยว",
        icon: MapPin,
        items: [
          "ประเภทกิจกรรม",
          "ระดับความยาก",
          "ช่วงเวลาที่เหมาะสม",
          "กลุ่มเป้าหมาย"
        ]
      },
      {
        name: "ข้อมูลแหล่งท่องเที่ยว",
        icon: MapPin,
        items: [
          "ประเภทแหล่งท่องเที่ยว",
          "ระดับความนิยม",
          "ฤดูกาลที่เหมาะสม",
          "สิ่งอำนวยความสะดวก"
        ]
      },
      {
        name: "ข้อมูลร้องเรียน",
        icon: FileText,
        items: [
          "ประเภทการร้องเรียน",
          "ระดับความรุนแรง",
          "สถานะการดำเนินการ",
          "ประเภทการแก้ไข"
        ]
      }
    ]
  },
  {
    id: 4,
    title: "ตัวอย่าง API",
    description: "เอกสารและตัวอย่างการใช้งาน API ของ มาตรฐานข้อมูลการท่องเที่ยวแห่งประเทศไทย",
    icon: Code,
    href: "/example-api",
    colorTheme: {
      gradient: "from-rose-500 to-pink-600",
      bgGradient: "from-rose-50/50 to-pink-50/50",
      borderColor: "border-rose-200",
      textColor: "text-rose-700",
      iconColor: "text-rose-600"
    }
  },
  {
    id: 5,
    title: "คู่มือการใช้งาน",
    description: "คู่มือการใช้งานระบบมาตรฐานข้อมูลการท่องเที่ยวแห่งประเทศไทย",
    icon: FileText,
    href: "/manual",
    colorTheme: {
      gradient: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-50/50 to-purple-50/50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-700",
      iconColor: "text-indigo-600"
    }
  },
  {
    id: 6,
    title: "เอกสารและทรัพยากร",
    description: "เอกสาร PDF, XML Schema และไฟล์ข้อมูล",
    icon: Globe,
    colorTheme: {
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50/50 to-pink-50/50",
      borderColor: "border-purple-200",
      textColor: "text-purple-700",
      iconColor: "text-purple-600"
    },
    sections: [
      {
        title: "เอกสาร PDF",
        items: [
          {
            name: "1customer-partner-data.pdf",
            href: "/PDF/1customer-partner-data.pdf",
            description: "เอกสารข้อมูลลูกค้าและพันธมิตร"
          },
          {
            name: "2situation-data.pdf",
            href: "/PDF/2situation-data.pdf",
            description: "เอกสารข้อมูลสถานการณ์การท่องเที่ยว"
          },
          {
            name: "3tourism-routes-data.pdf",
            href: "/PDF/3tourism-routes-data.pdf",
            description: "เอกสารข้อมูลเส้นทางท่องเที่ยว"
          },
          {
            name: "4product-standards.pdf",
            href: "/PDF/4product-standards.pdf",
            description: "เอกสารมาตรฐานสินค้า"
          },
          {
            name: "5thai-tourist-behavior-data.pdf",
            href: "/PDF/5thai-tourist-behavior-data.pdf",
            description: "เอกสารพฤติกรรมนักท่องเที่ยวชาวไทย"
          },
          {
            name: "6customer-appeal.pdf",
            href: "/PDF/6customer-appeal.pdf",
            description: "เอกสารข้อมูลร้องเรียน"
          },
          {
            name: "7tourism-activity.pdf",
            href: "/PDF/7tourism-activity.pdf",
            description: "เอกสารข้อมูลกิจกรรมท่องเที่ยว"
          },
          {
            name: "8tourism-attraction.pdf",
            href: "/PDF/8tourism-attraction.pdf",
            description: "เอกสารข้อมูลแหล่งท่องเที่ยว"
          },
          {
            name: "9accommodation-business.pdf",
            href: "/PDF/9accommodation-business.pdf",
            description: "เอกสารข้อมูลธุรกิจที่พัก"
          },
          {
            name: "10restaurant-business.pdf",
            href: "/PDF/10restaurant-business.pdf",
            description: "เอกสารข้อมูลธุรกิจร้านอาหาร"
          },
          {
            name: "11souvenir-business.pdf",
            href: "/PDF/11souvenir-business.pdf",
            description: "เอกสารข้อมูลธุรกิจร้านขายของที่ระลึก"
          },
          {
            name: "12inter-tourist-behavior.pdf",
            href: "/PDF/12inter-tourist-behavior.pdf",
            description: "เอกสารข้อมูลพฤติกรรมนักท่องเที่ยวระหว่างประเทศ"
          },
          {
            name: "คู่มือการใช้งานมาตรฐานข้อมูล.pdf",
            href: "/PDF/คู่มือการใช้งานมาตรฐานข้อมูล.pdf",
            description: "คู่มือการใช้งานระบบมาตรฐานข้อมูล"
          }
        ]
      },
      {
        title: "XML Schema",
        items: [
          {
            name: "custromer_profile.xsd",
            href: "/XML/custromer_profile.xsd",
            description: "Schema ข้อมูลลูกค้าและพันธมิตร"
          },
          {
            name: "standardized_product.xsd",
            href: "/XML/standardized_product.xsd",
            description: "Schema มาตรฐานสินค้า"
          },
          {
            name: "Thai_tourist_behavior.xsd",
            href: "/XML/Thai_tourist_behavior.xsd",
            description: "Schema พฤติกรรมนักท่องเที่ยวชาวไทย"
          },
          {
            name: "Tourist_route.xsd",
            href: "/XML/Tourist_route.xsd",
            description: "Schema เส้นทางท่องเที่ยว"
          },
          {
            name: "Toutist_situation.xsd",
            href: "/XML/Toutist_situation.xsd",
            description: "Schema สถานการณ์การท่องเที่ยว"
          },
          {
            name: "accommodation_business.xsd",
            href: "/XML/accommodation_business.xsd",
            description: "Schema ธุรกิจที่พัก"
          },
          {
            name: "restaurant_business.xsd",
            href: "/XML/restaurant_business.xsd",
            description: "Schema ธุรกิจร้านอาหาร"
          },
          {
            name: "souvenir_business.xsd",
            href: "/XML/souvenir_business.xsd",
            description: "Schema ธุรกิจร้านขายของที่ระลึก"
          },
          {
            name: "tourism_activities.xsd",
            href: "/XML/tourism_activities.xsd",
            description: "Schema กิจกรรมท่องเที่ยว"
          },
          {
            name: "tourism_attraction.xsd",
            href: "/XML/tourism_attraction.xsd",
            description: "Schema แหล่งท่องเที่ยว"
          },
          {
            name: "inter_tourist_behavior.xsd",
            href: "/XML/inter_tourist_behavior.xsd",
            description: "Schema พฤติกรรมนักท่องเที่ยวระหว่างประเทศ"
          },
          {
            name: "appeal.xsd",
            href: "/XML/appeal.xsd",
            description: "Schema ข้อมูลร้องเรียน"
          }
        ]
      },
      {
        title: "Data Dictionary",
        items: [
          {
            name: "DataDictionaryชุดข้อมูลลูกค้า_พันธมิตร.xlsx",
            href: "/datadict/DataDictionaryชุดข้อมูลลูกค้า_พันธมิตร.xlsx",
            description: "พจนานุกรมข้อมูลลูกค้าและพันธมิตร"
          },
          {
            name: "DataDictionaryชุดข้อมูลเส้นทางท่องเที่ยว.xlsx",
            href: "/datadict/DataDictionaryชุดข้อมูลเส้นทางท่องเที่ยว.xlsx",
            description: "พจนานุกรมข้อมูลเส้นทางท่องเที่ยว"
          },
          {
            name: "DataDictionaryชุดพฤติกรรม.xlsx",
            href: "/datadict/DataDictionaryชุดพฤติกรรม.xlsx",
            description: "พจนานุกรมข้อมูลพฤติกรรม"
          },
          {
            name: "DataDictionaryชุดมาตรฐานสินค้า.xlsx",
            href: "/datadict/DataDictionaryชุดมาตรฐานสินค้า.xlsx",
            description: "พจนานุกรมมาตรฐานสินค้า"
          },
          {
            name: "DataDictionaryชุดสถานการณ์การท่องเที่ยวกองกลยุทธ์.xlsx",
            href: "/datadict/DataDictionaryชุดสถานการณ์การท่องเที่ยวกองกลยุทธ์.xlsx",
            description: "พจนานุกรมสถานการณ์การท่องเที่ยว"
          },
          {
            name: "DataDictionaryชุดข้อมูลกิจกรรมท่องเที่ยว.xlsx",
            href: "/datadict/DataDictionaryชุดข้อมูลกิจกรรมท่องเที่ยว.xlsx",
            description: "พจนานุกรมกิจกรรมท่องเที่ยว"
          },
          {
            name: "DataDictionaryชุดข้อมูลธุรกิจหลัก-ธุรกิจเกี่ยวเนื่องส่วนของที่พัก.xlsx",
            href: "/datadict/DataDictionaryชุดข้อมูลธุรกิจหลัก-ธุรกิจเกี่ยวเนื่องส่วนของที่พัก.xlsx",
            description: "พจนานุกรมธุรกิจที่พัก"
          },
          {
            name: "DataDictionaryชุดข้อมูลธุรกิจหลัก-ธุรกิจเกี่ยวเนื่องส่วนของภัตตาคารร้านอาหาร.xlsx",
            href: "/datadict/DataDictionaryชุดข้อมูลธุรกิจหลัก-ธุรกิจเกี่ยวเนื่องส่วนของภัตตาคารร้านอาหาร.xlsx",
            description: "พจนานุกรมธุรกิจร้านอาหาร"
          },
          {
            name: "DataDictionaryชุดข้อมูลธุรกิจหลัก-ธุรกิจเกี่ยวเนื่องส่วนของร้านขายของที่ระลึก.xlsx",
            href: "/datadict/DataDictionaryชุดข้อมูลธุรกิจหลัก-ธุรกิจเกี่ยวเนื่องส่วนของร้านขายของที่ระลึก.xlsx",
            description: "พจนานุกรมธุรกิจร้านขายของที่ระลึก"
          },
          {
            name: "DataDictionaryชุดข้อมูลพฤติกรรมนักท่องเที่ยว(ระหว่าง).xlsx",
            href: "/datadict/DataDictionaryชุดข้อมูลพฤติกรรมนักท่องเที่ยว(ระหว่าง).xlsx",
            description: "พจนานุกรมพฤติกรรมนักท่องเที่ยวระหว่างประเทศ"
          },
          {
            name: "DataDictionaryชุดข้อมูลร้องเรียน.xlsx",
            href: "/datadict/DataDictionaryชุดข้อมูลร้องเรียน.xlsx",
            description: "พจนานุกรมข้อมูลร้องเรียน"
          },
          {
            name: "DataDictionaryชุดข้อมูลแหล่งท่องเที่ยว.xlsx",
            href: "/datadict/DataDictionaryชุดข้อมูลแหล่งท่องเที่ยว.xlsx",
            description: "พจนานุกรมแหล่งท่องเที่ยว"
          }
        ]
      }
    ]
  }
];

const SitemapItem = ({ item, colorTheme }) => (
  <Link href={item.href} className="group">
    <div className={`flex items-center justify-between p-4 rounded-xl border ${colorTheme.borderColor} bg-white hover:bg-gradient-to-r ${colorTheme.bgGradient} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-gradient-to-r ${colorTheme.gradient}`}>
          <ExternalLink size={20} className="text-white" />
        </div>
        <div>
          <h3 className={`font-semibold ${colorTheme.textColor} group-hover:text-slate-800 transition-colors duration-300`}>
            {item.name}
          </h3>
          {item.description && (
            <p className="text-sm text-slate-500 mt-1">
              {item.description}
            </p>
          )}
        </div>
      </div>
      {/* <div className="flex items-center gap-2">
        {item.status === "coming-soon" && (
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
            เร็วๆ นี้
          </span>
        )}
        <ExternalLink size={16} className={`${colorTheme.iconColor} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
      </div> */}
    </div>
  </Link>
);

const CategorySection = ({ section, colorTheme }) => (
  <div className="mb-8">
    <h4 className={`text-lg font-semibold mb-4 ${colorTheme.textColor} flex items-center gap-2`}>
      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorTheme.gradient}`}></div>
      {section.title}
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {section.items.map((item, index) => (
        <SitemapItem key={index} item={item} colorTheme={colorTheme} />
      ))}
    </div>
  </div>
);

const CodeListCategory = ({ category, colorTheme }) => (
  <div className="mb-6">
    <h4 className={`text-lg font-semibold mb-3 ${colorTheme.textColor} flex items-center gap-2`}>
      <category.icon size={20} className={colorTheme.iconColor} />
      {category.name}
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {category.items.map((item, index) => (
        <div key={index} className="p-3 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-colors duration-200">
          <span className="text-sm text-slate-700">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

const MainSection = ({ section }) => {
  const IconComponent = section.icon;

  return (
    <div className={`bg-white rounded-3xl p-6 shadow-lg border ${section.colorTheme.borderColor} hover:shadow-xl transition-all duration-500 hover:-translate-y-2`}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${section.colorTheme.gradient} shadow-lg`}>
          <IconComponent size={24} className="text-white" />
        </div>
        <div>
          <h3 className={`text-xl font-bold ${section.colorTheme.textColor}`}>
            {section.title}
          </h3>
          {section.description && (
            <p className="text-slate-600 mt-1">
              {section.description}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      {section.href ? (
        // Single page link
        <Link href={section.href} className="group">
          <div className={`flex items-center justify-between p-4 rounded-xl border ${section.colorTheme.borderColor} hover:bg-gradient-to-r ${section.colorTheme.bgGradient} transition-all duration-300 hover:shadow-lg`}>
            <span className={`font-medium ${section.colorTheme.textColor} group-hover:text-slate-800 transition-colors duration-300`}>
              ดูรายละเอียด
            </span>
            <ChevronRight size={20} className={`${section.colorTheme.iconColor} group-hover:translate-x-1 transition-transform duration-300`} />
          </div>
        </Link>
      ) : section.sections ? (
        // Multiple sections
        <div className="space-y-6">
          {section.sections.map((subSection, index) => (
            <CategorySection key={index} section={subSection} colorTheme={section.colorTheme} />
          ))}
        </div>
      ) : section.categories ? (
        // Code list categories
        <div className="space-y-6">
          {section.categories.map((category, index) => (
            <CodeListCategory key={index} category={category} colorTheme={section.colorTheme} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default function SitemapPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#0069aa] to-[#0077c2] shadow-lg">
            <Globe size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
            แผนผังเว็บไซต์
          </h1>
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-[#0069aa] to-[#0077c2] mx-auto rounded-full"></div>
      </div>

      {/* Sitemap Sections */}
      <div className="space-y-8 mb-16">
        {sitemapData.map((section) => (
          <MainSection key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}
