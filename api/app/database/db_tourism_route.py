from .connection import tourism_route_table_to_xml

def accessibility_info_to_xml():
    return tourism_route_table_to_xml("accessibility_info")

def contact_information_table_to_xml():
    return tourism_route_table_to_xml("contact_information_table")

def itinerary_table_to_xml():
    return tourism_route_table_to_xml("itinerary_table")

def owner_contact_information_to_xml():
    return tourism_route_table_to_xml("owner_contact_information")

def pricing_table_to_xml():
    return tourism_route_table_to_xml("pricing_table")

def schedule_table_to_xml():
    return tourism_route_table_to_xml("schedule_table")

def sustainability_info_to_xml():
    return tourism_route_table_to_xml("sustainability_info")

def tourism_route_table_to_xml():
    return tourism_route_table_to_xml("tourism_route_table")