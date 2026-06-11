-- ============================================
-- TOURIST BEHAVIOR SURVEY DATABASE TABLES
-- แก้ไขปัญหาภาษาไทย - ใช้ utf8mb4_unicode_ci
-- ============================================

USE tourist_behavior_survey;

-- ตั้งค่า character set
SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 1. Survey Respondents
DROP TABLE IF EXISTS survey_respondents;
CREATE TABLE survey_respondents (
    respondent_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสผู้ตอบแบบสำรวจ',
    survey_year YEAR NOT NULL COMMENT 'ปีที่ทำการสำรวจ',
    survey_quarter ENUM('ไตรมาส 1', 'ไตรมาส 2', 'ไตรมาส 3', 'ไตรมาส 4') COMMENT 'ไตรมาสที่สำรวจ',
    survey_date DATE COMMENT 'วันที่สำรวจ',
    survey_method ENUM('ออนไลน์', 'โทรศัพท์', 'สัมภาษณ์ตัวต่อตัว', 'ไปรษณีย์') COMMENT 'วิธีการสำรวจ',
    interviewer_id VARCHAR(50) COMMENT 'รหัสผู้สัมภาษณ์',
    survey_location VARCHAR(255) COMMENT 'สถานที่สำรวจ',
    response_quality ENUM('ดีเยี่ยม', 'ดี', 'ปานกลาง', 'ต้องปรับปรุง') COMMENT 'คุณภาพการตอบ',
    completion_status ENUM('สมบูรณ์', 'บางส่วน', 'ไม่สมบูรณ์') DEFAULT 'สมบูรณ์' COMMENT 'สถานะการตอบ',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_survey_year (survey_year),
    INDEX idx_survey_quarter (survey_quarter),
    INDEX idx_survey_date (survey_date)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ข้อมูลผู้ตอบแบบสำรวจ';

-- 2. Demographic
DROP TABLE IF EXISTS demographic;
CREATE TABLE demographic (
    respondent_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสผู้ตอบแบบสำรวจ',
    age INT CHECK (age >= 0 AND age <= 120) COMMENT 'อายุ',
    age_group ENUM('ต่ำกว่า 18', '18-25', '26-35', '36-45', '46-60', 'มากกว่า 60') COMMENT 'กลุ่มอายุ',
    gender ENUM('ชาย', 'หญิง', 'อื่นๆ', 'ไม่ระบุ') COMMENT 'เพศ',
    education ENUM('ประถมศึกษา', 'มัธยมศึกษาตอนต้น', 'มัธยมศึกษาตอนปลาย', 'ประกาศนียบัตรวิชาชีพ', 'ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก') COMMENT 'การศึกษา',
    occupation VARCHAR(100) COMMENT 'อาชีพ',
    occupation_category ENUM('นักเรียน/นักศึกษา', 'ข้าราชการ', 'เอกชน', 'ธุรกิจส่วนตัว', 'เกษียณ', 'ว่างงาน') COMMENT 'หมวดอาชีพ',
    monthly_income DECIMAL(15,2) COMMENT 'รายได้ต่อเดือน',
    income_range ENUM('ต่ำกว่า 15,000', '15,000-30,000', '30,000-50,000', '50,000-100,000', 'มากกว่า 100,000') COMMENT 'ช่วงรายได้',
    province VARCHAR(100) COMMENT 'จังหวัด',
    region ENUM('ภาคเหนือ', 'ภาคตะวันออกเฉียงเหนือ', 'ภาคกลาง', 'ภาคตะวันออก', 'ภาคตะวันตก', 'ภาคใต้', 'กรุงเทพมหานคร') COMMENT 'ภาค',
    marital_status ENUM('โสด', 'สมรส', 'หย่าร้าง', 'หม้าย') COMMENT 'สถานภาพ',
    family_size INT COMMENT 'จำนวนสมาชิกในครอบครัว',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (respondent_id) REFERENCES survey_respondents(respondent_id) ON DELETE CASCADE,
    INDEX idx_age_group (age_group),
    INDEX idx_income_range (income_range),
    INDEX idx_region (region)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ข้อมูลประชากรศาสตร์';

-- 3. Travel Behavior
DROP TABLE IF EXISTS travel_behavior;
CREATE TABLE travel_behavior (
    respondent_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสผู้ตอบแบบสำรวจ',
    domestic_travel_frequency ENUM('ไม่เคย', '1-2 ครั้ง/ปี', '3-5 ครั้ง/ปี', '6-10 ครั้ง/ปี', 'มากกว่า 10 ครั้ง/ปี') COMMENT 'ความถี่การท่องเที่ยวในประเทศ',
    international_travel_frequency ENUM('ไม่เคย', '1-2 ครั้ง/ปี', '3-5 ครั้ง/ปี', '6-10 ครั้ง/ปี', 'มากกว่า 10 ครั้ง/ปี') COMMENT 'ความถี่การท่องเที่ยวต่างประเทศ',
    preferred_travel_season ENUM('ฤดูใบไม้ผลิ', 'ฤดูร้อน', 'ฤดูใบไม้ร่วง', 'ฤดูหนาว', 'ฤดูฝน', 'ฤดูเย็น') COMMENT 'ฤดูกาลที่ชอบเดินทาง',
    travel_duration ENUM('เที่ยววันเดียว', '1-2 คืน', '3-5 คืน', '6-10 คืน', 'มากกว่า 10 คืน') COMMENT 'ระยะเวลาการเดินทาง',
    average_budget_per_trip DECIMAL(15,2) COMMENT 'งบประมาณเฉลี่ยต่อการเดินทาง',
    budget_range ENUM('ต่ำกว่า 5,000', '5,000-15,000', '15,000-30,000', '30,000-50,000', 'มากกว่า 50,000') COMMENT 'ช่วงงบประมาณ',
    travel_companion ENUM('คนเดียว', 'คู่สมรส/แฟน', 'ครอบครัว', 'เพื่อน', 'กลุ่มทัวร์', 'เพื่อนร่วมงาน') COMMENT 'คู่เดินทาง',
    booking_channel ENUM('ตัวแทนท่องเที่ยว', 'แพลตฟอร์มออนไลน์', 'จองตรง', 'โทรศัพท์', 'เดินเข้าไป') COMMENT 'ช่องทางการจอง',
    information_source SET('อินเทอร์เน็ต', 'โซเชียลมีเดีย', 'เพื่อน/ครอบครัว', 'ตัวแทนท่องเที่ยว', 'โบรชัวร์', 'ทีวี/วิทยุ') COMMENT 'แหล่งข้อมูล',
    planning_time ENUM('วันเดียวกัน', '1-7 วัน', '1-4 สัปดาห์', '1-3 เดือน', 'มากกว่า 3 เดือน') COMMENT 'เวลาในการวางแผน',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (respondent_id) REFERENCES survey_respondents(respondent_id) ON DELETE CASCADE,
    INDEX idx_domestic_freq (domestic_travel_frequency),
    INDEX idx_budget_range (budget_range),
    INDEX idx_travel_season (preferred_travel_season)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='พฤติกรรมการท่องเที่ยว';

-- 4. Destination Preferences
DROP TABLE IF EXISTS destination_preferences;
CREATE TABLE destination_preferences (
    respondent_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสผู้ตอบแบบสำรวจ',
    preferred_destination_type SET('ทะเล', 'ภูเขา', 'เมือง', 'ประวัติศาสตร์', 'วัฒนธรรม', 'ธรรมชาติ', 'ผจญภัย', 'ศาสนา') COMMENT 'ประเภทจุดหมายปลายทางที่ชอบ',
    preferred_activities SET('ชมสถานที่', 'ช้อปปิ้ง', 'ท่องเที่ยวเชิงอาหาร', 'กีฬาผจญภัย', 'กิจกรรมทางวัฒนธรรม', 'พักผ่อน', 'ถ่ายรูป', 'เรียนรู้') COMMENT 'กิจกรรมที่ชอบ',
    accommodation_type SET('โรงแรม', 'รีสอร์ท', 'เกสต์เฮาส์', 'โฮสเทล', 'โฮมสเตย์', 'แคมปิ้ง', 'เช่าบ้านพักตากอากาศ') COMMENT 'ประเภทที่พัก',
    transportation_mode SET('รถยนต์', 'รถบัส', 'รถไฟ', 'เครื่องบิน', 'เรือ', 'รถจักรยานยนต์', 'จักรยาน') COMMENT 'รูปแบบการเดินทาง',
    dining_preference SET('อาหารท้องถิ่น', 'อาหารนานาชาติ', 'อาหารข้างถนน', 'ร้านอาหารหรู', 'อาหารจานด่วน', 'อาหารมังสวิรัติ/เจ') COMMENT 'ความชอบด้านอาหาร',
    shopping_interest SET('ของที่ระลึก', 'ผลิตภัณฑ์ท้องถิ่น', 'แฟชั่น', 'อิเล็กทรอนิกส์', 'งานฝีมือ', 'ผลิตภัณฑ์อาหาร') COMMENT 'ความสนใจด้านการช้อปปิ้ง',
    entertainment_preference SET('ไนท์ไลฟ์', 'การแสดงวัฒนธรรม', 'พิพิธภัณฑ์', 'เทศกาล', 'กิจกรรมกีฬา', 'คอนเสิร์ต') COMMENT 'ความชอบด้านความบันเทิง',
    favorite_domestic_destinations TEXT COMMENT 'จุดหมายในประเทศที่ชื่นชอบ (JSON)',
    favorite_international_destinations TEXT COMMENT 'จุดหมายต่างประเทศที่ชื่นชอบ (JSON)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (respondent_id) REFERENCES survey_respondents(respondent_id) ON DELETE CASCADE
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ความชอบจุดหมายปลายทาง';

-- 5. COVID Impact
DROP TABLE IF EXISTS covid_impact;
CREATE TABLE covid_impact (
    respondent_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสผู้ตอบแบบสำรวจ',
    travel_frequency_change ENUM('เพิ่มขึ้นมาก', 'เพิ่มขึ้นเล็กน้อย', 'ไม่เปลี่ยนแปลง', 'ลดลงเล็กน้อย', 'ลดลงมาก', 'หยุดเดินทางทั้งหมด') COMMENT 'การเปลี่ยนแปลงความถี่การเดินทาง',
    budget_change ENUM('เพิ่มขึ้นมาก', 'เพิ่มขึ้นเล็กน้อย', 'ไม่เปลี่ยนแปลง', 'ลดลงเล็กน้อย', 'ลดลงมาก') COMMENT 'การเปลี่ยนแปลงงบประมาณ',
    destination_preference_change ENUM('ในประเทศมากขึ้น', 'ต่างประเทศมากขึ้น', 'ระยะทางใกล้ขึ้น', 'ระยะทางไกลขึ้น', 'ไม่เปลี่ยนแปลง') COMMENT 'การเปลี่ยนแปลงความชอบจุดหมายปลายทาง',
    safety_measures SET('สวมหน้ากาก', 'เว้นระยะห่างทางสังคม', 'ล้างมือบ่อยๆ', 'ใบรับรองวัคซีน', 'ประกันสุขภาพ', 'ตรวจ PCR') COMMENT 'มาตรการความปลอดภัย',
    vaccination_status ENUM('ไม่ได้ฉีดวัคซีน', 'ฉีดไม่ครบ', 'ฉีดครบ', 'ฉีดเข็มกระตุ้น') COMMENT 'สถานะการฉีดวัคซีน',
    travel_confidence ENUM('มั่นใจมาก', 'มั่นใจ', 'เฉยๆ', 'ไม่มั่นใจ', 'ไม่มั่นใจมาก') COMMENT 'ความมั่นใจในการเดินทาง',
    preferred_group_size ENUM('คนเดียว', 'กลุ่มเล็ก (2-5 คน)', 'กลุ่มกลาง (6-15 คน)', 'กลุ่มใหญ่ (16+ คน)', 'ไม่จำกัด') COMMENT 'ขนาดกลุ่มที่ต้องการ',
    booking_timing_change ENUM('จองเร็วขึ้น', 'จองช้าลง', 'จองแบบยืดหยุ่นมากขึ้น', 'ไม่เปลี่ยนแปลง') COMMENT 'การเปลี่ยนแปลงเวลาการจอง',
    hygiene_importance ENUM('สำคัญมาก', 'สำคัญ', 'ปานกลาง', 'ไม่สำคัญ', 'ไม่สำคัญเลย') COMMENT 'ความสำคัญของสุขอนามัย',
    future_travel_plans ENUM('มากกว่าเดิม', 'เท่าเดิม', 'น้อยกว่าเดิม', 'ไม่มีแผน', 'ไม่แน่ใจ') COMMENT 'แผนการเดินทางในอนาคต',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (respondent_id) REFERENCES survey_respondents(respondent_id) ON DELETE CASCADE,
    INDEX idx_frequency_change (travel_frequency_change),
    INDEX idx_confidence (travel_confidence),
    INDEX idx_vaccination (vaccination_status)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ผลกระทบจาก COVID-19';

-- 6. Digital Behavior
DROP TABLE IF EXISTS digital_behavior;
CREATE TABLE digital_behavior (
    respondent_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสผู้ตอบแบบสำรวจ',
    social_media_usage SET('Facebook', 'Instagram', 'TikTok', 'Twitter', 'YouTube', 'LINE', 'WeChat') COMMENT 'การใช้โซเชียลมีเดีย',
    online_booking_frequency ENUM('ทุกครั้ง', 'บ่อยครั้ง', 'บางครั้ง', 'นานๆ ครั้ง', 'ไม่เคย') COMMENT 'ความถี่การจองออนไลน์',
    preferred_devices SET('สมาร์ทโฟน', 'แท็บเล็ต', 'โน้ตบุ๊ก', 'คอมพิวเตอร์', 'สมาร์ทวอทช์') COMMENT 'อุปกรณ์ที่ใช้',
    travel_apps_used SET('Agoda', 'Booking.com', 'Airbnb', 'Grab', 'Google Maps', 'TripAdvisor', 'Expedia') COMMENT 'แอปท่องเที่ยวที่ใช้',
    review_posting_behavior ENUM('โพสต์บ่อยมาก', 'โพสต์บางครั้ง', 'อ่านอย่างเดียว', 'ไม่สนใจรีวิว') COMMENT 'พฤติกรรมการโพสต์รีวิว',
    influencer_impact ENUM('มีผลกระทบมาก', 'มีผลกระทบบ้าง', 'มีผลกระทบเล็กน้อย', 'ไม่มีผลกระทบ') COMMENT 'อิทธิพลจากอินฟลูเอนเซอร์',
    digital_payment_preference SET('บัตรเครดิต', 'โมบายแบงกิ้ง', 'QR Code', 'e-Wallet', 'PayPal', 'Bitcoin') COMMENT 'การชำระเงินดิจิทัล',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (respondent_id) REFERENCES survey_respondents(respondent_id) ON DELETE CASCADE,
    INDEX idx_online_booking (online_booking_frequency),
    INDEX idx_social_media (social_media_usage)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='พฤติกรรมดิจิทัล';

-- 7. Satisfaction Ratings
DROP TABLE IF EXISTS satisfaction_ratings;
CREATE TABLE satisfaction_ratings (
    respondent_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสผู้ตอบแบบสำรวจ',
    overall_satisfaction ENUM('5 - ดีมาก', '4 - ดี', '3 - ปานกลาง', '2 - แย่', '1 - แย่มาก') COMMENT 'ความพึงพอใจโดยรวม',
    accommodation_satisfaction ENUM('5 - ดีมาก', '4 - ดี', '3 - ปานกลาง', '2 - แย่', '1 - แย่มาก') COMMENT 'ความพึงพอใจที่พัก',
    food_satisfaction ENUM('5 - ดีมาก', '4 - ดี', '3 - ปานกลาง', '2 - แย่', '1 - แย่มาก') COMMENT 'ความพึงพอใจอาหาร',
    transportation_satisfaction ENUM('5 - ดีมาก', '4 - ดี', '3 - ปานกลาง', '2 - แย่', '1 - แย่มาก') COMMENT 'ความพึงพอใจการเดินทาง',
    attractions_satisfaction ENUM('5 - ดีมาก', '4 - ดี', '3 - ปานกลาง', '2 - แย่', '1 - แย่มาก') COMMENT 'ความพึงพอใจสถานที่ท่องเที่ยว',
    service_satisfaction ENUM('5 - ดีมาก', '4 - ดี', '3 - ปานกลาง', '2 - แย่', '1 - แย่มาก') COMMENT 'ความพึงพอใจการบริการ',
    value_for_money ENUM('5 - คุ้มค่ามาก', '4 - คุ้มค่า', '3 - ปานกลาง', '2 - ไม่คุ้มค่า', '1 - ไม่คุ้มค่าเลย') COMMENT 'ความคุ้มค่า',
    recommendation_likelihood ENUM('5 - แนะนำอย่างแน่นอน', '4 - น่าจะแนะนำ', '3 - เฉยๆ', '2 - ไม่แนะนำ', '1 - ไม่แนะนำอย่างแน่นอน') COMMENT 'ความน่าจะแนะนำ',
    repeat_visit_intention ENUM('แน่นอน', 'น่าจะมา', 'ไม่แน่ใจ', 'น่าจะไม่มา', 'ไม่มาแน่นอน') COMMENT 'ความตั้งใจกลับมาใหม่',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (respondent_id) REFERENCES survey_respondents(respondent_id) ON DELETE CASCADE,
    INDEX idx_overall_satisfaction (overall_satisfaction),
    INDEX idx_recommendation (recommendation_likelihood)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='คะแนนความพึงพอใจ';

-- Sample Data ภาษาไทย
INSERT INTO survey_respondents (respondent_id, survey_year, survey_quarter, survey_date, survey_method, survey_location, response_quality, completion_status) VALUES
('S001', 2024, 'ไตรมาส 1', '2024-03-15', 'ออนไลน์', 'กรุงเทพมหานคร', 'ดีเยี่ยม', 'สมบูรณ์'),
('S002', 2024, 'ไตรมาส 1', '2024-03-18', 'สัมภาษณ์ตัวต่อตัว', 'เชียงใหม่', 'ดี', 'สมบูรณ์'),
('S003', 2024, 'ไตรมาส 2', '2024-06-10', 'โทรศัพท์', 'ขอนแก่น', 'ปานกลาง', 'บางส่วน'),
('S004', 2024, 'ไตรมาส 2', '2024-06-20', 'ออนไลน์', 'ภูเก็ต', 'ดีเยี่ยม', 'สมบูรณ์'),
('S005', 2024, 'ไตรมาส 3', '2024-09-05', 'สัมภาษณ์ตัวต่อตัว', 'สงขลา', 'ดี', 'สมบูรณ์');

INSERT INTO demographic (respondent_id, age, age_group, gender, education, monthly_income, province, region, marital_status) VALUES
('S001', 32, '26-35', 'ชาย', 'ปริญญาตรี', 45000.00, 'กรุงเทพมหานคร', 'กรุงเทพมหานคร', 'สมรส'),
('S002', 28, '26-35', 'หญิง', 'ปริญญาโท', 55000.00, 'เชียงใหม่', 'ภาคเหนือ', 'โสด'),
('S003', 45, '36-45', 'ชาย', 'มัธยมศึกษาตอนปลาย', 25000.00, 'ขอนแก่น', 'ภาคตะวันออกเฉียงเหนือ', 'สมรส'),
('S004', 26, '18-25', 'หญิง', 'ปริญญาตรี', 35000.00, 'ภูเก็ต', 'ภาคใต้', 'โสด'),
('S005', 52, '46-60', 'หญิง', 'ปริญญาโท', 65000.00, 'สงขลา', 'ภาคใต้', 'หม้าย');

INSERT INTO travel_behavior (respondent_id, domestic_travel_frequency, international_travel_frequency, preferred_travel_season, travel_duration, budget_range, travel_companion, booking_channel) VALUES
('S001', '3-5 ครั้ง/ปี', '1-2 ครั้ง/ปี', 'ฤดูเย็น', '3-5 คืน', '15,000-30,000', 'ครอบครัว', 'แพลตฟอร์มออนไลน์'),
('S002', '6-10 ครั้ง/ปี', '3-5 ครั้ง/ปี', 'ฤดูหนาว', '6-10 คืน', '30,000-50,000', 'เพื่อน', 'ตัวแทนท่องเที่ยว'),
('S003', '1-2 ครั้ง/ปี', 'ไม่เคย', 'ฤดูฝน', '1-2 คืน', '5,000-15,000', 'ครอบครัว', 'จองตรง'),
('S004', 'มากกว่า 10 ครั้ง/ปี', '6-10 ครั้ง/ปี', 'ฤดูร้อน', 'มากกว่า 10 คืน', 'มากกว่า 50,000', 'คู่สมรส/แฟน', 'แพลตฟอร์มออนไลน์'),
('S005', '3-5 ครั้ง/ปี', '1-2 ครั้ง/ปี', 'ฤดูเย็น', '6-10 คืน', '30,000-50,000', 'ครอบครัว', 'ตัวแทนท่องเที่ยว');

INSERT INTO destination_preferences (respondent_id, preferred_destination_type, preferred_activities, accommodation_type, transportation_mode, dining_preference) VALUES
('S001', 'ทะเล,วัฒนธรรม', 'ชมสถานที่,ถ่ายรูป,พักผ่อน', 'โรงแรม,รีสอร์ท', 'รถยนต์,เครื่องบิน', 'อาหารท้องถิ่น,อาหารนานาชาติ'),
('S002', 'ภูเขา,ธรรมชาติ,ผจญภัย', 'กีฬาผจญภัย,ถ่ายรูป,เรียนรู้', 'โฮมสเตย์,แคมปิ้ง', 'รถยนต์,รถบัส', 'อาหารท้องถิ่น,อาหารข้างถนน'),
('S003', 'ประวัติศาสตร์,ศาสนา', 'ชมสถานที่,เรียนรู้', 'เกสต์เฮาส์,โฮมสเตย์', 'รถบัส,รถไฟ', 'อาหารท้องถิ่น'),
('S004', 'ทะเล,เมือง', 'ช้อปปิ้ง,ท่องเที่ยวเชิงอาหาร,ถ่ายรูป', 'โรงแรม,เช่าบ้านพักตากอากาศ', 'เครื่องบิน,รถยนต์', 'อาหารนานาชาติ,ร้านอาหารหรู'),
('S005', 'วัฒนธรรม,ประวัติศาสตร์', 'ชมสถานที่,กิจกรรมทางวัฒนธรรม,เรียนรู้', 'โรงแรม,โฮมสเตย์', 'รถยนต์,รถไฟ', 'อาหารท้องถิ่น,อาหารนานาชาติ');

INSERT INTO covid_impact (respondent_id, travel_frequency_change, budget_change, destination_preference_change, safety_measures, vaccination_status, travel_confidence) VALUES
('S001', 'ลดลงเล็กน้อย', 'ลดลงเล็กน้อย', 'ในประเทศมากขึ้น', 'สวมหน้ากาก,ล้างมือบ่อยๆ,ใบรับรองวัคซีน', 'ฉีดครบ', 'มั่นใจ'),
('S002', 'ลดลงมาก', 'ลดลงมาก', 'ระยะทางใกล้ขึ้น', 'สวมหน้ากาก,เว้นระยะห่างทางสังคม,ล้างมือบ่อยๆ', 'ฉีดเข็มกระตุ้น', 'เฉยๆ'),
('S003', 'หยุดเดินทางทั้งหมด', 'ลดลงมาก', 'ในประเทศมากขึ้น', 'สวมหน้ากาก,ล้างมือบ่อยๆ', 'ฉีดไม่ครบ', 'ไม่มั่นใจ'),
('S004', 'ไม่เปลี่ยนแปลง', 'เพิ่มขึ้นเล็กน้อย', 'ไม่เปลี่ยนแปลง', 'ใบรับรองวัคซีน,ประกันสุขภาพ', 'ฉีดเข็มกระตุ้น', 'มั่นใจมาก'),
('S005', 'ลดลงเล็กน้อย', 'ไม่เปลี่ยนแปลง', 'ในประเทศมากขึ้น', 'สวมหน้ากาก,ล้างมือบ่อยๆ,ใบรับรองวัคซีน', 'ฉีดครบ', 'มั่นใจ');

INSERT INTO digital_behavior (respondent_id, social_media_usage, online_booking_frequency, preferred_devices, travel_apps_used, review_posting_behavior) VALUES
('S001', 'Facebook,Instagram,LINE', 'บ่อยครั้ง', 'สมาร์ทโฟน,โน้ตบุ๊ก', 'Agoda,Google Maps,Grab', 'โพสต์บางครั้ง'),
('S002', 'Instagram,TikTok,YouTube', 'ทุกครั้ง', 'สมาร์ทโฟน,แท็บเล็ต', 'Booking.com,Airbnb,TripAdvisor', 'โพสต์บ่อยมาก'),
('S003', 'Facebook,LINE', 'นานๆ ครั้ง', 'สมาร์ทโฟน', 'Google Maps', 'อ่านอย่างเดียว'),
('S004', 'Instagram,TikTok,Twitter,YouTube', 'ทุกครั้ง', 'สมาร์ทโฟน,โน้ตบุ๊ก,แท็บเล็ต', 'Agoda,Booking.com,Airbnb,TripAdvisor', 'โพสต์บ่อยมาก'),
('S005', 'Facebook,LINE,YouTube', 'บางครั้ง', 'สมาร์ทโฟน,โน้ตบุ๊ก', 'Agoda,Google Maps', 'โพสต์บางครั้ง');

INSERT INTO satisfaction_ratings (respondent_id, overall_satisfaction, accommodation_satisfaction, food_satisfaction, transportation_satisfaction, attractions_satisfaction, service_satisfaction, value_for_money, recommendation_likelihood, repeat_visit_intention) VALUES
('S001', '4 - ดี', '4 - ดี', '5 - ดีมาก', '3 - ปานกลาง', '4 - ดี', '4 - ดี', '4 - คุ้มค่า', '4 - น่าจะแนะนำ', 'น่าจะมา'),
('S002', '5 - ดีมาก', '5 - ดีมาก', '4 - ดี', '4 - ดี', '5 - ดีมาก', '5 - ดีมาก', '5 - คุ้มค่ามาก', '5 - แนะนำอย่างแน่นอน', 'แน่นอน'),
('S003', '3 - ปานกลาง', '3 - ปานกลาง', '3 - ปานกลาง', '2 - แย่', '3 - ปานกลาง', '3 - ปานกลาง', '3 - ปานกลาง', '3 - เฉยๆ', 'ไม่แน่ใจ'),
('S004', '5 - ดีมาก', '5 - ดีมาก', '5 - ดีมาก', '5 - ดีมาก', '5 - ดีมาก', '5 - ดีมาก', '4 - คุ้มค่า', '5 - แนะนำอย่างแน่นอน', 'แน่นอน'),
('S005', '4 - ดี', '4 - ดี', '4 - ดี', '4 - ดี', '5 - ดีมาก', '4 - ดี', '4 - คุ้มค่า', '4 - น่าจะแนะนำ', 'น่าจะมา');

-- ตรวจสอบข้อมูลที่เพิ่มแล้ว
SELECT 'survey_respondents' as table_name, COUNT(*) as row_count FROM survey_respondents
UNION ALL
SELECT 'demographic', COUNT(*) FROM demographic
UNION ALL
SELECT 'travel_behavior', COUNT(*) FROM travel_behavior
UNION ALL
SELECT 'destination_preferences', COUNT(*) FROM destination_preferences
UNION ALL
SELECT 'covid_impact', COUNT(*) FROM covid_impact
UNION ALL
SELECT 'digital_behavior', COUNT(*) FROM digital_behavior
UNION ALL
SELECT 'satisfaction_ratings', COUNT(*) FROM satisfaction_ratings;