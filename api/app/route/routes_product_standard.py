from fastapi import APIRouter, Response
from database.db_product_standard import (
    award_info_to_xml,
    coordinator_info_to_xml,
    establishment_address_to_xml,
    establishment_contact_to_xml,
    establishment_info_to_xml,
    operational_info_to_xml,
    ownership_info_to_xml,
    star_rating_to_xml,
)

router = APIRouter()

@router.get("/award_info", response_class=Response)
def get_award_info():
    xml_data = award_info_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/coordinator_info", response_class=Response)
def get_coordinator_info():
    xml_data = coordinator_info_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/establishment_address", response_class=Response)
def get_establishment_address():
    xml_data = establishment_address_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/establishment_contact", response_class=Response)
def get_establishment_contact():
    xml_data = establishment_contact_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/establishment_info", response_class=Response)
def get_establishment_info():
    xml_data = establishment_info_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/operational_info", response_class=Response)
def get_operational_info():
    xml_data = operational_info_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/ownership_info", response_class=Response)
def get_ownership_info():
    xml_data = ownership_info_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/star_rating", response_class=Response)
def get_star_rating():
    xml_data = star_rating_to_xml()
    return Response(content=xml_data, media_type="application/xml")