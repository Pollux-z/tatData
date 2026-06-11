"""
Comprehensive XML APIs สำหรับดึงข้อมูลจากแต่ละฐานข้อมูลแบบ JOIN ทุกตาราง
"""

from sqlalchemy import text
import xml.etree.ElementTree as ET
from typing import Optional
import logging
from .connection import get_engine

logger = logging.getLogger(__name__)

def safe_text(value) -> str:
    """แปลงค่าให้เป็น string อย่างปลอดภัย"""
    if value is None:
        return ""
    return str(value)

def customer_profile_comprehensive_xml(customer_id: Optional[str] = None) -> bytes:
    """
    สร้าง XML comprehensive สำหรับ customer_profile
    JOIN ข้อมูลจากทุกตาราง
    """
    try:
        engine = get_engine('customer_profile')
        
        query = """
        SELECT 
            p.customer_id,
            p.prefix, p.first_name, p.last_name, p.date_of_birth, p.nationality, 
            p.gender, p.marital_status,
            
            c.email, c.mobile_phone, c.home_phone, c.house_number, c.alley, 
            c.road, c.subdistrict, c.district, c.province, c.postal_code,
            
            s.education, s.occupation, s.monthly_income, s.industry_type,
            
            t.preferred_destination_type, t.preferred_travel_style, 
            t.accommodation_preference, t.budget_range, t.travel_companion_type,
            
            i.last_visit_date, i.total_visits, i.favorite_destinations, i.booking_channels,
            
            l.membership_level, l.member_since, l.total_points, l.last_activity_date,
            
            con.preferred_language, con.communication_channels, con.newsletter_subscription,
            con.promotion_consent, con.data_usage_consent
            
        FROM personal_info p
        LEFT JOIN contact_info c ON p.customer_id = c.customer_id
        LEFT JOIN socio_economic_info s ON p.customer_id = s.customer_id  
        LEFT JOIN travel_preferences t ON p.customer_id = t.customer_id
        LEFT JOIN interaction_history i ON p.customer_id = i.customer_id
        LEFT JOIN loyalty_program l ON p.customer_id = l.customer_id
        LEFT JOIN customer_consent con ON p.customer_id = con.customer_id
        """
        
        if customer_id:
            query += " WHERE p.customer_id = :customer_id"
        
        query += " ORDER BY p.customer_id"
        
        with engine.connect() as connection:
            if customer_id:
                result = connection.execute(text(query), {"customer_id": customer_id})
            else:
                result = connection.execute(text(query))
            
            rows = result.fetchall()
            
            # สร้าง XML Root
            root = ET.Element("CustomerProfileComprehensive")
            root.set("xmlns", "http://www.tourism-thailand.org/customer-profile")
            root.set("xmlns:xs", "http://www.w3.org/2001/XMLSchema")
            
            for row in rows:
                customer_elem = ET.SubElement(root, "customer")
                
                # Basic Info
                basic_info = ET.SubElement(customer_elem, "basicInfo")
                ET.SubElement(basic_info, "customerId").text = safe_text(row.customer_id)
                ET.SubElement(basic_info, "fullName").text = f"{safe_text(row.prefix)} {safe_text(row.first_name)} {safe_text(row.last_name)}".strip()
                ET.SubElement(basic_info, "dateOfBirth").text = safe_text(row.date_of_birth)
                ET.SubElement(basic_info, "nationality").text = safe_text(row.nationality)
                ET.SubElement(basic_info, "gender").text = safe_text(row.gender)
                ET.SubElement(basic_info, "maritalStatus").text = safe_text(row.marital_status)
                
                # Contact Info
                contact_info = ET.SubElement(customer_elem, "contactInfo")
                ET.SubElement(contact_info, "email").text = safe_text(row.email)
                ET.SubElement(contact_info, "mobilePhone").text = safe_text(row.mobile_phone)
                ET.SubElement(contact_info, "homePhone").text = safe_text(row.home_phone)
                
                address = ET.SubElement(contact_info, "address")
                ET.SubElement(address, "houseNumber").text = safe_text(row.house_number)
                ET.SubElement(address, "alley").text = safe_text(row.alley)
                ET.SubElement(address, "road").text = safe_text(row.road)
                ET.SubElement(address, "subdistrict").text = safe_text(row.subdistrict)
                ET.SubElement(address, "district").text = safe_text(row.district)
                ET.SubElement(address, "province").text = safe_text(row.province)
                ET.SubElement(address, "postalCode").text = safe_text(row.postal_code)
                
                # Socio Economic Info
                socio_economic = ET.SubElement(customer_elem, "socioEconomicInfo")
                ET.SubElement(socio_economic, "education").text = safe_text(row.education)
                ET.SubElement(socio_economic, "occupation").text = safe_text(row.occupation)
                ET.SubElement(socio_economic, "monthlyIncome").text = safe_text(row.monthly_income)
                ET.SubElement(socio_economic, "industryType").text = safe_text(row.industry_type)
                
                # Travel Preferences
                travel_prefs = ET.SubElement(customer_elem, "travelPreferences")
                ET.SubElement(travel_prefs, "preferredDestinationType").text = safe_text(row.preferred_destination_type)
                ET.SubElement(travel_prefs, "preferredTravelStyle").text = safe_text(row.preferred_travel_style)
                ET.SubElement(travel_prefs, "accommodationPreference").text = safe_text(row.accommodation_preference)
                ET.SubElement(travel_prefs, "budgetRange").text = safe_text(row.budget_range)
                ET.SubElement(travel_prefs, "travelCompanionType").text = safe_text(row.travel_companion_type)
                
                # Interaction History
                interaction = ET.SubElement(customer_elem, "interactionHistory")
                ET.SubElement(interaction, "lastVisitDate").text = safe_text(row.last_visit_date)
                ET.SubElement(interaction, "totalVisits").text = safe_text(row.total_visits)
                ET.SubElement(interaction, "favoriteDestinations").text = safe_text(row.favorite_destinations)
                ET.SubElement(interaction, "bookingChannels").text = safe_text(row.booking_channels)
                
                # Loyalty Program
                loyalty = ET.SubElement(customer_elem, "loyaltyProgram")
                ET.SubElement(loyalty, "membershipLevel").text = safe_text(row.membership_level)
                ET.SubElement(loyalty, "memberSince").text = safe_text(row.member_since)
                ET.SubElement(loyalty, "totalPoints").text = safe_text(row.total_points)
                ET.SubElement(loyalty, "lastActivityDate").text = safe_text(row.last_activity_date)
                
                # Customer Consent
                consent = ET.SubElement(customer_elem, "customerConsent")
                ET.SubElement(consent, "preferredLanguage").text = safe_text(row.preferred_language)
                ET.SubElement(consent, "communicationChannels").text = safe_text(row.communication_channels)
                ET.SubElement(consent, "newsletterSubscription").text = safe_text(row.newsletter_subscription)
                ET.SubElement(consent, "promotionConsent").text = safe_text(row.promotion_consent)
                ET.SubElement(consent, "dataUsageConsent").text = safe_text(row.data_usage_consent)
            
            return ET.tostring(root, encoding="utf-8")
            
    except Exception as e:
        logger.error(f"Error generating customer profile XML: {e}")
        error_root = ET.Element("error")
        error_msg = ET.SubElement(error_root, "message")
        error_msg.text = f"Error generating customer profile XML: {str(e)}"
        return ET.tostring(error_root, encoding="utf-8")

