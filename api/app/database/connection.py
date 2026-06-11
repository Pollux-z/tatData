# database/connection.py - การเชื่อมต่อหลายฐานข้อมูล

from sqlalchemy import create_engine, text
import xml.etree.ElementTree as ET
import os
import logging
from typing import Dict

# ตั้งค่า logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ข้อมูลการเชื่อมต่อจาก environment variables
DB_HOST = os.getenv("DB_HOST", "mysql")
DB_PORT = int(os.getenv("DB_PORT", "3306"))
DB_USER = os.getenv("DB_USER", "admin")
DB_PASSWORD = os.getenv("DB_PASSWORD", "password")

# ชื่อฐานข้อมูลต่างๆ
DATABASES = {
    'main': os.getenv("DATABASE_URL", "mysql+pymysql://admin:password@mysql:3306/fastapi_db"),
    'customer_profile': f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/customer_profile",
    'product_standard': f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/product_standard", 
    'tourism_route': f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/tourism_route",
    'tourism_situation': f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/tourism_situation_report",
    'tourist_behavior': f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/tourist_behavior_survey"
}

# สร้าง engines สำหรับแต่ละฐานข้อมูล
engines: Dict[str, object] = {}

def create_engines():
    """สร้าง database engines ทั้งหมด"""
    global engines
    
    for db_name, db_url in DATABASES.items():
        try:
            engines[db_name] = create_engine(
                db_url,
                pool_size=5,
                max_overflow=10,
                pool_timeout=30,
                pool_recycle=3600,
                pool_pre_ping=True,
                echo=False
            )
            logger.info(f"Created engine for {db_name} database")
        except Exception as e:
            logger.error(f"Failed to create engine for {db_name}: {e}")

# สร้าง engines เมื่อ import module
create_engines()

def get_engine(database_name: str):
    """ดึง engine สำหรับฐานข้อมูลที่ระบุ"""
    if database_name not in engines:
        raise ValueError(f"Database '{database_name}' not found. Available: {list(engines.keys())}")
    return engines[database_name]

def table_to_xml(table_name: str, database_name: str = 'main', limit: int = 1000):
    """แปลงข้อมูลจากตารางเป็น XML แบบปลอดภัย"""
    try:
        engine = get_engine(database_name)
        
        with engine.connect() as connection:
            # ตรวจสอบว่าตารางมีอยู่หรือไม่
            check_table = connection.execute(text(f"SHOW TABLES LIKE '{table_name}'"))
            if not check_table.fetchone():
                logger.warning(f"Table '{table_name}' does not exist in database '{database_name}'")
                root = ET.Element("error")
                message = ET.SubElement(root, "message")
                message.text = f"Table '{table_name}' does not exist in database '{database_name}'"
                return ET.tostring(root, encoding="utf-8")
            
            # ดึงข้อมูลจากตาราง
            result = connection.execute(text(f"SELECT * FROM {table_name} LIMIT {limit}"))
            rows = result.fetchall()
            columns = result.keys()

            # สร้าง XML
            root = ET.Element(table_name)
            for row in rows:
                record = ET.SubElement(root, "record")
                for col in columns:
                    child = ET.SubElement(record, col)
                    val = row._mapping[col]
                    child.text = str(val) if val is not None else ""
            
            logger.info(f"Generated XML for table '{table_name}' in '{database_name}' with {len(rows)} records")
            return ET.tostring(root, encoding="utf-8")
            
    except Exception as e:
        logger.error(f"Error generating XML for table '{table_name}' in '{database_name}': {e}")
        # Return error XML
        error_root = ET.Element("error")
        error_msg = ET.SubElement(error_root, "message")
        error_msg.text = f"Error accessing table '{table_name}' in '{database_name}': {str(e)}"
        return ET.tostring(error_root, encoding="utf-8")

def get_customer_profile_xml(customer_id: str):
    """ดึงข้อมูลลูกค้าครบชุดตาม customer_id"""
    try:
        engine = get_engine('customer_profile')
        
        with engine.connect() as connection:
            # ตรวจสอบตารางที่มีอยู่
            tables_result = connection.execute(text("SHOW TABLES"))
            existing_tables = [row[0] for row in tables_result.fetchall()]
            
            # รายการตารางที่ต้องการสำหรับ customer profile
            customer_tables = [
                "personal_info",
                "contact_info", 
                "socio_economic_info",
                "travel_preferences",
                "interaction_history",
                "loyalty_program",
                "customer_consent"
            ]
            
            # เฉพาะตารางที่มีอยู่จริง
            available_tables = [table for table in customer_tables if table in existing_tables]
            
            # สร้าง XML root
            root = ET.Element("customer_profile")
            cust_id = ET.SubElement(root, "customer_id")
            cust_id.text = customer_id

            # ดึงข้อมูลจากแต่ละตาราง
            for table in available_tables:
                try:
                    result = connection.execute(
                        text(f"SELECT * FROM {table} WHERE customer_id = :cid"),
                        {"cid": customer_id}
                    )
                    row = result.fetchone()
                    if row:
                        sub_elem = ET.SubElement(root, table)
                        for col, val in row._mapping.items():
                            if col != "customer_id":  # ไม่ต้องซ้ำ customer_id
                                child = ET.SubElement(sub_elem, col)
                                child.text = str(val) if val is not None else ""
                except Exception as table_error:
                    logger.warning(f"Error accessing table {table}: {table_error}")
                    error_elem = ET.SubElement(root, f"{table}_error")
                    error_elem.text = str(table_error)

            logger.info(f"Generated customer profile XML for customer_id: {customer_id}")
            return ET.tostring(root, encoding="utf-8")
            
    except Exception as e:
        logger.error(f"Error getting customer profile for {customer_id}: {e}")
        error_root = ET.Element("error")
        error_msg = ET.SubElement(error_root, "message")
        error_msg.text = f"Error getting customer profile: {str(e)}"
        return ET.tostring(error_root, encoding="utf-8")

