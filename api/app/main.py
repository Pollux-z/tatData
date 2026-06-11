from fastapi import FastAPI, HTTPException
from typing import Dict, Any
import os
import sys
import logging
from datetime import datetime

# Add current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import database connection utilities
try:
    from database.connection import (
        engines, 
        get_engine, 
        get_all_databases_tables, 
        test_all_connections
    )
    DATABASE_CONNECTION_AVAILABLE = True
except ImportError as e:
    DATABASE_CONNECTION_AVAILABLE = False
    logging.error(f"Database connection module not found: {e}")
    engines = {}

# Import comprehensive routes
try:
    from route.comprehensive_routes import router as comprehensive_router
    COMPREHENSIVE_ROUTES_AVAILABLE = True
    logging.info("Comprehensive routes loaded successfully")
except ImportError as e:
    COMPREHENSIVE_ROUTES_AVAILABLE = False
    logging.error(f"Comprehensive routes not found: {e}")
    
    # Create dummy router to prevent errors
    from fastapi import APIRouter
    comprehensive_router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Tourism Comprehensive XML API System",
    description="""
    **Tourism Data Management System - Comprehensive XML APIs**
    
    ระบบ API สำหรับดึงข้อมูลการท่องเที่ยวแบบครบถ้วนจาก 5 ฐานข้อมูล
    
    ## ฐานข้อมูลที่รองรับ
    1. **Customer Profile** - ข้อมูลลูกค้า (7 ตาราง)
    2. **Product Standard** - มาตรฐานผลิตภัณฑ์ (8 ตาราง)  
    3. **Tourism Route** - เส้นทางการท่องเที่ยว (8 ตาราง)
    4. **Tourism Situation Report** - รายงานสถานการณ์ (6 ตาราง)
    5. **Tourist Behavior Survey** - แบบสำรวจพฤติกรรม (7 ตาราง)
    """,
    version="2.0.0",
    contact={
        "name": "Tourism API Support",
        "email": "support@tourism-thailand.org"
    },
    license_info={
        "name": "MIT License",
        "url": "https://opensource.org/licenses/MIT"
    }
)

# Include comprehensive router
if COMPREHENSIVE_ROUTES_AVAILABLE:
    app.include_router(
        comprehensive_router, 
        prefix="/api/comprehensive", 
        tags=["Comprehensive XML APIs"]
    )
    logger.info("Comprehensive XML API routes loaded successfully")

# Global variables for database info
all_databases_info = {}

@app.on_event("startup")
async def startup_event():
    """เริ่มต้นแอปและตรวจสอบการเชื่อมต่อฐานข้อมูล"""
    global all_databases_info
    
    logger.info("Starting Tourism Comprehensive XML API System...")
    
    if not DATABASE_CONNECTION_AVAILABLE:
        logger.error("Database connection module not available. Running in limited mode.")
        return
    
    # Test all database connections
    connection_results = test_all_connections()
    for db_name, result in connection_results.items():
        if result['status'] == 'connected':
            logger.info(f"Database '{db_name}' connected successfully")
        else:
            logger.error(f"Database '{db_name}' connection failed: {result['error']}")
    
    # Get database info
    all_databases_info = get_all_databases_tables()
    
    logger.info("🎉 Tourism Comprehensive XML API System is ready!")

# ========== ROOT & INFO ENDPOINTS ==========