def product_standard_comprehensive_xml(establishment_id: Optional[str] = None) -> bytes:
    """
    สร้าง XML comprehensive สำหรับ product_standard
    JOIN ข้อมูลจากทุกตาราง
    """
    try:
        engine = get_engine('product_standard')
        
        query = """
        SELECT 
            e.establishment_id, e.establishment_name, e.establishment_name_english,
            e.establishment_type, e.business_category, e.business_size,
            
            ea.address, ea.alley, ea.road, ea.subdistrict, ea.district, 
            ea.province, ea.postal_code, ea.latitude, ea.longitude,
            
            ec.telephone, ec.fax, ec.email, ec.website, ec.facebook, 
            ec.line_id, ec.instagram,
            
            o.firm_name, o.firm_type, o.sha_number, o.tax_number, o.registration_date,
            
            c.prefix, c.first_name, c.middle_name, c.last_name, c.position,
            c.telephone as coord_telephone, c.mobile, c.email as coord_email,
            
            sr.star_rating, sr.rating_agency, sr.rating_date, sr.valid_until, sr.certificate_number,
            
            op.opening_hours, op.operating_days, op.capacity, op.number_of_rooms,
            op.number_of_employees, op.facilities, op.services_offered,
            op.languages_supported, op.payment_methods
            
        FROM establishment_info e
        LEFT JOIN establishment_address ea ON e.establishment_id = ea.establishment_id
        LEFT JOIN establishment_contact ec ON e.establishment_id = ec.establishment_id
        LEFT JOIN ownership_info o ON e.establishment_id = o.establishment_id
        LEFT JOIN coordinator_info c ON e.establishment_id = c.establishment_id
        LEFT JOIN star_rating sr ON e.establishment_id = sr.establishment_id
        LEFT JOIN operational_info op ON e.establishment_id = op.establishment_id
        """
        
        if establishment_id:
            query += " WHERE e.establishment_id = :establishment_id"
        
        query += " ORDER BY e.establishment_id"
        
        with engine.connect() as connection:
            if establishment_id:
                result = connection.execute(text(query), {"establishment_id": establishment_id})
            else:
                result = connection.execute(text(query))
            
            rows = result.fetchall()
            
            # สร้าง XML Root
            root = ET.Element("ProductStandardComprehensive")
            root.set("xmlns", "http://www.tourism-thailand.org/product-standard")
            root.set("xmlns:xs", "http://www.w3.org/2001/XMLSchema")
            
            for row in rows:
                establishment_elem = ET.SubElement(root, "establishment")
                
                # Basic Info
                basic_info = ET.SubElement(establishment_elem, "basicInfo")
                ET.SubElement(basic_info, "establishmentId").text = safe_text(row.establishment_id)
                ET.SubElement(basic_info, "establishmentName").text = safe_text(row.establishment_name)
                ET.SubElement(basic_info, "establishmentNameEnglish").text = safe_text(row.establishment_name_english)
                ET.SubElement(basic_info, "establishmentType").text = safe_text(row.establishment_type)
                ET.SubElement(basic_info, "businessCategory").text = safe_text(row.business_category)
                ET.SubElement(basic_info, "businessSize").text = safe_text(row.business_size)
                
                # Address Info
                address_info = ET.SubElement(establishment_elem, "addressInfo")
                ET.SubElement(address_info, "address").text = safe_text(row.address)
                ET.SubElement(address_info, "alley").text = safe_text(row.alley)
                ET.SubElement(address_info, "road").text = safe_text(row.road)
                ET.SubElement(address_info, "subdistrict").text = safe_text(row.subdistrict)
                ET.SubElement(address_info, "district").text = safe_text(row.district)
                ET.SubElement(address_info, "province").text = safe_text(row.province)
                ET.SubElement(address_info, "postalCode").text = safe_text(row.postal_code)
                
                location = ET.SubElement(address_info, "location")
                ET.SubElement(location, "latitude").text = safe_text(row.latitude)
                ET.SubElement(location, "longitude").text = safe_text(row.longitude)
                
                # Contact Info
                contact_info = ET.SubElement(establishment_elem, "contactInfo")
                ET.SubElement(contact_info, "telephone").text = safe_text(row.telephone)
                ET.SubElement(contact_info, "fax").text = safe_text(row.fax)
                ET.SubElement(contact_info, "email").text = safe_text(row.email)
                ET.SubElement(contact_info, "website").text = safe_text(row.website)
                ET.SubElement(contact_info, "facebook").text = safe_text(row.facebook)
                ET.SubElement(contact_info, "lineId").text = safe_text(row.line_id)
                ET.SubElement(contact_info, "instagram").text = safe_text(row.instagram)
                
                # Ownership Info
                ownership_info = ET.SubElement(establishment_elem, "ownershipInfo")
                ET.SubElement(ownership_info, "firmName").text = safe_text(row.firm_name)
                ET.SubElement(ownership_info, "firmType").text = safe_text(row.firm_type)
                ET.SubElement(ownership_info, "shaNumber").text = safe_text(row.sha_number)
                ET.SubElement(ownership_info, "taxNumber").text = safe_text(row.tax_number)
                ET.SubElement(ownership_info, "registrationDate").text = safe_text(row.registration_date)
                
                # Coordinator Info
                coordinator_info = ET.SubElement(establishment_elem, "coordinatorInfo")
                coordinator_name = f"{safe_text(row.prefix)} {safe_text(row.first_name)} {safe_text(row.middle_name)} {safe_text(row.last_name)}".strip()
                ET.SubElement(coordinator_info, "coordinatorName").text = coordinator_name
                ET.SubElement(coordinator_info, "position").text = safe_text(row.position)
                ET.SubElement(coordinator_info, "telephone").text = safe_text(row.coord_telephone)
                ET.SubElement(coordinator_info, "mobile").text = safe_text(row.mobile)
                ET.SubElement(coordinator_info, "email").text = safe_text(row.coord_email)
                
                # Star Rating
                star_rating_info = ET.SubElement(establishment_elem, "starRating")
                ET.SubElement(star_rating_info, "starRating").text = safe_text(row.star_rating)
                ET.SubElement(star_rating_info, "ratingAgency").text = safe_text(row.rating_agency)
                ET.SubElement(star_rating_info, "ratingDate").text = safe_text(row.rating_date)
                ET.SubElement(star_rating_info, "validUntil").text = safe_text(row.valid_until)
                ET.SubElement(star_rating_info, "certificateNumber").text = safe_text(row.certificate_number)
                
                # Operational Info
                operational_info = ET.SubElement(establishment_elem, "operationalInfo")
                ET.SubElement(operational_info, "openingHours").text = safe_text(row.opening_hours)
                ET.SubElement(operational_info, "operatingDays").text = safe_text(row.operating_days)
                ET.SubElement(operational_info, "capacity").text = safe_text(row.capacity)
                ET.SubElement(operational_info, "numberOfRooms").text = safe_text(row.number_of_rooms)
                ET.SubElement(operational_info, "numberOfEmployees").text = safe_text(row.number_of_employees)
                ET.SubElement(operational_info, "facilities").text = safe_text(row.facilities)
                ET.SubElement(operational_info, "servicesOffered").text = safe_text(row.services_offered)
                ET.SubElement(operational_info, "languagesSupported").text = safe_text(row.languages_supported)
                ET.SubElement(operational_info, "paymentMethods").text = safe_text(row.payment_methods)
            
            return ET.tostring(root, encoding="utf-8")
            
    except Exception as e:
        logger.error(f"Error generating product standard XML: {e}")
        error_root = ET.Element("error")
        error_msg = ET.SubElement(error_root, "message")
        error_msg.text = f"Error generating product standard XML: {str(e)}"
        return ET.tostring(error_root, encoding="utf-8")

