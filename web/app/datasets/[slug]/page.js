import Image from "next/image";
import { notFound } from "next/navigation";
import { FileText, Download, Code, Database, FileSpreadsheet } from "lucide-react";
import DatasetPageClient from "./DatasetPageClient";

// Full metadata for each dataset category
const datasetMeta = {
  "partners": {
    title: "ชุดข้อมูลลูกค้า/พันธมิตร",
    logo: "/images/customer_partner_data.png",
    image: "/dataset/partner.png",
    pdf: "/PDF/1customer-partner-data.pdf",
    xsd: "/XML/custromer_profile.xsd",
    datadict: "/datadict/DataDictionaryชุดข้อมูลลูกค้า_พันธมิตร.xlsx",
    data_catalog: "https://datacatalog.tat.or.th/dataset/customer-data",
    description: `ชุดข้อมูลนี้เป็นการเก็บรวบรวมรายละเอียดของลูกค้าหรือนักท่องเที่ยวและวิเคราะห์ข้อมูลของนักท่องเที่ยว จากการลงทะเบียน การเข้าร่วมกิจกรรม การติดต่อขอรับบริการ หรือการตอบแบบสอบถาม ของททท. (ข้อมูลหลักในขณะนี้มีเฉพาะส่วนของข้อมูลลูกค้า) ซึ่งประกอบด้วยข้อมูลส่วนบุคคล อาทิชื่อ-นามสกุล เพศ อายุ ที่อยู่ ข้อมูลการติดต่อ อาชีพ ระดับรายได้ ความสนใจในการท่องเที่ยว ช่องทางการรับข่าวสาร และพฤติกรรมการโต้ตอบกับ ททท. ทั้งแบบออนไลน์และออฟไลน์ ซึ่งข้อมูลเหล่านี้ช่วยให้เกิดความเข้าใจลูกค้าอย่างรอบด้าน (360 องศา) และสามารถนำไปใช้พัฒนากลยุทธ์การตลาดและการสื่อสารแบบเฉพาะบุคคล รองรับการเชื่อมโยงกับระบบสารสนเทศต่าง ๆ ภายใน ททท. เพื่อให้เกิดความต่อเนื่องและแม่นยำในการให้บริการ เหมาะสำหรับการวางแผนด้านการตลาด การให้บริการลูกค้า และการบริหารข้อมูลเชิงกลยุทธ์`,
  },
  "products": {
    title: "ชุดข้อมูลมาตรฐานสินค้า",
    logo: "/images/product_standard.png",
    image: "/dataset/product_standard.jpg",
    pdf: "/PDF/4product-standards.pdf",
    xsd: "/XML/standardized_product.xsd",
    datadict: "/datadict/DataDictionaryชุดมาตรฐานสินค้า.xlsx",
    data_catalog: "https://datacatalog.tat.or.th/dataset/allstandard",
    description: `ชุดข้อมูลนี้จัดทำขึ้นเพื่อแสดงรายละเอียดของสถานประกอบการที่ได้รับการรับรองมาตรฐานหรือรางวัลต่าง ๆ จาก ททท. หรือหน่วยงานที่เกี่ยวข้อง เช่น มาตรฐาน SHA, STGs STAR, การรับรอง CF Hotels และรางวัล Thailand Tourism Awards (TTA) เป็นต้น ข้อมูลประกอบด้วยรายละเอียดของสินค้า/บริการ ชื่อและประเภทของผู้ประกอบการ ช่องทางติดต่อ เวลาทำการ ที่อยู่ และรางวัลที่ได้รับ การจัดโครงสร้างของข้อมูลมีความละเอียดและสัมพันธ์กันในระดับองค์ประกอบ เช่น การจำแนกประเภทสินค้า การระบุใบรับรองและวันหมดอายุ เพื่อให้มั่นใจว่าข้อมูลมีความน่าเชื่อถือและสามารถนำไปเผยแพร่ต่อสาธารณชนได้อย่างถูกต้อง ครบถ้วน และทันสมัย เหมาะสำหรับใช้สนับสนุนการส่งเสริมการตลาดและยกระดับคุณภาพสินค้าในอุตสาหกรรมท่องเที่ยวไทย`,
  },
  "tourism-situation": {
    title: "ชุดข้อมูลสถานการณ์การท่องเที่ยว",
    logo: "/images/travel_circumstance_data.png",
    image: "/dataset/tourism_situation.png",
    pdf: "/PDF/2situation-data.pdf",
    xsd: "/XML/Toutist_situation.xsd",
    datadict: "/datadict/DataDictionaryชุดสถานการณ์การท่องเที่ยวกองกลยุทธ์.xlsx",
    data_catalog: "https://datacatalog.tat.or.th/dataset/tourismsituation",
    description: `เป็นชุดข้อมูลที่จัดทำขึ้นโดยกองกลยุทธ์การตลาดของ ททท. เพื่อใช้วิเคราะห์และติดตามสถานการณ์การเดินทางท่องเที่ยว ทั้งในส่วนของนักท่องเที่ยวต่างชาติที่เดินทางเข้าไทย และผู้เยี่ยมเยือนภายในประเทศ ข้อมูลในชุดนี้มีลักษณะเป็นเอกสารรายงาน สถิติ รายปี รายเดือน หรือเหตุการณ์เฉพาะในแต่ละวาระ เช่น วิกฤต COVID หรือบางเทศกาล และบทวิเคราะห์ เช่น แนวโน้มพฤติกรรมนักท่องเที่ยวในแต่ละช่วง แหล่งที่มาของนักท่องเที่ยว รายได้จากการท่องเที่ยว ตลอดจนผลกระทบจากเหตุการณ์สำคัญ โดยมีข้อมูลอาทิ ชื่อเอกสาร คำอธิบาย วันที่เผยแพร่ หน่วยงานเจ้าของ และรูปแบบไฟล์ ช่วยให้การวางแผนกลยุทธ์การท่องเที่ยวเป็นไปอย่างทันสถานการณ์และมีข้อมูลรองรับ`,
  },
  "tourist-routes": {
    title: "ชุดข้อมูลเส้นทางท่องเที่ยว",
    logo: "/images/travel_path_data.png",
    image: "/dataset/tourism_route.png",
    pdf: "/PDF/3tourism-routes-data.pdf",
    xsd: "/XML/Tourist_route.xsd",
    datadict: "/datadict/DataDictionaryชุดข้อมูลเส้นทางท่องเที่ยว.xlsx",
    data_catalog: "https://datacatalog.tat.or.th/dataset/tourist-route",
    description: `ชุดข้อมูลนี้รวบรวมแผนเส้นทางท่องเที่ยวที่ได้รับการออกแบบโดย ททท. หรือหน่วยงานในพื้นที่ โดยแต่ละเส้นทางจะประกอบด้วยรายละเอียดครบถ้วน เช่น ชื่อเส้นทาง ประเภท จุดเริ่มต้นและสิ้นสุด จังหวัดที่เกี่ยวข้อง ช่วงเวลาที่เหมาะสม จำนวนวัน งบประมาณ กลุ่มเป้าหมาย ฤดูกาลที่เหมาะสม และหน่วยงานที่รับผิดชอบ พร้อมทั้งลิสต์สถานที่ท่องเที่ยวแต่ละแห่งที่รวมอยู่ในเส้นทางนั้น โดยระบุชื่อ คำอธิบาย พิกัด GPS เว็บไซต์ หรือแหล่งข้อมูลเพิ่มเติม ข้อมูลในชุดนี้ช่วยให้นักท่องเที่ยววางแผนการเดินทางได้สะดวก และสนับสนุนการพัฒนาโปรแกรมการเดินทางทั้งในและต่างประเทศ`,
  },
  "thai-tourist-behavior": {
    title: "ชุดข้อมูลพฤติกรรมนักท่องเที่ยวชาวไทย",
    logo: "/images/thai_tourist_habit.png",
    image: "/dataset/tourist_behavior.png",
    pdf: "/PDF/5thai-tourist-behavior-data.pdf",
    xsd: "/XML/Thai_tourist_behavior.xsd",
    datadict: "/datadict/DataDictionaryชุดพฤติกรรม.xlsx",
    data_catalog: "https://datacatalog.tat.or.th/dataset/tourist-behavior",
    description: `ชุดข้อมูลนี้พัฒนาจากโครงการสำรวจพฤติกรรมการเดินทางของนักท่องเที่ยวชาวไทย โดยครอบคลุมข้อมูลตลอดเส้นทางการเดินทาง (Customer Journey) ตั้งแต่ช่วงก่อนการเดินทาง เช่น วิธีวางแผน จุดมุ่งหมาย ระยะเวลาในการตัดสินใจ ช่วงระหว่างการเดินทาง เช่น จำนวนวันเดินทาง กิจกรรมที่ทำ ประเภทที่พัก ค่าใช้จ่าย และช่วงหลังการเดินทาง เช่น ความพึงพอใจ การแบ่งปันประสบการณ์ผ่านสื่อสังคมออนไลน์ ช่องทาง และหัวข้อที่ถูกนำเสนอ ซึ่งเป็นประโยชน์ต่อการกำหนดกลยุทธ์การตลาด การออกแบบสินค้าและบริการ และการส่งเสริมการท่องเที่ยวให้ตรงกับความต้องการจริง`,
  },
  "customer-appeal": {
    title: "ชุดข้อมูลการร้องเรียน",
    logo: "/images/appeal.png",
    image: "/dataset/appeal.png",
    pdf: "/PDF/6customer-appeal.pdf",
    xsd: "/XML/appeal.xsd",
    datadict: "/datadict/DataDictionaryชุดข้อมูลร้องเรียน.xlsx",
    data_catalog: "https://datacatalog.tat.or.th/dataset/voc",
    description: `ข้อมูลร้องเรียนเป็นข้อมูลที่จัดทำโดยกองเลขานุการและวิเทศสัมพันธ์และกองข่าวสารท่องเที่ยว ซึ่งข้อมูลถูกจัดเก็บอยู่ในระบบของศูนย์ประสานรับ-ส่งเรื่องร้องเรียนและข้อคิดเห็นด้านการท่องเที่ยวนั้น (http://th.tco.tat.or.th/) มีกองพัฒนาระบบเป็นผู้ดูแลระบบ แต่ข้อมูลเสียงจากลูกค้าในปัจจุบันเป็นข้อมูลที่มาจากการรายงานของ ททท. สำนักงานสาขาในประเทศ และสำนักงานสาขาต่างประเทศ ซึ่ง ททท. ต้องดำเนินการสรุปและจัดให้อยู่ในรูปแบบโครงสร้างข้อมูลที่สามารถนำไปประมวลผลได้จึงจะเกิดประโยชน์ได้ก่อนการนำมาจัดทำมาตรฐานข้อมูล ดังนั้น ชุดข้อมูลที่มีความพร้อมในการจัดทำมาตรฐานข้อมูลเพื่อต่อยอดไปยังการนำข้อมูลมาขึ้นทะเบียนบนระบบบัญชีข้อมูล คือ ชุดข้อมูลร้องเรียนเพียงชุดเดียว`,
  },
  "tourism-activity": {
    title: "ชุดข้อมูลกิจกรรมท่องเที่ยว",
    logo: "/images/travel_activity.png",
    image: "/dataset/tourism_activities.png",
    pdf: "/PDF/7tourism-activity.pdf",
    xsd: "/XML/tourism-activities.xsd",
    datadict: "/datadict/DataDictionaryชุดข้อมูลกิจกรรมท่องเที่ยว.xlsx",
    data_catalog: "https://datacatalog.tat.or.th/dataset/tourismactivity",
    description: `ชุดข้อมูลกิจกรรมท่องเที่ยวเป็นข้อมูลที่จัดทำโดยกองส่งเสริมกิจกรรม และกองสร้างสรรค์กิจกรรม สำนักงานสาขาในประเทศ ข้อมูลตัวอย่าง เช่น ข้อมูลกิจกรรมและประเพณีท่องเที่ยว ระดับกิจกรรม และประเภทกิจกรรม ข้อมูลช่วงเวลาจัดกิจกรรม ข้อมูลสถานที่จัดงาน ข้อมูลกลุ่มเป้าหมาย ข้อมูลช่องทางการติดต่อ โดยข้อมูลรายละเอียดของกิจกรรมจะถูกจัดเก็บอยู่บนระบบ TAT Intelligence Center (https://marketingdb.tat.or.th/) โดยมีกองพัฒนาระบบเป็นผู้ดูแลระบบ`,
  },
  "tourism-attraction": {
    title: "ชุดข้อมูลแหล่งท่องเที่ยว",
    logo: "/images/travel_spot.png",
    image: "/dataset/tourism_attraction.png",
    pdf: "/PDF/8tourism-attraction.pdf",
    xsd: "/XML/tourism-attraction.xsd",
    datadict: "/datadict/DataDictionaryชุดข้อมูลแหล่งท่องเที่ยว.xlsx",
    data_catalog: "https://datacatalog.tat.or.th/dataset/tourist-attraction",
    description: `ชุดข้อมูลแหล่งท่องเที่ยวเป็นชุดข้อมูลที่แสดงถึงรายละเอียดเกี่ยวกับแหล่งท่องเที่ยว อาทิ ข้อมูลที่ตั้ง ช่องทางการติดต่อ วันเวลาให้บริการ โดยชุดข้อมูลแหล่งท่องเที่ยวเป็นชุดข้อมูลที่จัดทำโดยสำนักงานในประเทศและฝ่ายสินค้าการท่องเที่ยวถูกจัดเก็บรวบรวมบนระบบ TAT Intelligence Center โดยมีกองพัฒนาระบบเป็นผู้ดูแลระบบ`,
  },
  "accommodation-business": {
    title: "ชุดข้อมูลธุรกิจหลัก-ธุรกิจเกี่ยวเนื่องส่วนของที่พัก",
    logo: "/images/tourist_resident.png",
    image: "/dataset/accommodation_business.png", 
    pdf: "/PDF/9accommodation-business.pdf",
    xsd: "/XML/accommodation-business.xsd",
    datadict: "/datadict/DataDictionaryชุดข้อมูลธุรกิจหลัก-ธุรกิจเกี่ยวเนื่องส่วนของที่พัก.xlsx",
    data_catalog: "https://datacatalog.tat.or.th/dataset/accommodation",
    description: `ข้อมูลธุรกิจหลัก/ธุรกิจเกี่ยวเนื่องส่วนของที่พัก เป็นข้อมูลที่พักประเภทต่าง ๆ เช่น โรงแรม รีสอร์ท 
เกสท์เฮ้าส์ เซอร์วิสอพาร์ทเมนท์ บังกะโล บ้านพักเยาวชน บ้านพักรับรอง ฯลฯ ซึ่งรวบรวมโดยสำนักงานใประเทศของการท่องเที่ยวแห่งประเทศไทย และถูกจัดเก็บอยู่ในระบบ TAT Intelligence Center (https://marketingdb.tat.or.th/) โดยมีกองพัฒนาระบบและกองวิจัยการตลาดการท่องเที่ยวเป็นผู้ดูแลระบบ`
  },
  "restaurant-business": {
    title: "ชุดข้อมูลธุรกิจหลัก-ธุรกิจเกี่ยวเนื่องส่วนของภัตตาคารร้านอาหาร",
    logo: "/images/tourism_restaurant.png",
    image: "/dataset/restaurant_business.png",
    pdf: "/PDF/10restaurant-business.pdf",
    xsd: "/XML/restaurant-business.xsd",
    datadict: "/datadict/DataDictionaryชุดข้อมูลธุรกิจหลัก-ธุรกิจเกี่ยวเนื่องส่วนของภัตตาคารร้านอาหาร.xlsx",
    data_catalog: "https://datacatalog.tat.or.th/dataset/restaurant",
    description: `ข้อมูลธุรกิจหลัก/ธุรกิจเกี่ยวเนื่องส่วนของร้านอาหาร เป็นข้อมูลร้านอาหารประเภทต่าง ๆ เช่น ร้านอาหาร ร้านกาแฟ ร้านกาแฟ ฯลฯ ซึ่งรวบรวมโดยสำนักงานใประเทศของการท่องเที่ยวแห่งประเทศไทย และถูกจัดเก็บอยู่ในระบบ TAT Intelligence Center (https://marketingdb.tat.or.th/) โดยมีกองพัฒนาระบบและกองวิจัยการตลาดการท่องเที่ยวเป็นผู้ดูแลระบบ`
  },
  "souvenir-business": {
    title: "ชุดข้อมูลธุรกิจหลัก-ธุรกิจเกี่ยวเนื่องส่วนของร้านขายของที่ระลึก",
    logo: "/images/tourism_souvenir.png",
    image: "/dataset/souvenir_business.png",
    pdf: "/PDF/11souvenir-business.pdf",
    xsd: "/XML/souvenir-business.xsd",
    datadict: "/datadict/DataDictionaryชุดข้อมูลธุรกิจหลัก-ธุรกิจเกี่ยวเนื่องส่วนของร้านขายของที่ระลึก.xlsx",
    data_catalog: "https://datacatalog.tat.or.th/dataset/souvenir-shop",
    description: `ข้อมูลธุรกิจหลัก/ธุรกิจเกี่ยวเนื่องส่วนของร้านขายของที่ระลึก เป็นข้อมูลร้านขายของประเภทต่าง ๆ จำแนกตามลักษณะสินค้า/ผลิตภัณฑ์ในร้าน เช่น เครื่องแต่งกาย หนังสือ อัญมณี เป็นต้น ซึ่งรวบรวมโดยสำนักงานในประเทศของการท่องเที่ยวแห่งประเทศไทย และถูกจัดเก็บอยู่ในระบบ TAT Intelligence Center (https://marketingdb.tat.or.th/) โดยมีกองพัฒนาระบบและกองวิจัยการตลาดการท่องเที่ยวเป็นผู้ดูแลระบบ`
  },
  "international-tourist-behavior": {
    title: "ชุดข้อมูลพฤติกรรมนักท่องเที่ยวระหว่างประเทศ",
    logo: "/images/inter_tourist_behavior.png",
    image: "/dataset/inter_tourist_behavior.png",
    pdf: "/PDF/12inter-tourist-behavior.pdf",
    xsd: "/XML/inter-tourist-behavior.xsd",
    datadict: "/datadict/DataDictionaryชุดข้อมูลพฤติกรรมนักท่องเที่ยว(ระหว่าง).xlsx",
    data_catalog: "https://datacatalog.tat.or.th/dataset/tourist-behavior",
    description: `ชุดข้อมูลพฤติกรรมนักท่องเที่ยวถูกจัดเก็บอยู่ในระบบ TAT Intelligence Center นำมาจากโครงการสำรวจเพื่อการวิเคราะห์พฤติกรรมของนักท่องเที่ยวระหว่างประเทศ โดยกองวิจัยการตลาดการท่องเที่ยว ซึ่งสามารถแยกเป็นชุดข้อมูลย่อยได้ ดังนี้ 1. ชุดข้อมูลพฤติกรรมนักท่องเที่ยวระหว่างประเทศจำแนกตามภูมิภาค 2. ชุดข้อมูลพฤติกรรมนักท่องเที่ยวระหว่างประเทศจำแนกตามกลุ่มเป้าหมาย และ 3. ชุดข้อมูลพฤติกรรมนักท่องเที่ยวระหว่างประเทศจำแนกตามการเดินทางเข้าไทยผ่านด่านทางบก ซึ่งทางที่ปรึกษาได้คัดเลือกชุดข้อมูลพฤติกรรมนักท่องเที่ยวระหว่างประเทศจำแนกตามภูมิภาคมาจัดทำมาตรฐานข้อมูล เนื่องจากเป็นข้อมูลที่เป็นตัวตั้งต้นของชุดข้อมูลอื่น ๆ เพื่อนำไปสู่การจัดทำระบบในอนาคต`
  }
};

export default async function DatasetPage({ params }) {
  const { slug } = await params;
  const data = datasetMeta[slug];

  if (!data) return notFound();

  return <DatasetPageClient data={data} />;
}