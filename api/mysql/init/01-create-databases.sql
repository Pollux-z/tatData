-- ============================================
-- สร้าง Multiple Databases สำหรับ Tourism System
-- แก้ไขปัญหาภาษาไทย - ใช้ utf8mb4_unicode_ci
-- ============================================

-- ตั้งค่า character set และ collation
SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_database = utf8mb4;
SET character_set_results = utf8mb4;
SET character_set_server = utf8mb4;
SET collation_connection = utf8mb4_unicode_ci;
SET collation_database = utf8mb4_unicode_ci;
SET collation_server = utf8mb4_unicode_ci;

-- สร้าง databases ทั้งหมด
DROP DATABASE IF EXISTS fastapi_db;
DROP DATABASE IF EXISTS customer_profile;
DROP DATABASE IF EXISTS product_standard;
DROP DATABASE IF EXISTS tourism_route;
DROP DATABASE IF EXISTS tourism_situation_report;
DROP DATABASE IF EXISTS tourist_behavior_survey;

CREATE DATABASE fastapi_db 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

CREATE DATABASE customer_profile 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

CREATE DATABASE product_standard 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

CREATE DATABASE tourism_route 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

CREATE DATABASE tourism_situation_report 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

CREATE DATABASE tourist_behavior_survey 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

-- ลบ users เก่า (ถ้ามี)
DROP USER IF EXISTS 'admin'@'%';
DROP USER IF EXISTS 'app_user'@'%';
DROP USER IF EXISTS 'readonly'@'%';

-- สร้าง users ใหม่
CREATE USER 'admin'@'%' IDENTIFIED BY 'password';
CREATE USER 'app_user'@'%' IDENTIFIED BY 'app_password';
CREATE USER 'readonly'@'%' IDENTIFIED BY 'readonly_password';

-- Grant permissions for admin user (all databases)
GRANT ALL PRIVILEGES ON fastapi_db.* TO 'admin'@'%';
GRANT ALL PRIVILEGES ON customer_profile.* TO 'admin'@'%';
GRANT ALL PRIVILEGES ON product_standard.* TO 'admin'@'%';
GRANT ALL PRIVILEGES ON tourism_route.* TO 'admin'@'%';
GRANT ALL PRIVILEGES ON tourism_situation_report.* TO 'admin'@'%';
GRANT ALL PRIVILEGES ON tourist_behavior_survey.* TO 'admin'@'%';

-- Grant permissions for app_user
GRANT SELECT, INSERT, UPDATE, DELETE ON fastapi_db.* TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON customer_profile.* TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON product_standard.* TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON tourism_route.* TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON tourism_situation_report.* TO 'app_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON tourist_behavior_survey.* TO 'app_user'@'%';

-- Grant read-only permissions
GRANT SELECT ON fastapi_db.* TO 'readonly'@'%';
GRANT SELECT ON customer_profile.* TO 'readonly'@'%';
GRANT SELECT ON product_standard.* TO 'readonly'@'%';
GRANT SELECT ON tourism_route.* TO 'readonly'@'%';
GRANT SELECT ON tourism_situation_report.* TO 'readonly'@'%';
GRANT SELECT ON tourist_behavior_survey.* TO 'readonly'@'%';

-- Flush privileges
FLUSH PRIVILEGES;

-- แสดงรายการ databases ที่สร้างแล้ว
SHOW DATABASES;

-- ตรวจสอบ character set
SELECT 
    SCHEMA_NAME as 'Database Name',
    DEFAULT_CHARACTER_SET_NAME as 'Character Set',
    DEFAULT_COLLATION_NAME as 'Collation'
FROM information_schema.SCHEMATA 
WHERE SCHEMA_NAME IN ('fastapi_db', 'customer_profile', 'product_standard', 'tourism_route', 'tourism_situation_report', 'tourist_behavior_survey');