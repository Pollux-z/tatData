from .connection import customer_profile_table_to_xml, get_customer_profile_xml

def contact_info_to_xml():
    return customer_profile_table_to_xml("contact_info")

def customer_consent_to_xml():
    return customer_profile_table_to_xml("customer_consent")

def interaction_history_to_xml():
    return customer_profile_table_to_xml("interaction_history")

def loyalty_program_to_xml():
    return customer_profile_table_to_xml("loyalty_program")

def personal_info_to_xml():
    return customer_profile_table_to_xml("personal_info")

def socio_economic_info_to_xml():
    return customer_profile_table_to_xml("socio_economic_info")

def travel_preferences_to_xml():
    return customer_profile_table_to_xml("travel_preferences")

def get_full_customer_profile(customer_id: str):
    return get_customer_profile_xml(customer_id)