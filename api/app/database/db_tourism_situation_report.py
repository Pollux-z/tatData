from .connection import tourist_behavior_table_to_xml

def covid_impact_to_xml():
    return tourist_behavior_table_to_xml("covid_impact")

def demographic_to_xml():
    return tourist_behavior_table_to_xml("demographic")

def destination_preferences_to_xml():
    return tourist_behavior_table_to_xml("destination_preferences")

def survey_respondents_to_xml():
    return tourist_behavior_table_to_xml("survey_respondents")

def travel_behavior_to_xml():
    return tourist_behavior_table_to_xml("travel_behavior")