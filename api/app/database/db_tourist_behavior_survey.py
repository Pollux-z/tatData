# database/db_tourist_behavior_survey.py
from .connection import table_to_xml

def covid_impact_to_xml():
    """ดึงข้อมูล covid_impact ทั้งหมดในรูปแบบ XML"""
    return table_to_xml("covid_impact")

def demographic_to_xml():
    """ดึงข้อมูล demographic ทั้งหมดในรูปแบบ XML"""
    return table_to_xml("demographic")

def destination_preferences_to_xml():
    """ดึงข้อมูล destination_preferences ทั้งหมดในรูปแบบ XML"""
    return table_to_xml("destination_preferences")

def survey_respondents_to_xml():
    """ดึงข้อมูล survey_respondents ทั้งหมดในรูปแบบ XML"""
    return table_to_xml("survey_respondents")

def travel_behavior_to_xml():
    """ดึงข้อมูล travel_behavior ทั้งหมดในรูปแบบ XML"""
    return table_to_xml("travel_behavior")