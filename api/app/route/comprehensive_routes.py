"""
5 Comprehensive API Routes สำหรับดึงข้อมูลแบบ JOIN ทุกตารางจากแต่ละฐานข้อมูล
"""

from fastapi import APIRouter, Response, HTTPException, Query
from typing import Optional
import logging
from database.comprehensive_xml_apis import (
    customer_profile_comprehensive_xml,
    product_standard_comprehensive_xml,
    tourism_route_comprehensive_xml,
    tourism_situation_report_comprehensive_xml,
    tourist_behavior_survey_comprehensive_xml
)

logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/customer-profile-comprehensive", response_class=Response)
def get_customer_profile_comprehensive(
    customer_id: Optional[str] = Query(None, description="รหัสลูกค้า (ถ้าไม่ระบุจะดึงข้อมูลทั้งหมด)")
):
    """
    **API 1: Customer Profile Comprehensive XML**
    
    ดึงข้อมูลลูกค้าแบบ comprehensive (JOIN ทุกตาราง) ในรูปแบบ XML
    
    **Parameters:**
    - **customer_id**: รหัสลูกค้า (ถ้าไม่ระบุจะดึงข้อมูลทั้งหมด)
    
    **ตารางที่ JOIN:**
    - personal_info (ข้อมูลส่วนตัว)
    - contact_info (ข้อมูลการติดต่อ)
    - socio_economic_info (ข้อมูลเศรษฐกิจสังคม)
    - travel_preferences (ความชอบการท่องเที่ยว)
    - interaction_history (ประวัติการใช้บริการ)
    - loyalty_program (โปรแกรมสมาชิก)
    - customer_consent (ความยินยอม)
    
    **Response Format:** XML
    """
    try:
        xml_data = customer_profile_comprehensive_xml(customer_id)
        return Response(content=xml_data, media_type="application/xml")
    except Exception as e:
        logger.error(f"Error in customer profile comprehensive API: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/product-standard-comprehensive", response_class=Response)
def get_product_standard_comprehensive(
    establishment_id: Optional[str] = Query(None, description="รหัสสถานประกอบการ (ถ้าไม่ระบุจะดึงข้อมูลทั้งหมด)")
):
    """
    **API 2: Product Standard Comprehensive XML**
    
    ดึงข้อมูลมาตรฐานผลิตภัณฑ์แบบ comprehensive (JOIN ทุกตาราง) ในรูปแบบ XML
    
    **Parameters:**
    - **establishment_id**: รหัสสถานประกอบการ (ถ้าไม่ระบุจะดึงข้อมูลทั้งหมด)
    
    **ตารางที่ JOIN:**
    - establishment_info (ข้อมูลสถานประกอบการ)
    - establishment_address (ที่อยู่)
    - establishment_contact (ข้อมูลการติดต่อ)
    - ownership_info (ข้อมูลความเป็นเจ้าของ)
    - coordinator_info (ข้อมูลผู้ประสานงาน)
    - star_rating (ระดับดาว)
    - award_info (รางวัลที่ได้รับ)
    - operational_info (ข้อมูลการดำเนินงาน)
    
    **Response Format:** XML
    """
    try:
        xml_data = product_standard_comprehensive_xml(establishment_id)
        return Response(content=xml_data, media_type="application/xml")
    except Exception as e:
        logger.error(f"Error in product standard comprehensive API: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/tourism-route-comprehensive", response_class=Response)
def get_tourism_route_comprehensive(
    route_code: Optional[str] = Query(None, description="รหัสเส้นทาง (ถ้าไม่ระบุจะดึงข้อมูลทั้งหมด)")
):
    """
    **API 3: Tourism Route Comprehensive XML**
    
    ดึงข้อมูลเส้นทางการท่องเที่ยวแบบ comprehensive (JOIN ทุกตาราง) ในรูปแบบ XML
    
    **Parameters:**
    - **route_code**: รหัสเส้นทาง (ถ้าไม่ระบุจะดึงข้อมูลทั้งหมด)
    
    **ตารางที่ JOIN:**
    - tourism_route_table (ข้อมูลเส้นทาง)
    - itinerary_table (กำหนดการเดินทาง)
    - schedule_table (ตารางเวลา)
    - pricing_table (ตารางราคา)
    - contact_information_table (ข้อมูลการติดต่อ)
    - owner_contact_information (ข้อมูลเจ้าของ)
    - accessibility_info (ข้อมูลการเข้าถึง)
    - sustainability_info (ข้อมูลความยั่งยืน)
    
    **Response Format:** XML
    """
    try:
        xml_data = tourism_route_comprehensive_xml(route_code)
        return Response(content=xml_data, media_type="application/xml")
    except Exception as e:
        logger.error(f"Error in tourism route comprehensive API: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/tourism-situation-report-comprehensive", response_class=Response)
