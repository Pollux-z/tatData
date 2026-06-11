from fastapi import APIRouter, Response
from database.db_tourism_route import (
    accessibility_info_to_xml,
    contact_information_table_to_xml,
    itinerary_table_to_xml,
    owner_contact_information_to_xml,
    pricing_table_to_xml,
    schedule_table_to_xml,
    sustainability_info_to_xml,
    tourism_route_table_to_xml
)

router = APIRouter()

@router.get("/accessibility_info", response_class=Response)
def get_accessibility_info():
    xml_data = accessibility_info_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/contact_information_table", response_class=Response)
def get_contact_information():
    xml_data = contact_information_table_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/itinerary_table", response_class=Response)
def get_itinerary():
    xml_data = itinerary_table_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/owner_contact_information", response_class=Response)
def get_owner_contact():
    xml_data = owner_contact_information_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/pricing_table", response_class=Response)
def get_pricing():
    xml_data = pricing_table_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/schedule_table", response_class=Response)
def get_schedule():
    xml_data = schedule_table_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/sustainability_info", response_class=Response)
def get_sustainability_info():
    xml_data = sustainability_info_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/tourism_route_table", response_class=Response)
def get_tourism_route():
    xml_data = tourism_route_table_to_xml()
    return Response(content=xml_data, media_type="application/xml")
