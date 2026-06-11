-- ============================================
-- CUSTOMER PROFILE DATABASE TABLES - FIXED VERSION
-- แก้ไขปัญหาภาษาไทย - ใช้ utf8mb4_unicode_ci
-- ============================================

USE customer_profile;

-- ตั้งค่า character set
SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 1. Personal Information
DROP TABLE IF EXISTS personal_info;
CREATE TABLE personal_info (
    customer_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสลูกค้า',
    prefix VARCHAR(50) COMMENT 'คำนำหน้าชื่อ',
    first_name VARCHAR(100) NOT NULL COMMENT 'ชื่อ',
    last_name VARCHAR(100) NOT NULL COMMENT 'นามสกุล',
    date_of_birth DATE COMMENT 'วันเกิด',
    nationality VARCHAR(50) COMMENT 'สัญชาติ',
    gender ENUM('Male', 'Female', 'Other') COMMENT 'เพศ',
    marital_status ENUM('Single', 'Married', 'Divorced', 'Widowed') COMMENT 'สถานภาพสมรส',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (first_name, last_name),
    INDEX idx_birth (date_of_birth)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ข้อมูลส่วนตัวลูกค้า';

-- 2. Contact Information
DROP TABLE IF EXISTS contact_info;
CREATE TABLE contact_info (
    customer_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสลูกค้า',
    email VARCHAR(255) UNIQUE COMMENT 'อีเมล',
    mobile_phone VARCHAR(20) COMMENT 'โทรศัพท์มือถือ',
    home_phone VARCHAR(20) COMMENT 'โทรศัพท์บ้าน',
    house_number VARCHAR(50) COMMENT 'บ้านเลขที่',
    alley VARCHAR(100) COMMENT 'ซอย',
    road VARCHAR(100) COMMENT 'ถนน',
    subdistrict VARCHAR(100) COMMENT 'ตำบล/แขวง',
    district VARCHAR(100) COMMENT 'อำเภอ/เขต',
    province VARCHAR(100) COMMENT 'จังหวัด',
    postal_code VARCHAR(10) COMMENT 'รหัสไปรษณีย์',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES personal_info(customer_id) ON DELETE CASCADE,
    INDEX idx_email (email),
    INDEX idx_province (province)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ข้อมูลการติดต่อลูกค้า';

-- 3. Socio Economic Information
DROP TABLE IF EXISTS socio_economic_info;
CREATE TABLE socio_economic_info (
    customer_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสลูกค้า',
    education ENUM('ประถมศึกษา', 'มัธยมต้น', 'มัธยมปลาย', 'ปวช', 'ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก') COMMENT 'การศึกษา',
    occupation VARCHAR(100) COMMENT 'อาชีพ',
    monthly_income DECIMAL(15,2) COMMENT 'รายได้ต่อเดือน',
    industry_type VARCHAR(100) COMMENT 'ประเภทอุตสาหกรรม',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES personal_info(customer_id) ON DELETE CASCADE,
    INDEX idx_income (monthly_income),
    INDEX idx_occupation (occupation)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ข้อมูลเศรษฐกิจสังคมลูกค้า';

-- 4. Travel Preferences - FIXED ENUM VALUES
DROP TABLE IF EXISTS travel_preferences;
CREATE TABLE travel_preferences (
    customer_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสลูกค้า',
    preferred_destination_type ENUM('ทะเล', 'ภูเขา', 'เมือง', 'ประวัติศาสตร์', 'วัฒนธรรม', 'ผจญภัย', 'เชิงนิเวศ') COMMENT 'ประเภทจุดหมายที่ชอบ',
    preferred_travel_style ENUM('หรูหรา', 'ประหยัด', 'เป้สะพายหลัง', 'ครอบครัว', 'ธุรกิจ', 'คนเดียว', 'กลุ่ม', 'ผจญภัย') COMMENT 'รูปแบบการท่องเที่ยว',
    accommodation_preference ENUM('โรงแรม', 'รีสอร์ท', 'เกสต์เฮาส์', 'โฮสเทล', 'โฮมสเตย์', 'แคมปิ้ง') COMMENT 'ความชอบที่พัก',
    budget_range ENUM('ต่ำกว่า 5,000', '5,000-10,000', '10,000-20,000', '20,000-50,000', 'มากกว่า 50,000') COMMENT 'ช่วงงบประมาณ (บาท)',
    travel_companion_type ENUM('คนเดียว', 'คู่', 'ครอบครัว', 'เพื่อน', 'กลุ่มธุรกิจ') COMMENT 'ประเภทคู่เดินทาง',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES personal_info(customer_id) ON DELETE CASCADE
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ความชอบการท่องเที่ยวลูกค้า';

-- 5. Interaction History
DROP TABLE IF EXISTS interaction_history;
CREATE TABLE interaction_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL COMMENT 'รหัสลูกค้า',
    last_visit_date DATE COMMENT 'วันที่เยี่ยมชมล่าสุด',
    total_visits INT DEFAULT 0 COMMENT 'จำนวนครั้งทั้งหมด',
    favorite_destinations TEXT COMMENT 'จุดหมายที่ชื่นชอบ (JSON)',
    booking_channels ENUM('เว็บไซต์', 'แอปมือถือ', 'โทรศัพท์', 'ตัวแทนท่องเที่ยว', 'Walk-in') COMMENT 'ช่องทางการจอง',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES personal_info(customer_id) ON DELETE CASCADE,
    INDEX idx_last_visit (last_visit_date),
    INDEX idx_customer (customer_id)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ประวัติการใช้บริการลูกค้า';

-- 6. Loyalty Program
DROP TABLE IF EXISTS loyalty_program;
CREATE TABLE loyalty_program (
    customer_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสลูกค้า',
    membership_level ENUM('บรอนซ์', 'เงิน', 'ทอง', 'แพลทินัม', 'ไดมอนด์') COMMENT 'ระดับสมาชิก',
    member_since DATE COMMENT 'สมาชิกตั้งแต่',
    total_points INT DEFAULT 0 COMMENT 'คะแนนสะสม',
    last_activity_date DATE COMMENT 'วันที่ใช้งานล่าสุด',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES personal_info(customer_id) ON DELETE CASCADE,
    INDEX idx_level (membership_level),
    INDEX idx_points (total_points)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='โปรแกรมสมาชิกลูกค้า';

-- 7. Customer Consent
DROP TABLE IF EXISTS customer_consent;
CREATE TABLE customer_consent (
    customer_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสลูกค้า',
    preferred_language ENUM('ไทย', 'อังกฤษ', 'จีน', 'ญี่ปุ่น', 'เกาหลี') DEFAULT 'ไทย' COMMENT 'ภาษาที่ต้องการ',
    communication_channels SET('อีเมล', 'SMS', 'โทรศัพท์', 'ไลน์', 'เฟสบุ๊ค') COMMENT 'ช่องทางการสื่อสาร',
    newsletter_subscription BOOLEAN DEFAULT FALSE COMMENT 'การสมัครจดหมายข่าว',
    promotion_consent BOOLEAN DEFAULT FALSE COMMENT 'ความยินยอมรับโปรโมชัน',
    data_usage_consent BOOLEAN DEFAULT FALSE COMMENT 'ความยินยอมใช้ข้อมูล',
    consent_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'วันที่ให้ความยินยอม',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES personal_info(customer_id) ON DELETE CASCADE
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ความยินยอมลูกค้า';

-- Sample Data ภาษาไทย - FIXED DATA
INSERT INTO personal_info (customer_id, prefix, first_name, last_name, date_of_birth, nationality, gender, marital_status) VALUES
('C001', 'นาย', 'สมชาย', 'ใจดี', '1985-05-15', 'ไทย', 'Male', 'Married'),
('C002', 'นางสาว', 'สุวิมล', 'รักษ์ดี', '1990-08-22', 'ไทย', 'Female', 'Single'),
('C003', 'นาง', 'วิมลา', 'สุขใส', '1978-12-10', 'ไทย', 'Female', 'Married'),
('C004', 'นาย', 'ประเสริฐ', 'มั่นคง', '1992-03-25', 'ไทย', 'Male', 'Single'),
('C005', 'นางสาว', 'ณัฐกานต์', 'ดีใจ', '1988-11-05', 'ไทย', 'Female', 'Married');

INSERT INTO contact_info (customer_id, email, mobile_phone, province, district, subdistrict) VALUES
('C001', 'somchai@email.com', '081-234-5678', 'กรุงเทพมหานคร', 'วัฒนา', 'ลุมพินี'),
('C002', 'suwimol@email.com', '089-876-5432', 'เชียงใหม่', 'เมืองเชียงใหม่', 'ช้างเผือก'),
('C003', 'wimala@email.com', '087-111-2222', 'ภูเก็ต', 'เมืองภูเก็ต', 'ป่าตอง'),
('C004', 'prasert@email.com', '092-333-4444', 'ขอนแก่น', 'เมืองขอนแก่น', 'ในเมือง'),
('C005', 'nattakan@email.com', '085-555-6666', 'สงขลา', 'หาดใหญ่', 'หาดใหญ่');

INSERT INTO socio_economic_info (customer_id, education, occupation, monthly_income, industry_type) VALUES
('C001', 'ปริญญาตรี', 'วิศวกร', 45000.00, 'เทคโนโลยี'),
('C002', 'ปริญญาโท', 'ครู', 35000.00, 'การศึกษา'),
('C003', 'ปริญญาตรี', 'นักบัญชี', 40000.00, 'การเงิน'),
('C004', 'ปริญญาตรี', 'นักการตลาด', 38000.00, 'การตลาด'),
('C005', 'ปริญญาโท', 'แพทย์', 80000.00, 'สาธารณสุข');

-- FIXED: ใช้ค่าที่ตรงกับ ENUM ที่กำหนด
INSERT INTO travel_preferences (customer_id, preferred_destination_type, preferred_travel_style, accommodation_preference, budget_range, travel_companion_type) VALUES
('C001', 'ทะเล', 'ครอบครัว', 'รีสอร์ท', '20,000-50,000', 'ครอบครัว'),
('C002', 'ภูเขา', 'ผจญภัย', 'โฮมสเตย์', '10,000-20,000', 'เพื่อน'),
('C003', 'เมือง', 'หรูหรา', 'โรงแรม', 'มากกว่า 50,000', 'คู่'),
('C004', 'ประวัติศาสตร์', 'ประหยัด', 'เกสต์เฮาส์', '5,000-10,000', 'คนเดียว'),
('C005', 'วัฒนธรรม', 'ครอบครัว', 'โรงแรม', '20,000-50,000', 'ครอบครัว');

INSERT INTO interaction_history (customer_id, last_visit_date, total_visits, favorite_destinations, booking_channels) VALUES
('C001', '2024-10-15', 12, '["เกาะสมุย", "เกาะพะงัน"]', 'แอปมือถือ'),
('C002', '2024-09-20', 6, '["น่าน", "แม่ฮ่องสอน"]', 'เว็บไซต์'),
('C003', '2024-11-18', 19, '["มัลดีฟส์", "ดูไบ"]', 'ตัวแทนท่องเที่ยว'),
('C004', '2024-08-25', 3, '["ลพบุรี", "เพชรบูรณ์"]', 'Walk-in'),
('C005', '2024-12-02', 16, '["ฮ่องกง", "ไต้หวัน"]', 'แอปมือถือ');

INSERT INTO loyalty_program (customer_id, membership_level, member_since, total_points, last_activity_date) VALUES
('C001', 'ทอง', '2020-01-15', 5500, '2024-12-01'),
('C002', 'เงิน', '2021-03-10', 3200, '2024-11-25'),
('C003', 'แพลทินัม', '2019-08-20', 8900, '2024-12-05'),
('C004', 'บรอนซ์', '2023-05-12', 1200, '2024-11-30'),
('C005', 'ไดมอนด์', '2018-12-01', 15000, '2024-12-10');

INSERT INTO customer_consent (customer_id, preferred_language, communication_channels, newsletter_subscription, promotion_consent, data_usage_consent) VALUES
('C001', 'ไทย', 'อีเมล,SMS', TRUE, TRUE, TRUE),
('C002', 'ไทย', 'อีเมล,ไลน์', TRUE, FALSE, TRUE),
('C003', 'ไทย', 'อีเมล,โทรศัพท์', FALSE, TRUE, TRUE),
('C004', 'ไทย', 'อีเมล', TRUE, TRUE, FALSE),
('C005', 'ไทย', 'อีเมล,SMS,ไลน์', TRUE, TRUE, TRUE);

-- ตรวจสอบข้อมูลที่เพิ่มแล้ว
SELECT 'personal_info' as table_name, COUNT(*) as row_count FROM personal_info
UNION ALL
SELECT 'contact_info', COUNT(*) FROM contact_info
UNION ALL
SELECT 'socio_economic_info', COUNT(*) FROM socio_economic_info
UNION ALL
SELECT 'travel_preferences', COUNT(*) FROM travel_preferences
UNION ALL
SELECT 'interaction_history', COUNT(*) as row_count FROM interaction_history
UNION ALL
SELECT 'loyalty_program', COUNT(*) FROM loyalty_program
UNION ALL
SELECT 'customer_consent', COUNT(*) FROM customer_consent;