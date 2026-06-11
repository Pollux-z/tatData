from .connection import product_standard_table_to_xml

def award_info_to_xml():
    return product_standard_table_to_xml("award_info")

def coordinator_info_to_xml():
    return product_standard_table_to_xml("coordinator_info")

def establishment_address_to_xml():
    return product_standard_table_to_xml("establishment_address")

def establishment_contact_to_xml():
    return product_standard_table_to_xml("establishment_contact")

def establishment_info_to_xml():
    return product_standard_table_to_xml("establishment_info")

def operational_info_to_xml():
    return product_standard_table_to_xml("operational_info")

def ownership_info_to_xml():
    return product_standard_table_to_xml("ownership_info")

def star_rating_to_xml():
    return product_standard_table_to_xml("star_rating")