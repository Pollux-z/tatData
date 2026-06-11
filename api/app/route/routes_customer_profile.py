from fastapi import APIRouter, Response
from database.db_customer_profile import (
    contact_info_to_xml,
    customer_consent_to_xml,
    interaction_history_to_xml,
    loyalty_program_to_xml,
    personal_info_to_xml,
    socio_economic_info_to_xml,
    travel_preferences_to_xml,
    get_full_customer_profile
)

router = APIRouter()

@router.get("/contact_info", response_class=Response)
def get_contact_info():
    xml_data = contact_info_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/customer_consent", response_class=Response)
def get_customer_consent():
    xml_data = customer_consent_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/interaction_history", response_class=Response)
def get_interaction_history():
    xml_data = interaction_history_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/loyalty_program", response_class=Response)
def get_loyalty_program():
    xml_data = loyalty_program_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/personal_info", response_class=Response)
def get_personal_info():
    xml_data = personal_info_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/socio_economic_info", response_class=Response)
def get_socio_economic_info():
    xml_data = socio_economic_info_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/travel_preferences", response_class=Response)
def get_travel_preferences():
    xml_data = travel_preferences_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/customer_profile/{customer_id}", response_class=Response)
def get_customer_profile(customer_id: str):
    xml_data = get_full_customer_profile(customer_id)
    return Response(content=xml_data, media_type="application/xml")