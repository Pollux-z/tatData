-- ============================================
-- TOURISM ROUTE DATABASE TABLES - FIXED VERSION
-- แก้ไขปัญหาภาษาไทย - ใช้ utf8mb4_unicode_ci
-- ============================================

USE tourism_route;

-- ตั้งค่า character set
SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 1. Tourism Route Table
DROP TABLE IF EXISTS tourism_route_table;
CREATE TABLE tourism_route_table (
    route_code VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสเส้นทาง',
    route_name_thai VARCHAR(255) NOT NULL COMMENT 'ชื่อเส้นทาง (ไทย)',
    route_name_english VARCHAR(255) COMMENT 'ชื่อเส้นทาง (อังกฤษ)',
    number_of_days INT NOT NULL COMMENT 'จำนวนวัน',
    starting_province VARCHAR(100) COMMENT 'จังหวัดเริ่มต้น',
    ending_province VARCHAR(100) COMMENT 'จังหวัดสิ้นสุด',
    covered_provinces TEXT COMMENT 'จังหวัดที่ผ่าน (JSON)',
    route_description TEXT COMMENT 'คำอธิบายเส้นทาง',
    route_type ENUM('วัฒนธรรม', 'ธรรมชาติ', 'ผจญภัย', 'ประวัติศาสตร์', 'ศาสนา', 'ท่องเที่ยวเชิงนิเวศ') COMMENT 'ประเภทเส้นทาง',
    difficulty_level ENUM('ง่าย', 'ปานกลาง', 'ยาก', 'ผู้เชี่ยวชาญ') COMMENT 'ระดับความยาก',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_days (number_of_days),
    INDEX idx_province (starting_province),
    INDEX idx_type (route_type)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ข้อมูลเส้นทางการท่องเที่ยว';

-- 2. Itinerary Table
DROP TABLE IF EXISTS itinerary_table;
CREATE TABLE itinerary_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    route_code VARCHAR(50) NOT NULL COMMENT 'รหัสเส้นทาง',
    day_number INT NOT NULL COMMENT 'วันที่',
    destination VARCHAR(255) COMMENT 'จุดหมายปลายทาง',
    activities TEXT COMMENT 'กิจกรรม',
    accommodation VARCHAR(255) COMMENT 'ที่พัก',
    meal_plan ENUM('อาหารเช้า', 'ครึ่งวัน', 'เต็มวัน', 'ทุกมื้อ') COMMENT 'แผนอาหาร',
    transportation VARCHAR(100) COMMENT 'การเดินทาง',
    estimated_time TIME COMMENT 'เวลาโดยประมาณ',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (route_code) REFERENCES tourism_route_table(route_code) ON DELETE CASCADE,
    INDEX idx_route_day (route_code, day_number),
    UNIQUE KEY unique_route_day (route_code, day_number)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='กำหนดการเดินทางรายวัน';

-- 3. Schedule Table - FIXED available_seasons
DROP TABLE IF EXISTS schedule_table;
CREATE TABLE schedule_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    route_code VARCHAR(50) NOT NULL COMMENT 'รหัสเส้นทาง',
    start_date DATE COMMENT 'วันเริ่มต้น',
    end_date DATE COMMENT 'วันสิ้นสุด',
    available_seasons SET('ฤดูใบไม้ผลิ', 'ฤดูร้อน', 'ฤดูใบไม้ร่วง', 'ฤดูหนาว', 'ฤดูฝน', 'ฤดูเย็น') COMMENT 'ฤดูกาลที่เหมาะสม',
    max_participants INT COMMENT 'จำนวนผู้เข้าร่วมสูงสุด',
    min_participants INT COMMENT 'จำนวนผู้เข้าร่วมขั้นต่ำ',
    booking_deadline DATE COMMENT 'กำหนดการจอง',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (route_code) REFERENCES tourism_route_table(route_code) ON DELETE CASCADE,
    INDEX idx_route_schedule (route_code),
    INDEX idx_start_date (start_date)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ตารางเวลาเส้นทาง';

-- 4. Pricing Table
DROP TABLE IF EXISTS pricing_table;
CREATE TABLE pricing_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    route_code VARCHAR(50) NOT NULL COMMENT 'รหัสเส้นทาง',
    price_per_person DECIMAL(15,2) NOT NULL COMMENT 'ราคาต่อคน',
    currency VARCHAR(3) DEFAULT 'THB' COMMENT 'สกุลเงิน',
    price_type ENUM('ผู้ใหญ่', 'เด็ก', 'ผู้สูงอายุ', 'นักเรียน', 'กลุ่ม') COMMENT 'ประเภทราคา',
    season_type ENUM('ฤดูท่องเที่ยว', 'ฤดูปกติ', 'ฤดูพีค', 'ฤดูทั่วไป') COMMENT 'ช่วงฤดูกาล',
    included_services TEXT COMMENT 'บริการที่รวม (JSON)',
    excluded_services TEXT COMMENT 'บริการที่ไม่รวม (JSON)',
    discount_percentage DECIMAL(5,2) DEFAULT 0 COMMENT 'เปอร์เซ็นต์ส่วนลด',
    effective_date DATE COMMENT 'วันที่มีผล',
    expiry_date DATE COMMENT 'วันหมดอายุ',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (route_code) REFERENCES tourism_route_table(route_code) ON DELETE CASCADE,
    INDEX idx_route_price (route_code),
    INDEX idx_price_type (price_type),
    INDEX idx_effective_date (effective_date)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ตารางราคาเส้นทาง';

-- 5. Contact Information Table
DROP TABLE IF EXISTS contact_information_table;
CREATE TABLE contact_information_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    route_code VARCHAR(50) NOT NULL COMMENT 'รหัสเส้นทาง',
    contact_link VARCHAR(500) COMMENT 'ลิงก์ติดต่อ',
    channel_type ENUM('เว็บไซต์', 'อีเมล', 'โทรศัพท์', 'ไลน์', 'เฟสบุ๊ค', 'วอทส์แอป') COMMENT 'ประเภทช่องทาง',
    contact_value VARCHAR(255) COMMENT 'ข้อมูลการติดต่อ',
    is_primary BOOLEAN DEFAULT FALSE COMMENT 'ช่องทางหลัก',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (route_code) REFERENCES tourism_route_table(route_code) ON DELETE CASCADE,
    INDEX idx_route_contact (route_code),
    INDEX idx_channel_type (channel_type)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ข้อมูลการติดต่อเส้นทาง';

-- 6. Owner Contact Information
DROP TABLE IF EXISTS owner_contact_information;
CREATE TABLE owner_contact_information (
    route_code VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสเส้นทาง',
    owner_name VARCHAR(255) COMMENT 'ชื่อเจ้าของ',
    owner_telephone_number VARCHAR(20) COMMENT 'โทรศัพท์เจ้าของ',
    owner_email VARCHAR(255) COMMENT 'อีเมลเจ้าของ',
    license_number VARCHAR(100) COMMENT 'หมายเลขใบอนุญาต',
    company_name VARCHAR(255) COMMENT 'ชื่อบริษัท',
    company_registration VARCHAR(50) COMMENT 'เลขทะเบียนบริษัท',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (route_code) REFERENCES tourism_route_table(route_code) ON DELETE CASCADE,
    INDEX idx_owner_name (owner_name),
    INDEX idx_license (license_number)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ข้อมูลการติดต่อเจ้าของเส้นทาง';

-- 7. Accessibility Info
DROP TABLE IF EXISTS accessibility_info;
CREATE TABLE accessibility_info (
    route_code VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสเส้นทาง',
    wheelchair_accessible BOOLEAN DEFAULT FALSE COMMENT 'เข้าถึงได้สำหรับรถเข็น',
    elderly_friendly BOOLEAN DEFAULT FALSE COMMENT 'เหมาะสำหรับผู้สูงอายุ',
    child_friendly BOOLEAN DEFAULT FALSE COMMENT 'เหมาะสำหรับเด็ก',
    difficulty ENUM('ง่าย', 'ปานกลาง', 'ยาก', 'ผู้เชี่ยวชาญ') COMMENT 'ระดับความยาก',
    physical_requirements TEXT COMMENT 'ข้อกำหนดทางกายภาพ',
    age_restrictions VARCHAR(50) COMMENT 'ข้อจำกัดด้านอายุ',
    special_needs_support BOOLEAN DEFAULT FALSE COMMENT 'รองรับผู้มีความต้องการพิเศษ',
    accessibility_notes TEXT COMMENT 'หมายเหตุการเข้าถึง',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (route_code) REFERENCES tourism_route_table(route_code) ON DELETE CASCADE
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ข้อมูลการเข้าถึงเส้นทาง';

-- 8. Sustainability Info
DROP TABLE IF EXISTS sustainability_info;
CREATE TABLE sustainability_info (
    route_code VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสเส้นทาง',
    environmental_impact ENUM('ต่ำ', 'ปานกลาง', 'สูง') COMMENT 'ผลกระทบต่อสิ่งแวดล้อม',
    carbon_footprint DECIMAL(10,2) COMMENT 'คาร์บอนฟุตพริ้นท์ (kg CO2)',
    local_community_involvement BOOLEAN DEFAULT FALSE COMMENT 'มีส่วนร่วมของชุมชนท้องถิ่น',
    sustainable_practices TEXT COMMENT 'แนวทางปฏิบัติที่ยั่งยืน',
    eco_certification VARCHAR(100) COMMENT 'ใบรับรองด้านสิ่งแวดล้อม',
    waste_management_plan TEXT COMMENT 'แผนการจัดการขยะ',
    water_conservation BOOLEAN DEFAULT FALSE COMMENT 'การอนุรักษ์น้ำ',
    energy_efficiency BOOLEAN DEFAULT FALSE COMMENT 'ประสิทธิภาพพลังงาน',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (route_code) REFERENCES tourism_route_table(route_code) ON DELETE CASCADE
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ข้อมูลความยั่งยืน';

-- Sample Data
INSERT INTO tourism_route_table (route_code, route_name_thai, route_name_english, number_of_days, starting_province, ending_province, route_description, route_type, difficulty_level) VALUES
('RT001', 'เส้นทางทะเลอันดามัน', 'Andaman Sea Route', 5, 'ภูเก็ต', 'กระบี่', 'เส้นทางท่องเที่ยวชายฝั่งทะเลอันดามันที่สวยงาม', 'ธรรมชาติ', 'ง่าย'),
('RT002', 'เส้นทางวัฒนธรรมล้านนา', 'Lanna Cultural Route', 7, 'เชียงใหม่', 'เชียงราย', 'เส้นทางท่องเที่ยวเชิงวัฒนธรรมล้านนา', 'วัฒนธรรม', 'ปานกลาง'),
('RT003', 'เส้นทางผจญภัยดอยอินทนนท์', 'Doi Inthanon Adventure Route', 3, 'เชียงใหม่', 'เชียงใหม่', 'เส้นทางผจญภัยบนยอดดอยที่สูงที่สุดในประเทศไทย', 'ผจญภัย', 'ยาก'),
('RT004', 'เส้นทางประวัติศาสตร์อยุธยา', 'Ayutthaya Historical Route', 2, 'กรุงเทพมหานคร', 'พระนครศรีอยุธยา', 'เส้นทางท่องเที่ยวเชิงประวัติศาสตร์อยุธยา', 'ประวัติศาสตร์', 'ง่าย'),
('RT005', 'เส้นทางเชิงนิเวศเขาใหญ่', 'Khao Yai Eco Route', 4, 'นครราชสีมา', 'ปราจีนบุรี', 'เส้นทางท่องเที่ยวเชิงนิเวศในอุทยานแห่งชาติเขาใหญ่', 'ท่องเที่ยวเชิงนิเวศ', 'ปานกลาง');

INSERT INTO itinerary_table (route_code, day_number, destination, activities, accommodation, meal_plan, transportation) VALUES
('RT001', 1, 'ภูเก็ต', 'เช็คอิน, ชมวิวหาดป่าตอง', 'โรงแรมในป่าตอง', 'เต็มวัน', 'เครื่องบิน'),
('RT001', 2, 'เกาะพีพี', 'ดำน้ำดูปะการัง, เที่ยวเกาะ', 'โรงแรมในป่าตอง', 'เต็มวัน', 'เรือเร็ว'),
('RT002', 1, 'เชียงใหม่', 'เยี่ยมชมวัดพระธาตุดอยสุเทพ', 'โรงแรมในเมืองเชียงใหม่', 'เต็มวัน', 'รถยนต์');

INSERT INTO schedule_table (route_code, start_date, end_date, available_seasons, max_participants, min_participants, booking_deadline) VALUES
('RT001', '2024-11-01', '2024-04-30', 'ฤดูเย็น,ฤดูร้อน', 20, 4, '2024-10-15'),
('RT002', '2024-11-01', '2024-02-28', 'ฤดูหนาว,ฤดูเย็น', 15, 6, '2024-10-15'),
('RT003', '2024-12-01', '2024-02-28', 'ฤดูหนาว', 10, 4, '2024-11-15');

INSERT INTO pricing_table (route_code, price_per_person, price_type, season_type, effective_date, expiry_date) VALUES
('RT001', 15000.00, 'ผู้ใหญ่', 'ฤดูท่องเที่ยว', '2024-11-01', '2025-04-30'),
('RT001', 12000.00, 'เด็ก', 'ฤดูท่องเที่ยว', '2024-11-01', '2025-04-30'),
('RT002', 25000.00, 'ผู้ใหญ่', 'ฤดูท่องเที่ยว', '2024-11-01', '2025-02-28'),
('RT003', 8000.00, 'ผู้ใหญ่', 'ฤดูปกติ', '2024-12-01', '2025-02-28');

INSERT INTO contact_information_table (route_code, channel_type, contact_value, is_primary) VALUES
('RT001', 'โทรศัพท์', '076-123-456', TRUE),
('RT001', 'อีเมล', 'andaman@tours.com', FALSE),
('RT002', 'โทรศัพท์', '053-987-654', TRUE),
('RT002', 'ไลน์', '@lannatour', FALSE);

INSERT INTO owner_contact_information (route_code, owner_name, owner_telephone_number, owner_email, company_name, license_number) VALUES
('RT001', 'นายสมศักดิ์ ทะเลใส', '076-123-456', 'somsak@andamantours.com', 'บริษัท อันดามันทัวร์ จำกัด', 'LIC001'),
('RT002', 'นางวิมลา ล้านนา', '053-987-654', 'wimala@lannatours.com', 'บริษัท ล้านนาทัวร์ จำกัด', 'LIC002'),
('RT003', 'นายประสิทธิ์ ดอยสูง', '053-456-789', 'prasit@adventure.com', 'บริษัท แอดเวนเจอร์ทัวร์ จำกัด', 'LIC003');

INSERT INTO accessibility_info (route_code, wheelchair_accessible, elderly_friendly, child_friendly, difficulty, physical_requirements) VALUES
('RT001', TRUE, TRUE, TRUE, 'ง่าย', 'ไม่มีข้อกำหนดพิเศษ'),
('RT002', FALSE, TRUE, TRUE, 'ปานกลาง', 'ต้องสามารถเดินได้ระยะทางปานกลาง'),
('RT003', FALSE, FALSE, FALSE, 'ยาก', 'ต้องมีสุขภาพแข็งแรงและประสบการณ์เดินป่า');

INSERT INTO sustainability_info (route_code, environmental_impact, carbon_footprint, local_community_involvement, sustainable_practices) VALUES
('RT001', 'ปานกลาง', 250.50, TRUE, 'ใช้เรือที่เป็นมิตรกับสิ่งแวดล้อม, ส่งเสริมการท่องเที่ยวชุมชน'),
('RT002', 'ต่ำ', 180.25, TRUE, 'ใช้ที่พักชุมชน, ส่งเสริมหัตถกรรมท้องถิ่น'),
('RT003', 'ต่ำ', 120.75, TRUE, 'เดินป่าอย่างรับผิดชอบ, ไม่ทิ้งขยะ');

-- ตรวจสอบข้อมูลที่เพิ่มแล้ว
SELECT 'tourism_route_table' as table_name, COUNT(*) as row_count FROM tourism_route_table
UNION ALL
SELECT 'itinerary_table', COUNT(*) FROM itinerary_table
UNION ALL
SELECT 'schedule_table', COUNT(*) FROM schedule_table
UNION ALL
SELECT 'pricing_table', COUNT(*) FROM pricing_table
UNION ALL
SELECT 'contact_information_table', COUNT(*) FROM contact_information_table
UNION ALL
SELECT 'owner_contact_information', COUNT(*) FROM owner_contact_information
UNION ALL
SELECT 'accessibility_info', COUNT(*) FROM accessibility_info
UNION ALL
SELECT 'sustainability_info', COUNT(*) FROM sustainability_info;