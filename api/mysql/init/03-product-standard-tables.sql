-- ============================================
-- PRODUCT STANDARD DATABASE TABLES - COMPLETE VERSION
-- แก้ไขปัญหาภาษาไทย - ใช้ utf8mb4_unicode_ci
-- ============================================

USE product_standard;

-- ตั้งค่า character set
SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 1. Establishment Info
DROP TABLE IF EXISTS establishment_info;
CREATE TABLE establishment_info (
    establishment_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสสถานประกอบการ',
    establishment_name VARCHAR(255) NOT NULL COMMENT 'ชื่อสถานประกอบการ (ไทย)',
    establishment_name_english VARCHAR(255) COMMENT 'ชื่อสถานประกอบการ (อังกฤษ)',
    establishment_type ENUM('โรงแรม', 'รีสอร์ท', 'เกสต์เฮาส์', 'ร้านอาหาร', 'บริษัทนำเที่ยว', 'ตัวแทนท่องเที่ยว') COMMENT 'ประเภทสถานประกอบการ',
    business_category VARCHAR(100) COMMENT 'หมวดธุรกิจ',
    business_size ENUM('เล็ก', 'กลาง', 'ใหญ่', 'องค์กร') COMMENT 'ขนาดธุรกิจ',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (establishment_type),
    INDEX idx_name (establishment_name)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ข้อมูลสถานประกอบการ';

-- 2. Establishment Address
DROP TABLE IF EXISTS establishment_address;
CREATE TABLE establishment_address (
    establishment_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสสถานประกอบการ',
    address TEXT COMMENT 'ที่อยู่',
    alley VARCHAR(100) COMMENT 'ซอย',
    road VARCHAR(100) COMMENT 'ถนน',
    subdistrict VARCHAR(100) COMMENT 'ตำบล/แขวง',
    district VARCHAR(100) COMMENT 'อำเภอ/เขต',
    province VARCHAR(100) COMMENT 'จังหวัด',
    postal_code VARCHAR(10) COMMENT 'รหัสไปรษณีย์',
    latitude DECIMAL(10, 8) COMMENT 'ละติจูด',
    longitude DECIMAL(11, 8) COMMENT 'ลองจิจูด',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (establishment_id) REFERENCES establishment_info(establishment_id) ON DELETE CASCADE,
    INDEX idx_province (province),
    INDEX idx_location (latitude, longitude)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ที่อยู่สถานประกอบการ';

-- 3. Establishment Contact
DROP TABLE IF EXISTS establishment_contact;
CREATE TABLE establishment_contact (
    establishment_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสสถานประกอบการ',
    telephone VARCHAR(20) COMMENT 'โทรศัพท์',
    fax VARCHAR(20) COMMENT 'โทรสาร',
    email VARCHAR(255) COMMENT 'อีเมล',
    website VARCHAR(255) COMMENT 'เว็บไซต์',
    facebook VARCHAR(255) COMMENT 'เฟสบุ๊ค',
    line_id VARCHAR(100) COMMENT 'ไลน์ไอดี',
    instagram VARCHAR(255) COMMENT 'อินสตาแกรม',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (establishment_id) REFERENCES establishment_info(establishment_id) ON DELETE CASCADE,
    INDEX idx_email (email)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ข้อมูลการติดต่อสถานประกอบการ';

-- 4. Ownership Info
DROP TABLE IF EXISTS ownership_info;
CREATE TABLE ownership_info (
    establishment_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสสถานประกอบการ',
    firm_name VARCHAR(255) COMMENT 'ชื่อนิติบุคคล',
    firm_type ENUM('บุคคลธรรมดา', 'ห้างหุ้นส่วน', 'บริษัทจำกัด', 'บริษัทมหาชนจำกัด', 'หน่วยงานรัฐ') COMMENT 'ประเภทนิติบุคคล',
    sha_number VARCHAR(50) COMMENT 'หมายเลข SHA',
    tax_number VARCHAR(20) COMMENT 'เลขประจำตัวผู้เสียภาษี',
    registration_date DATE COMMENT 'วันที่จดทะเบียน',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (establishment_id) REFERENCES establishment_info(establishment_id) ON DELETE CASCADE,
    INDEX idx_tax (tax_number),
    INDEX idx_sha (sha_number)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ข้อมูลความเป็นเจ้าของ';

-- 5. Coordinator Info
DROP TABLE IF EXISTS coordinator_info;
CREATE TABLE coordinator_info (
    establishment_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสสถานประกอบการ',
    prefix VARCHAR(20) COMMENT 'คำนำหน้า',
    first_name VARCHAR(100) COMMENT 'ชื่อ',
    middle_name VARCHAR(100) COMMENT 'ชื่อกลาง',
    last_name VARCHAR(100) COMMENT 'นามสกุล',
    position VARCHAR(100) COMMENT 'ตำแหน่ง',
    telephone VARCHAR(20) COMMENT 'โทรศัพท์',
    mobile VARCHAR(20) COMMENT 'มือถือ',
    email VARCHAR(255) COMMENT 'อีเมล',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (establishment_id) REFERENCES establishment_info(establishment_id) ON DELETE CASCADE,
    INDEX idx_name (first_name, last_name),
    INDEX idx_email (email)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ข้อมูลผู้ประสานงาน';

-- 6. Star Rating
DROP TABLE IF EXISTS star_rating;
CREATE TABLE star_rating (
    establishment_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสสถานประกอบการ',
    star_rating ENUM('1', '2', '3', '4', '5') COMMENT 'จำนวนดาว',
    rating_agency VARCHAR(100) COMMENT 'หน่วยงานให้คะแนน',
    rating_date DATE COMMENT 'วันที่ให้คะแนน',
    valid_until DATE COMMENT 'วันหมดอายุ',
    certificate_number VARCHAR(50) COMMENT 'หมายเลขใบรับรอง',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (establishment_id) REFERENCES establishment_info(establishment_id) ON DELETE CASCADE,
    INDEX idx_rating (star_rating),
    INDEX idx_agency (rating_agency)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ระดับดาวสถานประกอบการ';

-- 7. Award Info
DROP TABLE IF EXISTS award_info;
CREATE TABLE award_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    establishment_id VARCHAR(50) NOT NULL COMMENT 'รหัสสถานประกอบการ',
    award_name VARCHAR(255) COMMENT 'ชื่อรางวัล',
    award_category VARCHAR(100) COMMENT 'หมวดรางวัล',
    award_year YEAR COMMENT 'ปีที่ได้รับ',
    awarding_organization VARCHAR(255) COMMENT 'องค์กรให้รางวัล',
    award_description TEXT COMMENT 'คำอธิบายรางวัล',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (establishment_id) REFERENCES establishment_info(establishment_id) ON DELETE CASCADE,
    INDEX idx_establishment (establishment_id),
    INDEX idx_year (award_year)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ข้อมูลรางวัลที่ได้รับ';

-- 8. Operational Info
DROP TABLE IF EXISTS operational_info;
CREATE TABLE operational_info (
    establishment_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสสถานประกอบการ',
    opening_hours VARCHAR(100) COMMENT 'เวลาเปิด-ปิด',
    operating_days SET('จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์') COMMENT 'วันที่เปิดบริการ',
    capacity INT COMMENT 'ความจุ',
    number_of_rooms INT COMMENT 'จำนวนห้อง',
    number_of_employees INT COMMENT 'จำนวนพนักงาน',
    facilities TEXT COMMENT 'สิ่งอำนวยความสะดวก (JSON)',
    services_offered TEXT COMMENT 'บริการที่ให้ (JSON)',
    languages_supported SET('ไทย', 'อังกฤษ', 'จีน', 'ญี่ปุ่น', 'เกาหลี', 'ฝรั่งเศส', 'เยอรมัน') COMMENT 'ภาษาที่รองรับ',
    payment_methods SET('เงินสด', 'บัตรเครดิต', 'บัตรเดบิต', 'โมบายแบงกิ้ง', 'QR Code', 'อีวอลเล็ต') COMMENT 'วิธีการชำระเงิน',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (establishment_id) REFERENCES establishment_info(establishment_id) ON DELETE CASCADE,
    INDEX idx_capacity (capacity)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ข้อมูลการดำเนินงาน';

-- Sample Data
INSERT INTO establishment_info (establishment_id, establishment_name, establishment_name_english, establishment_type, business_category, business_size) VALUES
('EST001', 'โรงแรมสวยงาม', 'Beautiful Hotel', 'โรงแรม', 'ที่พัก', 'กลาง'),
('EST002', 'รีสอร์ทธรรมชาติ', 'Nature Resort', 'รีสอร์ท', 'ที่พัก', 'ใหญ่'),
('EST003', 'เกสต์เฮาส์บ้านสวน', 'Garden Guesthouse', 'เกสต์เฮาส์', 'ที่พัก', 'เล็ก'),
('EST004', 'ร้านอาหารดีเลิศ', 'Delicious Restaurant', 'ร้านอาหาร', 'อาหารและเครื่องดื่ม', 'กลาง'),
('EST005', 'บริษัทท่องเที่ยวสนุก', 'Fun Travel Company', 'บริษัทนำเที่ยว', 'บริการท่องเที่ยว', 'กลาง');

INSERT INTO establishment_address (establishment_id, address, road, subdistrict, district, province, postal_code, latitude, longitude) VALUES
('EST001', '123 ถ.สุขุมวิท', 'สุขุมวิท', 'คลองเตย', 'คลองเตย', 'กรุงเทพมหานคร', '10110', 13.7563, 100.5018),
('EST002', '456 ถ.ณิชวาที่', 'ณิชวาที่', 'ช้างเผือก', 'เมืองเชียงใหม่', 'เชียงใหม่', '50300', 18.7883, 98.9853),
('EST003', '789 ถ.ภูเก็ต', 'ภูเก็ต', 'ป่าตอง', 'กะทู้', 'ภูเก็ต', '83150', 7.8804, 98.2925),
('EST004', '321 ถ.มิตรภาพ', 'มิตรภาพ', 'ในเมือง', 'เมืองขอนแก่น', 'ขอนแก่น', '40000', 16.4322, 102.8236),
('EST005', '654 ถ.หาดใหญ่', 'หาดใหญ่', 'หาดใหญ่', 'หาดใหญ่', 'สงขลา', '90110', 7.0187, 100.4681);

INSERT INTO establishment_contact (establishment_id, telephone, email, website, facebook, line_id) VALUES
('EST001', '02-234-5678', 'info@beautifulhotel.com', 'www.beautifulhotel.com', 'BeautifulHotelTH', '@beautifulhotel'),
('EST002', '053-123-456', 'contact@natureresort.com', 'www.natureresort.com', 'NatureResortCM', '@natureresort'),
('EST003', '076-987-654', 'booking@gardenguest.com', 'www.gardenguest.com', 'GardenGuesthousePhuket', '@gardenguest'),
('EST004', '043-456-789', 'order@deliciousrest.com', 'www.deliciousrest.com', 'DeliciousRestaurantKK', '@deliciousrest'),
('EST005', '074-321-987', 'tours@funtravel.com', 'www.funtravel.com', 'FunTravelSongkhla', '@funtravel');

INSERT INTO ownership_info (establishment_id, firm_name, firm_type, tax_number, registration_date) VALUES
('EST001', 'บริษัท โรงแรมสวยงาม จำกัด', 'บริษัทจำกัด', '0105560000123', '2018-03-15'),
('EST002', 'บริษัท รีสอร์ทธรรมชาติ จำกัด', 'บริษัทจำกัด', '0105560000456', '2019-06-20'),
('EST003', 'นายสมชาย ใจดี', 'บุคคลธรรมดา', '1234567890123', '2020-01-10'),
('EST004', 'ห้างหุ้นส่วน อาหารดีเลิศ', 'ห้างหุ้นส่วน', '0205560000789', '2017-11-25'),
('EST005', 'บริษัท ท่องเที่ยวสนุก จำกัด', 'บริษัทจำกัด', '0105560000321', '2021-05-08');

INSERT INTO coordinator_info (establishment_id, prefix, first_name, last_name, position, telephone, mobile, email) VALUES
('EST001', 'นาย', 'วิชัย', 'ดีเยี่ยม', 'ผู้จัดการทั่วไป', '02-234-5678', '081-234-5678', 'wichai@beautifulhotel.com'),
('EST002', 'นาง', 'สุมาลี', 'รักธรรมชาติ', 'ผู้อำนวยการ', '053-123-456', '089-123-456', 'sumalee@natureresort.com'),
('EST003', 'นาย', 'สมชาย', 'ใจดี', 'เจ้าของ', '076-987-654', '087-987-654', 'somchai@gardenguest.com'),
('EST004', 'นางสาว', 'นิดา', 'ฝีมือดี', 'หัวหน้าครัว', '043-456-789', '092-456-789', 'nida@deliciousrest.com'),
('EST005', 'นาย', 'ประสิทธิ์', 'นำเที่ยว', 'ผู้จัดการทัวร์', '074-321-987', '085-321-987', 'prasit@funtravel.com');

INSERT INTO star_rating (establishment_id, star_rating, rating_agency, rating_date, valid_until, certificate_number) VALUES
('EST001', '4', 'การท่องเที่ยวแห่งประเทศไทย', '2023-01-15', '2026-01-14', 'CERT001'),
('EST002', '5', 'การท่องเที่ยวแห่งประเทศไทย', '2023-03-20', '2026-03-19', 'CERT002'),
('EST003', '3', 'การท่องเที่ยวแห่งประเทศไทย', '2023-05-10', '2026-05-09', 'CERT003');

INSERT INTO award_info (establishment_id, award_name, award_category, award_year, awarding_organization, award_description) VALUES
('EST001', 'รางวัลโรงแรมยอดเยี่ยม', 'ที่พัก', 2023, 'สมาคมโรงแรมไทย', 'รางวัลสำหรับการบริการที่ดีเยี่ยม'),
('EST002', 'รางวัลรีสอร์ทเป็นมิตรกับสิ่งแวดล้อม', 'ความยั่งยืน', 2023, 'กระทรวงทรัพยากรธรรมชาติและสิ่งแวดล้อม', 'รางวัลสำหรับการดำเนินงานที่เป็นมิตรกับสิ่งแวดล้อม'),
('EST004', 'ร้านอาหารรสชาติดีเยี่ยม', 'อาหารและเครื่องดื่ม', 2023, 'สมาคมผู้ประกอบการร้านอาหาร', 'รางวัลสำหรับอาหารรสชาติดีเยี่ยม');

INSERT INTO operational_info (establishment_id, opening_hours, operating_days, capacity, number_of_rooms, number_of_employees, languages_supported, payment_methods) VALUES
('EST001', '24 ชั่วโมง', 'จันทร์,อังคาร,พุธ,พฤหัสบดี,ศุกร์,เสาร์,อาทิตย์', 200, 100, 50, 'ไทย,อังกฤษ,จีน', 'เงินสด,บัตรเครดิต,บัตรเดบิต,QR Code'),
('EST002', '24 ชั่วโมง', 'จันทร์,อังคาร,พุธ,พฤหัสบดี,ศุกร์,เสาร์,อาทิตย์', 150, 75, 35, 'ไทย,อังกฤษ', 'เงินสด,บัตรเครดิต,โมบายแบงกิ้ง'),
('EST003', '24 ชั่วโมง', 'จันทร์,อังคาร,พุธ,พฤหัสบดี,ศุกร์,เสาร์,อาทิตย์', 30, 15, 8, 'ไทย,อังกฤษ', 'เงินสด,บัตรเครดิต'),
('EST004', '10:00-22:00', 'จันทร์,อังคาร,พุธ,พฤหัสบดี,ศุกร์,เสาร์,อาทิตย์', 80, 0, 15, 'ไทย', 'เงินสด,QR Code,อีวอลเล็ต'),
('EST005', '08:00-18:00', 'จันทร์,อังคาร,พุธ,พฤหัสบดี,ศุกร์,เสาร์', 40, 0, 12, 'ไทย,อังกฤษ,จีน', 'เงินสด,บัตรเครดิต,โมบายแบงกิ้ง');

-- ตรวจสอบข้อมูลที่เพิ่มแล้ว
SELECT 'establishment_info' as table_name, COUNT(*) as row_count FROM establishment_info
UNION ALL
SELECT 'establishment_address', COUNT(*) FROM establishment_address
UNION ALL
SELECT 'establishment_contact', COUNT(*) FROM establishment_contact
UNION ALL
SELECT 'ownership_info', COUNT(*) FROM ownership_info
UNION ALL
SELECT 'coordinator_info', COUNT(*) FROM coordinator_info
UNION ALL
SELECT 'star_rating', COUNT(*) FROM star_rating
UNION ALL
SELECT 'award_info', COUNT(*) FROM award_info
UNION ALL
SELECT 'operational_info', COUNT(*) FROM operational_info;