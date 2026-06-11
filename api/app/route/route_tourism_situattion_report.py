from fastapi import APIRouter, Response
from database.db_tourism_situation_report import(
    contact_details_to_xml,
    document_basic_info_to_xml,
    file_properties_to_xml,
    license_details_to_xml,
    organizational_details_to_xml,
    project_details_to_xml,
)

router = APIRouter()

@router.get("/contact_details", response_class=Response)
def get_contact_details():
    xml_data = contact_details_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/document_basic_info", response_class=Response)
def get_document_basic_info():
    xml_data = document_basic_info_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/file_properties", response_class=Response)
def get_file_properties():
    xml_data = file_properties_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/license_details", response_class=Response)
def get_license_details():
    xml_data = license_details_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/organizational_details", response_class=Response)
def get_organizational_details():
    xml_data = organizational_details_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/project_details", response_class=Response)
def get_project_details():
    xml_data = project_details_to_xml()
    return Response(content=xml_data, media_type="application/xml")