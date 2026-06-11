from fastapi import APIRouter, Response
from database.db_tourist_behavior_survey import(
    covid_impact_to_xml,
    demographic_to_xml,
    destination_preferences_to_xml,
    survey_respondents_to_xml,
    travel_behavior_to_xml
)

router = APIRouter()

@router.get("/covid_impact", response_class=Response)
def get_covid_impact():
    xml_data = covid_impact_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/demographic", response_class=Response)
def get_demographic():
    xml_data = demographic_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/destination_preferences", response_class=Response)
def get_destination_preferences():
    xml_data = destination_preferences_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/survey_respondents", response_class=Response)
def get_survey_respondents():
    xml_data = survey_respondents_to_xml()
    return Response(content=xml_data, media_type="application/xml")

@router.get("/travel_behavior", response_class=Response)
def get_travel_behavior():
    xml_data = travel_behavior_to_xml()
    return Response(content=xml_data, media_type="application/xml")