def tourism_route_comprehensive_xml(route_code: Optional[str] = None) -> bytes:
    """
    สร้าง XML comprehensive สำหรับ tourism_route
    JOIN ข้อมูลจากทุกตาราง
    """
    try:
        engine = get_engine('tourism_route')
        
        query = """
        SELECT DISTINCT
            tr.route_code, tr.route_name_thai, tr.route_name_english,
            tr.number_of_days, tr.starting_province, tr.ending_province,
            tr.covered_provinces, tr.route_description, tr.route_type, tr.difficulty_level,
            
            s.start_date, s.end_date, s.available_seasons, s.max_participants, 
            s.min_participants, s.booking_deadline,
            
            oci.owner_name, oci.owner_telephone_number, oci.owner_email,
            oci.license_number, oci.company_name, oci.company_registration,
            
            ai.wheelchair_accessible, ai.elderly_friendly, ai.child_friendly,
            ai.difficulty as accessibility_difficulty, ai.physical_requirements, 
            ai.age_restrictions, ai.special_needs_support, ai.accessibility_notes,
            
            si.environmental_impact, si.carbon_footprint, si.local_community_involvement,
            si.sustainable_practices, si.eco_certification, si.waste_management_plan,
            si.water_conservation, si.energy_efficiency
            
        FROM tourism_route_table tr
        LEFT JOIN schedule_table s ON tr.route_code = s.route_code
        LEFT JOIN owner_contact_information oci ON tr.route_code = oci.route_code
        LEFT JOIN accessibility_info ai ON tr.route_code = ai.route_code
        LEFT JOIN sustainability_info si ON tr.route_code = si.route_code
        """
        
        if route_code:
            query += " WHERE tr.route_code = :route_code"
        
        query += " ORDER BY tr.route_code"
        
        with engine.connect() as connection:
            if route_code:
                result = connection.execute(text(query), {"route_code": route_code})
            else:
                result = connection.execute(text(query))
            
            rows = result.fetchall()
            
            # สร้าง XML Root
            root = ET.Element("TourismRouteComprehensive")
            root.set("xmlns", "http://www.tourism-thailand.org/tourism-route")
            root.set("xmlns:xs", "http://www.w3.org/2001/XMLSchema")
            
            for row in rows:
                route_elem = ET.SubElement(root, "tourismRoute")
                
                # Basic Route Info
                basic_info = ET.SubElement(route_elem, "basicInfo")
                ET.SubElement(basic_info, "routeCode").text = safe_text(row.route_code)
                ET.SubElement(basic_info, "routeNameThai").text = safe_text(row.route_name_thai)
                ET.SubElement(basic_info, "routeNameEnglish").text = safe_text(row.route_name_english)
                ET.SubElement(basic_info, "numberOfDays").text = safe_text(row.number_of_days)
                ET.SubElement(basic_info, "startingProvince").text = safe_text(row.starting_province)
                ET.SubElement(basic_info, "endingProvince").text = safe_text(row.ending_province)
                ET.SubElement(basic_info, "coveredProvinces").text = safe_text(row.covered_provinces)
                ET.SubElement(basic_info, "routeDescription").text = safe_text(row.route_description)
                ET.SubElement(basic_info, "routeType").text = safe_text(row.route_type)
                ET.SubElement(basic_info, "difficultyLevel").text = safe_text(row.difficulty_level)
                
                # Schedule Info
                schedule_info = ET.SubElement(route_elem, "scheduleInfo")
                ET.SubElement(schedule_info, "startDate").text = safe_text(row.start_date)
                ET.SubElement(schedule_info, "endDate").text = safe_text(row.end_date)
                ET.SubElement(schedule_info, "availableSeasons").text = safe_text(row.available_seasons)
                ET.SubElement(schedule_info, "maxParticipants").text = safe_text(row.max_participants)
                ET.SubElement(schedule_info, "minParticipants").text = safe_text(row.min_participants)
                ET.SubElement(schedule_info, "bookingDeadline").text = safe_text(row.booking_deadline)
                
                # Owner Contact Info
                owner_info = ET.SubElement(route_elem, "ownerContactInfo")
                ET.SubElement(owner_info, "ownerName").text = safe_text(row.owner_name)
                ET.SubElement(owner_info, "ownerTelephoneNumber").text = safe_text(row.owner_telephone_number)
                ET.SubElement(owner_info, "ownerEmail").text = safe_text(row.owner_email)
                ET.SubElement(owner_info, "licenseNumber").text = safe_text(row.license_number)
                ET.SubElement(owner_info, "companyName").text = safe_text(row.company_name)
                ET.SubElement(owner_info, "companyRegistration").text = safe_text(row.company_registration)
                
                # Accessibility Info
                accessibility_info = ET.SubElement(route_elem, "accessibilityInfo")
                ET.SubElement(accessibility_info, "wheelchairAccessible").text = safe_text(row.wheelchair_accessible)
                ET.SubElement(accessibility_info, "elderlyFriendly").text = safe_text(row.elderly_friendly)
                ET.SubElement(accessibility_info, "childFriendly").text = safe_text(row.child_friendly)
                ET.SubElement(accessibility_info, "difficultyLevel").text = safe_text(row.accessibility_difficulty)
                ET.SubElement(accessibility_info, "physicalRequirements").text = safe_text(row.physical_requirements)
                ET.SubElement(accessibility_info, "ageRestrictions").text = safe_text(row.age_restrictions)
                ET.SubElement(accessibility_info, "specialNeedsSupport").text = safe_text(row.special_needs_support)
                ET.SubElement(accessibility_info, "accessibilityNotes").text = safe_text(row.accessibility_notes)
                
                # Sustainability Info
                sustainability_info = ET.SubElement(route_elem, "sustainabilityInfo")
                ET.SubElement(sustainability_info, "environmentalImpact").text = safe_text(row.environmental_impact)
                ET.SubElement(sustainability_info, "carbonFootprint").text = safe_text(row.carbon_footprint)
                ET.SubElement(sustainability_info, "localCommunityInvolvement").text = safe_text(row.local_community_involvement)
                ET.SubElement(sustainability_info, "sustainablePractices").text = safe_text(row.sustainable_practices)
                ET.SubElement(sustainability_info, "ecoCertification").text = safe_text(row.eco_certification)
                ET.SubElement(sustainability_info, "wasteManagementPlan").text = safe_text(row.waste_management_plan)
                ET.SubElement(sustainability_info, "waterConservation").text = safe_text(row.water_conservation)
                ET.SubElement(sustainability_info, "energyEfficiency").text = safe_text(row.energy_efficiency)
            
            return ET.tostring(root, encoding="utf-8")
            
    except Exception as e:
        logger.error(f"Error generating tourism route XML: {e}")
        error_root = ET.Element("error")
        error_msg = ET.SubElement(error_root, "message")
        error_msg.text = f"Error generating tourism route XML: {str(e)}"
        return ET.tostring(error_root, encoding="utf-8")