def check_table_exists(table_name: str, database_name: str = 'main') -> bool:
    """ตรวจสอบว่าตารางมีอยู่หรือไม่"""
    try:
        engine = get_engine(database_name)
        with engine.connect() as connection:
            result = connection.execute(text(f"SHOW TABLES LIKE '{table_name}'"))
            return result.fetchone() is not None
    except Exception as e:
        logger.error(f"Error checking table existence in {database_name}: {e}")
        return False

def get_available_tables(database_name: str = 'main') -> list:
    """ดึงรายการตารางทั้งหมดที่มีอยู่ในฐานข้อมูลที่ระบุ"""
    try:
        engine = get_engine(database_name)
        with engine.connect() as connection:
            result = connection.execute(text("SHOW TABLES"))
            return [row[0] for row in result.fetchall()]
    except Exception as e:
        logger.error(f"Error getting available tables from {database_name}: {e}")
        return []

def get_all_databases_tables() -> dict:
    """ดึงรายการตารางจากทุกฐานข้อมูล"""
    all_tables = {}
    for db_name in engines.keys():
        try:
            tables = get_available_tables(db_name)
            all_tables[db_name] = tables
            logger.info(f"Database '{db_name}': {len(tables)} tables")
        except Exception as e:
            logger.error(f"Error getting tables from {db_name}: {e}")
            all_tables[db_name] = []
    return all_tables

def test_all_connections() -> dict:
    """ทดสอบการเชื่อมต่อฐานข้อมูลทั้งหมด"""
    results = {}
    for db_name, engine in engines.items():
        try:
            with engine.connect() as connection:
                connection.execute(text("SELECT 1"))
            results[db_name] = {"status": "connected", "error": None}
            logger.info(f"Database '{db_name}' connection successful")
        except Exception as e:
            results[db_name] = {"status": "failed", "error": str(e)}
            logger.error(f"Database '{db_name}' connection failed: {e}")
    return results

# ฟังก์ชันเฉพาะสำหรับแต่ละฐานข้อมูล
def customer_profile_table_to_xml(table_name: str, limit: int = 1000):
    """ดึงข้อมูลจาก customer_profile database"""
    return table_to_xml(table_name, 'customer_profile', limit)

def product_standard_table_to_xml(table_name: str, limit: int = 1000):
    """ดึงข้อมูลจาก product_standard database"""
    return table_to_xml(table_name, 'product_standard', limit)

def tourism_route_table_to_xml(table_name: str, limit: int = 1000):
    """ดึงข้อมูลจาก tourism_route database"""
    return table_to_xml(table_name, 'tourism_route', limit)

def tourism_situation_table_to_xml(table_name: str, limit: int = 1000):
    """ดึงข้อมูลจาก tourism_situation database"""
    return table_to_xml(table_name, 'tourism_situation', limit)

def tourist_behavior_table_to_xml(table_name: str, limit: int = 1000):
    """ดึงข้อมูลจาก tourist_behavior database"""
    return table_to_xml(table_name, 'tourist_behavior', limit)

# Database mapping สำหรับ auto-detect
DATABASE_MAPPING = {
    # Customer Profile tables
    'personal_info': 'customer_profile',
    'contact_info': 'customer_profile', 
    'socio_economic_info': 'customer_profile',
    'travel_preferences': 'customer_profile',
    'interaction_history': 'customer_profile',
    'loyalty_program': 'customer_profile',
    'customer_consent': 'customer_profile',
    
    # Product Standard tables
    'establishment_info': 'product_standard',
    'establishment_address': 'product_standard',
    'establishment_contact': 'product_standard',
    'ownership_info': 'product_standard',
    'coordinator_info': 'product_standard',
    'star_rating': 'product_standard',
    'award_info': 'product_standard',
    'operational_info': 'product_standard',
    
    # Tourism Route tables
    'tourism_route_table': 'tourism_route',
    'itinerary_table': 'tourism_route',
    'schedule_table': 'tourism_route',
    'pricing_table': 'tourism_route',
    'contact_information_table': 'tourism_route',
    'owner_contact_information': 'tourism_route',
    'accessibility_info': 'tourism_route',
    'sustainability_info': 'tourism_route',
    
    # Tourism Situation Report tables
    'document_basic_info': 'tourism_situation',
    'project_details': 'tourism_situation',
    'file_properties': 'tourism_situation',
    'organizational_details': 'tourism_situation',
    'contact_details': 'tourism_situation',
    'license_details': 'tourism_situation',
    
    # Tourist Behavior Survey tables
    'survey_respondents': 'tourist_behavior',
    'demographic': 'tourist_behavior',
    'travel_behavior': 'tourist_behavior',
    'destination_preferences': 'tourist_behavior',
    'covid_impact': 'tourist_behavior'
}

def auto_detect_database(table_name: str) -> str:
    """อัตโนมัติตรวจหาฐานข้อมูลที่ถูกต้องสำหรับตาราง"""
    return DATABASE_MAPPING.get(table_name, 'main')

def smart_table_to_xml(table_name: str, limit: int = 1000):
    """ดึงข้อมูลจากตารางโดยตรวจหาฐานข้อมูลอัตโนมัติ"""
    database_name = auto_detect_database(table_name)
    return table_to_xml(table_name, database_name, limit)