@app.get("/")
async def root():
    """
    **Tourism Comprehensive XML API System**
    
    ระบบ API สำหรับดึงข้อมูลการท่องเที่ยวแบบ comprehensive จาก 5 ฐานข้อมูล
    """
    
    # Count tables by database
    database_summary = {}
    total_tables = 0
    
    for db_name, tables in all_databases_info.items():
        table_count = len(tables)
        total_tables += table_count
        database_summary[db_name] = {
            "table_count": table_count,
            "tables": tables[:3] + ["..."] if len(tables) > 3 else tables,  # แสดงแค่ 3 ตารางแรก
            "status": "Connected" if db_name in engines else "Disconnected"
        }
    
    # Test connection status
    connection_results = test_all_connections() if DATABASE_CONNECTION_AVAILABLE else {}
    connected_dbs = sum(1 for result in connection_results.values() if result.get('status') == 'connected')
    
    return {
        "system_name": "Tourism Comprehensive XML API System",
        "description": "ระบบ API สำหรับดึงข้อมูลการท่องเที่ยวแบบครบถ้วนจาก 5 ฐานข้อมูล",
        "main_features": {
            "comprehensive_apis": "5 APIs ที่ JOIN ทุกตารางในแต่ละฐานข้อมูล",
            "xml_output": "ผลลัพธ์ในรูปแบบ XML มาตรฐาน",
            "utf8_support": "รองรับภาษาไทยเต็มรูปแบบ",
            "optional_filtering": "สามารถกรองข้อมูลด้วย ID หรือดึงทั้งหมด"
        },
        "databases": {
            "total_databases": len(all_databases_info),
            "connected_databases": connected_dbs,
            "total_tables": total_tables,
            "database_details": database_summary
        },
        "comprehensive_apis": {
            "total_apis": 5,
            "base_url": "/api/comprehensive/",
            "apis": {
                "1": {
                    "name": "Customer Profile Comprehensive",
                    "endpoint": "/api/comprehensive/customer-profile-comprehensive",
                    "database": "customer_profile",
                    "tables_joined": 7,
                    "description": "ข้อมูลลูกค้าแบบครบถ้วน",
                    "example": "/api/comprehensive/customer-profile-comprehensive?customer_id=C001"
                },
                "2": {
                    "name": "Product Standard Comprehensive", 
                    "endpoint": "/api/comprehensive/product-standard-comprehensive",
                    "database": "product_standard",
                    "tables_joined": 8,
                    "description": "ข้อมูลมาตรฐานผลิตภัณฑ์แบบครบถ้วน",
                    "example": "/api/comprehensive/product-standard-comprehensive?establishment_id=EST001"
                },
                "3": {
                    "name": "Tourism Route Comprehensive",
                    "endpoint": "/api/comprehensive/tourism-route-comprehensive",
                    "database": "tourism_route",
                    "tables_joined": 8,
                    "description": "ข้อมูลเส้นทางการท่องเที่ยวแบบครบถ้วน",
                    "example": "/api/comprehensive/tourism-route-comprehensive?route_code=RT001"
                },
                "4": {
                    "name": "Tourism Situation Report Comprehensive",
                    "endpoint": "/api/comprehensive/tourism-situation-report-comprehensive",
                    "database": "tourism_situation_report",
                    "tables_joined": 6,
                    "description": "ข้อมูลรายงานสถานการณ์แบบครบถ้วน",
                    "example": "/api/comprehensive/tourism-situation-report-comprehensive?document_id=DOC001"
                },
                "5": {
                    "name": "Tourist Behavior Survey Comprehensive",
                    "endpoint": "/api/comprehensive/tourist-behavior-survey-comprehensive",
                    "database": "tourist_behavior_survey",
                    "tables_joined": 7,
                    "description": "ข้อมูลแบบสำรวจพฤติกรรมนักท่องเที่ยวแบบครบถ้วน",
                    "example": "/api/comprehensive/tourist-behavior-survey-comprehensive?respondent_id=S001"
                }
            }
        },
        "quick_start": {
            "api_documentation": "/docs",
            "api_summary": "/api/comprehensive/",
            "test_all_apis": [
                "GET /api/comprehensive/customer-profile-comprehensive",
                "GET /api/comprehensive/product-standard-comprehensive", 
                "GET /api/comprehensive/tourism-route-comprehensive",
                "GET /api/comprehensive/tourism-situation-report-comprehensive",
                "GET /api/comprehensive/tourist-behavior-survey-comprehensive"
            ]
        },
        "documentation": {
            "swagger_ui": "/docs",
            "redoc": "/redoc",
            "openapi_json": "/openapi.json"
        },
        "system_status": {
            "status": "Operational" if connected_dbs > 0 else "Database Issues",
            "comprehensive_apis_loaded": COMPREHENSIVE_ROUTES_AVAILABLE,
            "database_connection": DATABASE_CONNECTION_AVAILABLE,
            "timestamp": datetime.now().isoformat()
        }
    }

@app.get("/status")
async def system_status():
    """
    **System Status**
    
    ตรวจสอบสถานะระบบและการเชื่อมต่อฐานข้อมูล
    """
    if not DATABASE_CONNECTION_AVAILABLE:
        return {
            "status": "Limited Mode",
            "message": "Database connection module not available",
            "comprehensive_apis": COMPREHENSIVE_ROUTES_AVAILABLE
        }
    
    connection_results = test_all_connections()
    
    database_status = {}
    connected_count = 0
    
    for db_name, result in connection_results.items():
        table_count = len(all_databases_info.get(db_name, []))
        
        database_status[db_name] = {
            "status": "Connected" if result['status'] == 'connected' else "Failed",
            "table_count": table_count,
            "tables": all_databases_info.get(db_name, [])
        }
        
        if result['status'] == 'connected':
            connected_count += 1
        
        if result.get('error'):
            database_status[db_name]["error"] = result['error']
    
    overall_status = "Healthy" if connected_count == len(connection_results) else "Partial" if connected_count > 0 else "Critical"
    
    return {
        "system_status": overall_status,
        "database_summary": {
            "total_databases": len(connection_results),
            "connected_databases": connected_count,
            "failed_databases": len(connection_results) - connected_count
        },
        "database_details": database_status,
        "comprehensive_apis": {
            "status": "Available" if COMPREHENSIVE_ROUTES_AVAILABLE else "Unavailable",
            "total_apis": 5 if COMPREHENSIVE_ROUTES_AVAILABLE else 0
        },
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health_check():
    """
    **Health Check**
    
    Simple health check endpoint
    """
    connection_results = test_all_connections() if DATABASE_CONNECTION_AVAILABLE else {}
    
    healthy_dbs = sum(1 for result in connection_results.values() if result.get('status') == 'connected')
    total_dbs = len(connection_results)
    
    if total_dbs == 0:
        status = "No Database Connection"
    elif healthy_dbs == total_dbs:
        status = "Healthy"
    elif healthy_dbs > 0:
        status = "Partial"
    else:
        status = "Unhealthy"
    
    return {
        "status": status,
        "databases": f"{healthy_dbs}/{total_dbs}",
        "comprehensive_apis": "Available" if COMPREHENSIVE_ROUTES_AVAILABLE else "Unavailable",
        "timestamp": datetime.now().isoformat()
    }

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return {
        "error": "Endpoint Not Found",
        "message": "กรุณาใช้ Comprehensive APIs ที่ /api/comprehensive/",
        "available_endpoints": {
            "api_documentation": "/docs",
            "system_status": "/status", 
            "health_check": "/health",
            "comprehensive_apis": "/api/comprehensive/"
        }
    }

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return {
        "error": "Internal Server Error",
        "message": "เกิดข้อผิดพลาดภายในระบบ",
        "suggestion": "กรุณาตรวจสอบ /status หรือติดต่อผู้ดูแลระบบ"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)