def tourism_situation_report_comprehensive_xml(document_id: Optional[str] = None) -> bytes:
    """
    สร้าง XML comprehensive สำหรับ tourism_situation_report
    JOIN ข้อมูลจากทุกตาราง
    """
    try:
        engine = get_engine('tourism_situation')
        
        query = """
        SELECT 
            d.document_id, d.document_title, d.document_type, d.language,
            d.creation_date, d.last_modified_date, d.version, d.status,
            d.keywords, d.abstract, d.classification,
            
            p.project_id, p.project_year, p.project_name, p.research_methodology,
            p.data_sources, p.budget, p.project_duration, p.principal_investigator,
            p.co_investigators, p.funding_source,
            
            f.file_name, f.file_format, f.file_size_mb, f.number_of_pages,
            f.file_checksum, f.creating_application, f.is_searchable_pdf,
            f.password_protected, f.digital_signature,
            
            o.owning_organization, o.responsible_division, o.department,
            o.organization_type, o.organization_level, o.parent_organization,
            
            c.contact_person, c.position, c.email, c.telephone, c.mobile,
            c.fax, c.office_hours, c.alternative_contact, c.alternative_email,
            
            l.license_type, l.license_url, l.usage_restrictions, l.attribution_required,
            l.commercial_use_allowed, l.modification_allowed, l.distribution_allowed,
            l.copyright_notice
            
        FROM document_basic_info d
        LEFT JOIN project_details p ON d.document_id = p.document_id
        LEFT JOIN file_properties f ON d.document_id = f.document_id
        LEFT JOIN organizational_details o ON d.document_id = o.document_id
        LEFT JOIN contact_details c ON d.document_id = c.document_id
        LEFT JOIN license_details l ON d.document_id = l.document_id
        """
        
        if document_id:
            query += " WHERE d.document_id = :document_id"
        
        query += " ORDER BY d.document_id"
        
        with engine.connect() as connection:
            if document_id:
                result = connection.execute(text(query), {"document_id": document_id})
            else:
                result = connection.execute(text(query))
            
            rows = result.fetchall()
            
            # สร้าง XML Root
            root = ET.Element("TourismSituationReportComprehensive")
            root.set("xmlns", "http://www.tourism-thailand.org/situation-report")
            root.set("xmlns:xs", "http://www.w3.org/2001/XMLSchema")
            
            for row in rows:
                document_elem = ET.SubElement(root, "document")
                
                # Document Basic Info
                basic_info = ET.SubElement(document_elem, "basicInfo")
                ET.SubElement(basic_info, "documentId").text = safe_text(row.document_id)
                ET.SubElement(basic_info, "documentTitle").text = safe_text(row.document_title)
                ET.SubElement(basic_info, "documentType").text = safe_text(row.document_type)
                ET.SubElement(basic_info, "language").text = safe_text(row.language)
                ET.SubElement(basic_info, "creationDate").text = safe_text(row.creation_date)
                ET.SubElement(basic_info, "lastModifiedDate").text = safe_text(row.last_modified_date)
                ET.SubElement(basic_info, "version").text = safe_text(row.version)
                ET.SubElement(basic_info, "status").text = safe_text(row.status)
                ET.SubElement(basic_info, "keywords").text = safe_text(row.keywords)
                ET.SubElement(basic_info, "abstract").text = safe_text(row.abstract)
                ET.SubElement(basic_info, "classification").text = safe_text(row.classification)
                
                # Project Details
                project_info = ET.SubElement(document_elem, "projectDetails")
                ET.SubElement(project_info, "projectId").text = safe_text(row.project_id)
                ET.SubElement(project_info, "projectYear").text = safe_text(row.project_year)
                ET.SubElement(project_info, "projectName").text = safe_text(row.project_name)
                ET.SubElement(project_info, "researchMethodology").text = safe_text(row.research_methodology)
                ET.SubElement(project_info, "dataSources").text = safe_text(row.data_sources)
                ET.SubElement(project_info, "budget").text = safe_text(row.budget)
                ET.SubElement(project_info, "projectDuration").text = safe_text(row.project_duration)
                ET.SubElement(project_info, "principalInvestigator").text = safe_text(row.principal_investigator)
                ET.SubElement(project_info, "coInvestigators").text = safe_text(row.co_investigators)
                ET.SubElement(project_info, "fundingSource").text = safe_text(row.funding_source)
                
                # File Properties
                file_info = ET.SubElement(document_elem, "fileProperties")
                ET.SubElement(file_info, "fileName").text = safe_text(row.file_name)
                ET.SubElement(file_info, "fileFormat").text = safe_text(row.file_format)
                ET.SubElement(file_info, "fileSizeMb").text = safe_text(row.file_size_mb)
                ET.SubElement(file_info, "numberOfPages").text = safe_text(row.number_of_pages)
                ET.SubElement(file_info, "fileChecksum").text = safe_text(row.file_checksum)
                ET.SubElement(file_info, "creatingApplication").text = safe_text(row.creating_application)
                ET.SubElement(file_info, "isSearchablePdf").text = safe_text(row.is_searchable_pdf)
                ET.SubElement(file_info, "passwordProtected").text = safe_text(row.password_protected)
                ET.SubElement(file_info, "digitalSignature").text = safe_text(row.digital_signature)
                
                # Organizational Details
                org_info = ET.SubElement(document_elem, "organizationalDetails")
                ET.SubElement(org_info, "owningOrganization").text = safe_text(row.owning_organization)
                ET.SubElement(org_info, "responsibleDivision").text = safe_text(row.responsible_division)
                ET.SubElement(org_info, "department").text = safe_text(row.department)
                ET.SubElement(org_info, "organizationType").text = safe_text(row.organization_type)
                ET.SubElement(org_info, "organizationLevel").text = safe_text(row.organization_level)
                ET.SubElement(org_info, "parentOrganization").text = safe_text(row.parent_organization)
                
                # Contact Details
                contact_info = ET.SubElement(document_elem, "contactDetails")
                ET.SubElement(contact_info, "contactPerson").text = safe_text(row.contact_person)
                ET.SubElement(contact_info, "position").text = safe_text(row.position)
                ET.SubElement(contact_info, "email").text = safe_text(row.email)
                ET.SubElement(contact_info, "telephone").text = safe_text(row.telephone)
                ET.SubElement(contact_info, "mobile").text = safe_text(row.mobile)
                ET.SubElement(contact_info, "fax").text = safe_text(row.fax)
                ET.SubElement(contact_info, "officeHours").text = safe_text(row.office_hours)
                ET.SubElement(contact_info, "alternativeContact").text = safe_text(row.alternative_contact)
                ET.SubElement(contact_info, "alternativeEmail").text = safe_text(row.alternative_email)
                
                # License Details
                license_info = ET.SubElement(document_elem, "licenseDetails")
                ET.SubElement(license_info, "licenseType").text = safe_text(row.license_type)
                ET.SubElement(license_info, "licenseUrl").text = safe_text(row.license_url)
                ET.SubElement(license_info, "usageRestrictions").text = safe_text(row.usage_restrictions)
                ET.SubElement(license_info, "attributionRequired").text = safe_text(row.attribution_required)
                ET.SubElement(license_info, "commercialUseAllowed").text = safe_text(row.commercial_use_allowed)
                ET.SubElement(license_info, "modificationAllowed").text = safe_text(row.modification_allowed)
                ET.SubElement(license_info, "distributionAllowed").text = safe_text(row.distribution_allowed)
                ET.SubElement(license_info, "copyrightNotice").text = safe_text(row.copyright_notice)
            
            return ET.tostring(root, encoding="utf-8")
            
    except Exception as e:
        logger.error(f"Error generating tourism situation report XML: {e}")
        error_root = ET.Element("error")
        error_msg = ET.SubElement(error_root, "message")
        error_msg.text = f"Error generating tourism situation report XML: {str(e)}"
        return ET.tostring(error_root, encoding="utf-8")

