-- ============================================
-- TOURISM SITUATION REPORT DATABASE TABLES
-- แก้ไขปัญหาภาษาไทย - ใช้ utf8mb4_unicode_ci
-- ============================================

USE tourism_situation_report;

-- ตั้งค่า character set
SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 1. Document Basic Info
DROP TABLE IF EXISTS document_basic_info;
CREATE TABLE document_basic_info (
    document_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสเอกสาร',
    document_title VARCHAR(500) NOT NULL COMMENT 'ชื่อเอกสาร',
    document_type ENUM('รายงาน', 'การวิเคราะห์', 'การสำรวจ', 'สถิติ', 'นโยบาย', 'แนวทาง') COMMENT 'ประเภทเอกสาร',
    language ENUM('ไทย', 'อังกฤษ', 'จีน', 'ญี่ปุ่น') DEFAULT 'ไทย' COMMENT 'ภาษา',
    creation_date DATE COMMENT 'วันที่สร้าง',
    last_modified_date DATE COMMENT 'วันที่แก้ไขล่าสุด',
    version VARCHAR(20) COMMENT 'เวอร์ชัน',
    status ENUM('ร่าง', 'ตรวจสอบ', 'อนุมัติ', 'เผยแพร่', 'เก็บถาวร') COMMENT 'สถานะ',
    keywords TEXT COMMENT 'คำสำคัญ',
    abstract TEXT COMMENT 'บทคัดย่อ',
    classification ENUM('สาธารณะ', 'ภายใน', 'ลับ', 'ลับที่สุด') DEFAULT 'สาธารณะ' COMMENT 'ระดับความลับ',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_document_type (document_type),
    INDEX idx_creation_date (creation_date),
    INDEX idx_status (status)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ข้อมูลพื้นฐานเอกสาร';

-- 2. Project Details
DROP TABLE IF EXISTS project_details;
CREATE TABLE project_details (
    document_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสเอกสาร',
    project_id VARCHAR(50) COMMENT 'รหัสโครงการ',
    project_year YEAR COMMENT 'ปีโครงการ',
    project_name VARCHAR(500) COMMENT 'ชื่อโครงการ',
    research_methodology TEXT COMMENT 'วิธีการวิจัย',
    data_sources TEXT COMMENT 'แหล่งข้อมูล',
    budget DECIMAL(15,2) COMMENT 'งบประมาณ',
    project_duration INT COMMENT 'ระยะเวลาโครงการ (วัน)',
    principal_investigator VARCHAR(255) COMMENT 'หัวหน้าโครงการ',
    co_investigators TEXT COMMENT 'ผู้ร่วมวิจัย (JSON)',
    funding_source VARCHAR(255) COMMENT 'แหล่งทุน',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES document_basic_info(document_id) ON DELETE CASCADE,
    INDEX idx_project_year (project_year),
    INDEX idx_project_id (project_id)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='รายละเอียดโครงการ';

-- 3. File Properties
DROP TABLE IF EXISTS file_properties;
CREATE TABLE file_properties (
    document_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสเอกสาร',
    file_name VARCHAR(255) COMMENT 'ชื่อไฟล์',
    file_format ENUM('PDF', 'DOC', 'DOCX', 'XLS', 'XLSX', 'PPT', 'PPTX') COMMENT 'รูปแบบไฟล์',
    file_size_mb DECIMAL(10,3) COMMENT 'ขนาดไฟล์ (MB)',
    number_of_pages INT COMMENT 'จำนวนหน้า',
    file_checksum VARCHAR(255) COMMENT 'ค่า Checksum',
    creating_application VARCHAR(100) COMMENT 'โปรแกรมที่สร้าง',
    is_searchable_pdf BOOLEAN DEFAULT FALSE COMMENT 'สามารถค้นหาใน PDF ได้หรือไม่',
    password_protected BOOLEAN DEFAULT FALSE COMMENT 'มีรหัสผ่านหรือไม่',
    digital_signature BOOLEAN DEFAULT FALSE COMMENT 'มีลายเซ็นดิจิทัลหรือไม่',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES document_basic_info(document_id) ON DELETE CASCADE,
    INDEX idx_file_format (file_format),
    INDEX idx_file_size (file_size_mb)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='คุณสมบัติไฟล์';

-- 4. Organizational Details
DROP TABLE IF EXISTS organizational_details;
CREATE TABLE organizational_details (
    document_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสเอกสาร',
    owning_organization VARCHAR(255) COMMENT 'องค์กรเจ้าของ',
    responsible_division VARCHAR(255) COMMENT 'หน่วยงานรับผิดชอบ',
    department VARCHAR(255) COMMENT 'แผนก',
    organization_type ENUM('รัฐบาล', 'เอกชน', 'สถาบันการศึกษา', 'องค์กรไม่แสวงหากำไร', 'องค์กรระหว่างประเทศ') COMMENT 'ประเภทองค์กร',
    organization_level ENUM('ระดับชาติ', 'ระดับภูมิภาค', 'ระดับจังหวัด', 'ระดับท้องถิ่น') COMMENT 'ระดับองค์กร',
    parent_organization VARCHAR(255) COMMENT 'องค์กรแม่',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES document_basic_info(document_id) ON DELETE CASCADE,
    INDEX idx_organization (owning_organization),
    INDEX idx_org_type (organization_type)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='รายละเอียดองค์กร';

-- 5. Contact Details
DROP TABLE IF EXISTS contact_details;
CREATE TABLE contact_details (
    document_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสเอกสาร',
    contact_person VARCHAR(255) COMMENT 'ผู้ติดต่อ',
    position VARCHAR(100) COMMENT 'ตำแหน่ง',
    email VARCHAR(255) COMMENT 'อีเมล',
    telephone VARCHAR(20) COMMENT 'โทรศัพท์',
    mobile VARCHAR(20) COMMENT 'มือถือ',
    fax VARCHAR(20) COMMENT 'แฟกซ์',
    office_hours VARCHAR(100) COMMENT 'เวลาทำการ',
    alternative_contact VARCHAR(255) COMMENT 'ผู้ติดต่อสำรอง',
    alternative_email VARCHAR(255) COMMENT 'อีเมลสำรอง',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES document_basic_info(document_id) ON DELETE CASCADE,
    INDEX idx_contact_person (contact_person),
    INDEX idx_email (email)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='ข้อมูลการติดต่อ';

-- 6. License Details
DROP TABLE IF EXISTS license_details;
CREATE TABLE license_details (
    document_id VARCHAR(50) NOT NULL PRIMARY KEY COMMENT 'รหัสเอกสาร',
    license_type ENUM('สาธารณสมบัติ', 'ครีเอทีฟคอมมอนส์', 'เชิงพาณิชย์', 'จำกัดการใช้', 'ลิขสิทธิ์รัฐบาล') COMMENT 'ประเภทลิขสิทธิ์',
    license_url VARCHAR(500) COMMENT 'URL ลิขสิทธิ์',
    usage_restrictions TEXT COMMENT 'ข้อจำกัดการใช้งาน',
    attribution_required BOOLEAN DEFAULT TRUE COMMENT 'ต้องระบุที่มาหรือไม่',
    commercial_use_allowed BOOLEAN DEFAULT FALSE COMMENT 'อนุญาตใช้เชิงพาณิชย์หรือไม่',
    modification_allowed BOOLEAN DEFAULT FALSE COMMENT 'อนุญาตแก้ไขหรือไม่',
    distribution_allowed BOOLEAN DEFAULT TRUE COMMENT 'อนุญาตแจกจ่ายหรือไม่',
    copyright_notice TEXT COMMENT 'ข้อความลิขสิทธิ์',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES document_basic_info(document_id) ON DELETE CASCADE,
    INDEX idx_license_type (license_type)
) ENGINE=InnoDB 
DEFAULT CHARSET=utf8mb4 
COLLATE=utf8mb4_unicode_ci 
COMMENT='รายละเอียดลิขสิทธิ์';

-- Sample Data ภาษาไทย
INSERT INTO document_basic_info (document_id, document_title, document_type, language, creation_date, status, keywords, abstract) VALUES
('DOC001', 'รายงานสถานการณ์การท่องเที่ยวไทย ปี 2567', 'รายงาน', 'ไทย', '2024-06-15', 'เผยแพร่', 'การท่องเที่ยว, สถิติ, ไทย, 2567', 'รายงานสรุปสถานการณ์การท่องเที่ยวของประเทศไทยในปี 2567'),
('DOC002', 'การวิเคราะห์พฤติกรรมนักท่องเที่ยวหลัง COVID-19', 'การวิเคราะห์', 'ไทย', '2024-08-20', 'ตรวจสอบ', 'COVID-19, พฤติกรรม, นักท่องเที่ยว', 'การศึกษาเปลี่ยนแปลงพฤติกรรมการท่องเที่ยวหลังสถานการณ์โควิด-19'),
('DOC003', 'แนวทางการพัฒนาการท่องเที่ยวยั่งยืน', 'แนวทาง', 'ไทย', '2024-09-10', 'ร่าง', 'การท่องเที่ยวยั่งยืน, การพัฒนา, แนวทาง', 'แนวทางและยุทธศาสตร์การพัฒนาการท่องเที่ยวอย่างยั่งยืน'),
('DOC004', 'สถิตินักท่องเที่ยวต่างชาติ ไตรมาส 3 ปี 2567', 'สถิติ', 'ไทย', '2024-10-05', 'เผยแพร่', 'นักท่องเที่ยวต่างชาติ, สถิติ, ไตรมาส 3', 'รายงานสถิติการมาเยือนของนักท่องเที่ยวต่างชาติในไตรมาส 3'),
('DOC005', 'นโยบายส่งเสริมการท่องเที่ยวภายในประเทศ', 'นโยบาย', 'ไทย', '2024-11-12', 'อนุมัติ', 'นโยบาย, การท่องเที่ยวภายในประเทศ', 'นโยบายและมาตรการส่งเสริมการท่องเที่ยวภายในประเทศ');

INSERT INTO project_details (document_id, project_id, project_year, project_name, budget, principal_investigator, funding_source) VALUES
('DOC001', 'PROJ2024001', 2024, 'โครงการสำรวจสถานการณ์การท่องเที่ยวไทย', 2500000.00, 'ดร.สมชาย วิจัยดี', 'การท่องเที่ยวแห่งประเทศไทย'),
('DOC002', 'PROJ2024002', 2024, 'โครงการศึกษาผลกระทบโควิด-19 ต่อการท่องเที่ยว', 1800000.00, 'ผศ.วิมลา ศึกษาลึก', 'สำนักงานคณะกรรมการวิจัยแห่งชาติ'),
('DOC003', 'PROJ2024003', 2024, 'โครงการพัฒนาแนวทางการท่องเที่ยวยั่งยืน', 3200000.00, 'รศ.ประเสริฐ ยั่งยืน', 'กรมการท่องเที่ยว'),
('DOC004', 'PROJ2024004', 2024, 'โครงการรวบรวมสถิติการท่องเที่ยว', 800000.00, 'นางสุดา รวบรวม', 'การท่องเที่ยวแห่งประเทศไทย'),
('DOC005', 'PROJ2024005', 2024, 'โครงการจัดทำนโยบายการท่องเที่ยว', 1500000.00, 'นายวิชัย นโยบาย', 'กระทรวงการท่องเที่ยวและกีฬา');

INSERT INTO organizational_details (document_id, owning_organization, responsible_division, organization_type, organization_level) VALUES
('DOC001', 'การท่องเที่ยวแห่งประเทศไทย', 'ฝ่ายวิจัยและพัฒนา', 'รัฐบาล', 'ระดับชาติ'),
('DOC002', 'มหาวิทยาลัยมหิดล', 'คณะสังคมศาสตร์และมนุษยศาสตร์', 'สถาบันการศึกษา', 'ระดับชาติ'),
('DOC003', 'กรมการท่องเที่ยว', 'กลุ่มงานพัฒนาการท่องเที่ยวยั่งยืน', 'รัฐบาล', 'ระดับชาติ'),
('DOC004', 'การท่องเที่ยวแห่งประเทศไทย', 'ฝ่ายสถิติและข้อมูล', 'รัฐบาล', 'ระดับชาติ'),
('DOC005', 'กระทรวงการท่องเที่ยวและกีฬา', 'กลุ่มงานนโยบาย', 'รัฐบาล', 'ระดับชาติ');

INSERT INTO contact_details (document_id, contact_person, position, email, telephone, office_hours) VALUES
('DOC001', 'นายสมชาย วิจัยดี', 'นักวิจัยอาวุโส', 'somshai.research@tat.or.th', '02-250-5500', '08:30-16:30 น.'),
('DOC002', 'ผศ.วิมลา ศึกษาลึก', 'ผู้ช่วยศาสตราจารย์', 'wimala.study@mahidol.ac.th', '02-441-9000', '09:00-17:00 น.'),
('DOC003', 'รศ.ประเสริฐ ยั่งยืน', 'รองศาสตราจารย์', 'prasert.sustain@tourism.go.th', '02-282-9773', '08:30-16:30 น.'),
('DOC004', 'นางสุดา รวบรวม', 'หัวหน้าฝ่ายสถิติ', 'suda.collect@tat.or.th', '02-250-5600', '08:30-16:30 น.'),
('DOC005', 'นายวิชัย นโยบาย', 'ผู้อำนวยการกลุ่มงาน', 'wichai.policy@mots.go.th', '02-628-1100', '08:30-16:30 น.');

INSERT INTO file_properties (document_id, file_name, file_format, file_size_mb, number_of_pages, creating_application) VALUES
('DOC001', 'รายงานสถานการณ์การท่องเที่ยวไทย2567.pdf', 'PDF', 15.8, 120, 'Adobe Acrobat Pro'),
('DOC002', 'วิเคราะห์พฤติกรรมนักท่องเที่ยวCOVID19.docx', 'DOCX', 8.2, 85, 'Microsoft Word 2021'),
('DOC003', 'แนวทางการพัฒนาการท่องเที่ยวยั่งยืน.pdf', 'PDF', 12.5, 95, 'Adobe Acrobat Pro'),
('DOC004', 'สถิตินักท่องเที่ยวต่างชาติQ3-2567.xlsx', 'XLSX', 5.3, 45, 'Microsoft Excel 2021'),
('DOC005', 'นโยบายส่งเสริมการท่องเที่ยวภายในประเทศ.pdf', 'PDF', 9.7, 68, 'Adobe Acrobat Pro');

INSERT INTO license_details (document_id, license_type, attribution_required, commercial_use_allowed, modification_allowed, distribution_allowed) VALUES
('DOC001', 'ลิขสิทธิ์รัฐบาล', TRUE, FALSE, FALSE, TRUE),
('DOC002', 'ครีเอทีฟคอมมอนส์', TRUE, FALSE, TRUE, TRUE),
('DOC003', 'ลิขสิทธิ์รัฐบาล', TRUE, FALSE, FALSE, TRUE),
('DOC004', 'สาธารณสมบัติ', FALSE, TRUE, TRUE, TRUE),
('DOC005', 'ลิขสิทธิ์รัฐบาล', TRUE, FALSE, FALSE, TRUE);

-- ตรวจสอบข้อมูลที่เพิ่มแล้ว
SELECT 'document_basic_info' as table_name, COUNT(*) as row_count FROM document_basic_info
UNION ALL
SELECT 'project_details', COUNT(*) FROM project_details
UNION ALL
SELECT 'file_properties', COUNT(*) FROM file_properties
UNION ALL
SELECT 'organizational_details', COUNT(*) FROM organizational_details
UNION ALL
SELECT 'contact_details', COUNT(*) FROM contact_details
UNION ALL
SELECT 'license_details', COUNT(*) FROM license_details;