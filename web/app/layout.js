import { Sarabun } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sarabun = Sarabun({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "มาตรฐานข้อมูลการท่องเที่ยวแห่งประเทศไทย",
  description: "มาตรฐานข้อมูลเพื่อสนับสนุนการเชื่อมโยงและแลกเปลี่ยนข้อมูลดิจิทัลด้านการท่องเที่ยวระหว่างหน่วยงานภาครัฐและเอกชน",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${sarabun.className} antialiased bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 pt-10 pb-20">{children}</main> 
        <Footer />
      </body>
    </html>
  );
}