def get_tourism_situation_report_comprehensive(
    document_id: Optional[str] = Query(None, description="รหัสเอกสาร (ถ้าไม่ระบุจะดึงข้อมูลทั้งหมด)")
):
    """
    **API 4: Tourism Situation Report Comprehensive XML**
    
    ดึงข้อมูลรายงานสถานการณ์การท่องเที่ยวแบบ comprehensive (JOIN ทุกตาราง) ในรูปแบบ XML
    
    **Parameters:**
    - **document_id**: รหัสเอกสาร (ถ้าไม่ระบุจะดึงข้อมูลทั้งหมด)
    
    **ตารางที่ JOIN:**
    - document_basic_info (ข้อมูลพื้นฐานเอกสาร)
    - project_details (รายละเอียดโครงการ)
    - file_properties (คุณสมบัติไฟล์)
    - organizational_details (รายละเอียดองค์กร)
    - contact_details (ข้อมูลการติดต่อ)
    - license_details (รายละเอียดลิขสิทธิ์)
    
    **Response Format:** XML
    """
    try:
        xml_data = tourism_situation_report_comprehensive_xml(document_id)
        return Response(content=xml_data, media_type="application/xml")
    except Exception as e:
        logger.error(f"Error in tourism situation report comprehensive API: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.get("/tourist-behavior-survey-comprehensive", response_class=Response)
def get_tourist_behavior_survey_comprehensive(
    respondent_id: Optional[str] = Query(None, description="รหัสผู้ตอบแบบสำรวจ (ถ้าไม่ระบุจะดึงข้อมูลทั้งหมด)")
):
    """
    **API 5: Tourist Behavior Survey Comprehensive XML**
    
    ดึงข้อมูลแบบสำรวจพฤติกรรมนักท่องเที่ยวแบบ comprehensive (JOIN ทุกตาราง) ในรูปแบบ XML
    
    **Parameters:**
    - **respondent_id**: รหัสผู้ตอบแบบสำรวจ (ถ้าไม่ระบุจะดึงข้อมูลทั้งหมด)
    
    **ตารางที่ JOIN:**
    - survey_respondents (ข้อมูลผู้ตอบแบบสำรวจ)
    - demographic (ข้อมูลประชากรศาสตร์)
    - travel_behavior (พฤติกรรมการท่องเที่ยว)
    - destination_preferences (ความชอบจุดหมายปลายทาง)
    - covid_impact (ผลกระทบจาก COVID-19)
    - digital_behavior (พฤติกรรมดิจิทัล)
    - satisfaction_ratings (คะแนนความพึงพอใจ)
    
    **Response Format:** XML
    """
    try:
        xml_data = tourist_behavior_survey_comprehensive_xml(respondent_id)
        return Response(content=xml_data, media_type="application/xml")
    except Exception as e:
        logger.error(f"Error in tourist behavior survey comprehensive API: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# Summary endpoint สำหรับแสดงรายการ API ทั้งหมด
@router.get("/")
def comprehensive_apis_summary():
    """
    **สรุป Comprehensive APIs ทั้ง 5 อัน**
    
    รายการ API สำหรับดึงข้อมูลแบบ JOIN ทุกตารางจากแต่ละฐานข้อมูล
    """
    return {
        "title": "5 Comprehensive Database XML APIs",
        "description": "APIs สำหรับดึงข้อมูลแบบ JOIN ทุกตารางจากแต่ละฐานข้อมูลในรูปแบบ XML",
        "apis": {
            "1": {
                "endpoint": "/customer-profile-comprehensive",
                "database": "customer_profile",
                "description": "ข้อมูลลูกค้าแบบครบถ้วน (7 ตาราง)",
                "example": "/customer-profile-comprehensive?customer_id=C001",
                "tables_joined": 7
            },
            "2": {
                "endpoint": "/product-standard-comprehensive", 
                "database": "product_standard",
                "description": "ข้อมูลมาตรฐานผลิตภัณฑ์แบบครบถ้วน (8 ตาราง)",
                "example": "/product-standard-comprehensive?establishment_id=EST001",
                "tables_joined": 8
            },
            "3": {
                "endpoint": "/tourism-route-comprehensive",
                "database": "tourism_route", 
                "description": "ข้อมูลเส้นทางการท่องเที่ยวแบบครบถ้วน (8 ตาราง)",
                "example": "/tourism-route-comprehensive?route_code=RT001",
                "tables_joined": 8
            },
            "4": {
                "endpoint": "/tourism-situation-report-comprehensive",
                "database": "tourism_situation_report",
                "description": "ข้อมูลรายงานสถานการณ์แบบครบถ้วน (6 ตาราง)",
                "example": "/tourism-situation-report-comprehensive?document_id=DOC001",
                "tables_joined": 6
            },
            "5": {
                "endpoint": "/tourist-behavior-survey-comprehensive",
                "database": "tourist_behavior_survey",
                "description": "ข้อมูลแบบสำรวจพฤติกรรมนักท่องเที่ยวแบบครบถ้วน (7 ตาราง)",
                "example": "/tourist-behavior-survey-comprehensive?respondent_id=S001",
                "tables_joined": 7
            }
        },
        "features": {
            "join_all_tables": "JOIN ข้อมูลจากทุกตารางในแต่ละฐานข้อมูล",
            "xml_output": "ผลลัพธ์ในรูปแบบ XML",
            "optional_filtering": "สามารถกรองข้อมูลด้วย ID หรือดึงทั้งหมด",
            "namespace_support": "รองรับ XML Namespace",
            "error_handling": "จัดการ Error อย่างสมบูรณ์"
        },
        "total_databases": 5,
        "total_tables": 36,
        "supported_formats": ["XML"],
        "documentation": "/docs"
    }