def tourist_behavior_survey_comprehensive_xml(respondent_id: Optional[str] = None) -> bytes:
    """
    สร้าง XML comprehensive สำหรับ tourist_behavior_survey
    JOIN ข้อมูลจากทุกตาราง (ตามตัวอย่างที่ให้มา)
    """
    try:
        engine = get_engine('tourist_behavior')
        
        query = """
        SELECT 
            sr.respondent_id, sr.survey_year, sr.survey_quarter, sr.survey_date,
            sr.survey_method, sr.interviewer_id, sr.survey_location, sr.response_quality,
            sr.completion_status,
            
            d.age, d.age_group, d.gender, d.education, d.occupation, d.occupation_category,
            d.monthly_income, d.income_range, d.province, d.region, d.marital_status, d.family_size,
            
            tb.domestic_travel_frequency, tb.international_travel_frequency, tb.preferred_travel_season,
            tb.travel_duration, tb.average_budget_per_trip, tb.budget_range, tb.travel_companion,
            tb.booking_channel, tb.information_source, tb.planning_time,
            
            dp.preferred_destination_type, dp.preferred_activities, dp.accommodation_type,
            dp.transportation_mode, dp.dining_preference, dp.shopping_interest,
            dp.entertainment_preference, dp.favorite_domestic_destinations, dp.favorite_international_destinations,
            
            ci.travel_frequency_change, ci.budget_change, ci.destination_preference_change,
            ci.safety_measures, ci.vaccination_status, ci.travel_confidence, ci.preferred_group_size,
            ci.booking_timing_change, ci.hygiene_importance, ci.future_travel_plans,
            
            db.social_media_usage, db.online_booking_frequency, db.preferred_devices,
            db.travel_apps_used, db.review_posting_behavior, db.influencer_impact, db.digital_payment_preference,
            
            sr_rating.overall_satisfaction, sr_rating.accommodation_satisfaction, sr_rating.food_satisfaction,
            sr_rating.transportation_satisfaction, sr_rating.attractions_satisfaction, sr_rating.service_satisfaction,
            sr_rating.value_for_money, sr_rating.recommendation_likelihood, sr_rating.repeat_visit_intention
            
        FROM survey_respondents sr
        LEFT JOIN demographic d ON sr.respondent_id = d.respondent_id
        LEFT JOIN travel_behavior tb ON sr.respondent_id = tb.respondent_id
        LEFT JOIN destination_preferences dp ON sr.respondent_id = dp.respondent_id
        LEFT JOIN covid_impact ci ON sr.respondent_id = ci.respondent_id
        LEFT JOIN digital_behavior db ON sr.respondent_id = db.respondent_id
        LEFT JOIN satisfaction_ratings sr_rating ON sr.respondent_id = sr_rating.respondent_id
        """
        
        if respondent_id:
            query += " WHERE sr.respondent_id = :respondent_id"
        
        query += " ORDER BY sr.respondent_id"
        
        with engine.connect() as connection:
            if respondent_id:
                result = connection.execute(text(query), {"respondent_id": respondent_id})
            else:
                result = connection.execute(text(query))
            
            rows = result.fetchall()
            
            # สร้าง XML Root ตามตัวอย่างที่ให้มา
            root = ET.Element("TouristBehaviorSurveyComprehensive")
            root.set("xmlns", "http://www.w3.org/2001/XMLSchema")
            root.set("xmlns:xs", "http://www.w3.org/2001/XMLSchema")
            
            for row in rows:
                # ตามตัวอย่างที่ให้มา - ใช้ respondent เป็น element หลัก
                respondent_elem = ET.SubElement(root, "respondent")
                
                # Basic Survey Info
                ET.SubElement(respondent_elem, "respondentId").text = safe_text(row.respondent_id)
                ET.SubElement(respondent_elem, "surveyYear").text = safe_text(row.survey_year)
                ET.SubElement(respondent_elem, "surveyQuarter").text = safe_text(row.survey_quarter)
                ET.SubElement(respondent_elem, "surveyDate").text = safe_text(row.survey_date)
                ET.SubElement(respondent_elem, "surveyMethod").text = safe_text(row.survey_method)
                ET.SubElement(respondent_elem, "completionStatus").text = safe_text(row.completion_status)
                
                # Demographic (ตามตัวอย่าง)
                demographic = ET.SubElement(respondent_elem, "demographic")
                ET.SubElement(demographic, "age").text = safe_text(row.age)
                ET.SubElement(demographic, "gender").text = safe_text(row.gender)
                ET.SubElement(demographic, "education").text = safe_text(row.education)
                ET.SubElement(demographic, "occupation").text = safe_text(row.occupation)
                ET.SubElement(demographic, "monthlyIncome").text = safe_text(row.monthly_income)
                ET.SubElement(demographic, "province").text = safe_text(row.province)
                ET.SubElement(demographic, "region").text = safe_text(row.region)
                ET.SubElement(demographic, "maritalStatus").text = safe_text(row.marital_status)
                ET.SubElement(demographic, "familySize").text = safe_text(row.family_size)
                
                # Travel Behavior (ตามตัวอย่าง)
                travel_behavior = ET.SubElement(respondent_elem, "travelBehavior")
                ET.SubElement(travel_behavior, "domesticTravelFrequency").text = safe_text(row.domestic_travel_frequency)
                ET.SubElement(travel_behavior, "internationalTravelFrequency").text = safe_text(row.international_travel_frequency)
                ET.SubElement(travel_behavior, "preferredTravelSeason").text = safe_text(row.preferred_travel_season)
                ET.SubElement(travel_behavior, "travelDuration").text = safe_text(row.travel_duration)
                ET.SubElement(travel_behavior, "averageBudgetPerTrip").text = safe_text(row.average_budget_per_trip)
                ET.SubElement(travel_behavior, "travelCompanion").text = safe_text(row.travel_companion)
                ET.SubElement(travel_behavior, "bookingChannel").text = safe_text(row.booking_channel)
                ET.SubElement(travel_behavior, "informationSource").text = safe_text(row.information_source)
                ET.SubElement(travel_behavior, "planningTime").text = safe_text(row.planning_time)
                
                # Destination Preferences (ตามตัวอย่าง)
                destination_preferences = ET.SubElement(respondent_elem, "destinationPreferences")
                ET.SubElement(destination_preferences, "preferredDestinationType").text = safe_text(row.preferred_destination_type)
                ET.SubElement(destination_preferences, "preferredActivities").text = safe_text(row.preferred_activities)
                ET.SubElement(destination_preferences, "accommodationType").text = safe_text(row.accommodation_type)
                ET.SubElement(destination_preferences, "transportationMode").text = safe_text(row.transportation_mode)
                ET.SubElement(destination_preferences, "diningPreference").text = safe_text(row.dining_preference)
                ET.SubElement(destination_preferences, "shoppingInterest").text = safe_text(row.shopping_interest)
                ET.SubElement(destination_preferences, "entertainmentPreference").text = safe_text(row.entertainment_preference)
                
                # COVID Impact (ตามตัวอย่าง)
                covid_impact = ET.SubElement(respondent_elem, "covidImpact")
                ET.SubElement(covid_impact, "travelFrequencyChange").text = safe_text(row.travel_frequency_change)
                ET.SubElement(covid_impact, "budgetChange").text = safe_text(row.budget_change)
                ET.SubElement(covid_impact, "destinationPreferenceChange").text = safe_text(row.destination_preference_change)
                ET.SubElement(covid_impact, "safetyMeasures").text = safe_text(row.safety_measures)
                ET.SubElement(covid_impact, "vaccinationStatus").text = safe_text(row.vaccination_status)
                ET.SubElement(covid_impact, "travelConfidence").text = safe_text(row.travel_confidence)
                ET.SubElement(covid_impact, "hygieneImportance").text = safe_text(row.hygiene_importance)
                ET.SubElement(covid_impact, "futureTravelPlans").text = safe_text(row.future_travel_plans)
                
                # Digital Behavior
                digital_behavior = ET.SubElement(respondent_elem, "digitalBehavior")
                ET.SubElement(digital_behavior, "socialMediaUsage").text = safe_text(row.social_media_usage)
                ET.SubElement(digital_behavior, "onlineBookingFrequency").text = safe_text(row.online_booking_frequency)
                ET.SubElement(digital_behavior, "preferredDevices").text = safe_text(row.preferred_devices)
                ET.SubElement(digital_behavior, "travelAppsUsed").text = safe_text(row.travel_apps_used)
                ET.SubElement(digital_behavior, "reviewPostingBehavior").text = safe_text(row.review_posting_behavior)
                ET.SubElement(digital_behavior, "influencerImpact").text = safe_text(row.influencer_impact)
                ET.SubElement(digital_behavior, "digitalPaymentPreference").text = safe_text(row.digital_payment_preference)
                
                # Satisfaction Ratings
                satisfaction_ratings = ET.SubElement(respondent_elem, "satisfactionRatings")
                ET.SubElement(satisfaction_ratings, "overallSatisfaction").text = safe_text(row.overall_satisfaction)
                ET.SubElement(satisfaction_ratings, "accommodationSatisfaction").text = safe_text(row.accommodation_satisfaction)
                ET.SubElement(satisfaction_ratings, "foodSatisfaction").text = safe_text(row.food_satisfaction)
                ET.SubElement(satisfaction_ratings, "transportationSatisfaction").text = safe_text(row.transportation_satisfaction)
                ET.SubElement(satisfaction_ratings, "attractionsSatisfaction").text = safe_text(row.attractions_satisfaction)
                ET.SubElement(satisfaction_ratings, "serviceSatisfaction").text = safe_text(row.service_satisfaction)
                ET.SubElement(satisfaction_ratings, "valueForMoney").text = safe_text(row.value_for_money)
                ET.SubElement(satisfaction_ratings, "recommendationLikelihood").text = safe_text(row.recommendation_likelihood)
                ET.SubElement(satisfaction_ratings, "repeatVisitIntention").text = safe_text(row.repeat_visit_intention)
            
            return ET.tostring(root, encoding="utf-8")
            
    except Exception as e:
        logger.error(f"Error generating tourist behavior survey XML: {e}")
        error_root = ET.Element("error")
        error_msg = ET.SubElement(error_root, "message")
        error_msg.text = f"Error generating tourist behavior survey XML: {str(e)}"
        return ET.tostring(error_root, encoding="utf-8")