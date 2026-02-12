/**
 * TypeScript interfaces for Dentalemon Dentist Directory
 * Defines data models for dentist profiles, clinics, appointments, and related entities
 */

/**
 * Contact information for a dentist or clinic
 */
export interface ContactInfo {
  phone: string;
  email: string;
  website?: string;
}

/**
 * Physical address for a clinic location
 */
export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

/**
 * Time slot representation for scheduling
 */
export interface TimeSlot {
  start: string; // Format: "HH:MM" (24-hour)
  end: string;   // Format: "HH:MM" (24-hour)
}

/**
 * Schedule for a specific day of the week
 */
export interface Schedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  isOpen: boolean;
  slots: TimeSlot[];
}

/**
 * Fee information for consultations and services
 */
export interface Fee {
  consultationType: 'Initial Consultation' | 'Follow-up' | 'General Checkup' | 'Specialist Consultation';
  amount: number;
  currency: string;
  notes?: string;
}

/**
 * Clinic information including location, schedule, and fees
 */
export interface Clinic {
  id: string;
  name: string;
  address: Address;
  contact: ContactInfo;
  schedules: Schedule[];
  fees: Fee[];
}

/**
 * Education credentials for a dentist
 */
export interface Education {
  degree: string; // e.g., "Doctor of Dental Medicine (DMD)"
  institution: string;
  year: number;
  location?: string;
}

/**
 * Professional certification or specialization
 */
export interface Certification {
  title: string;
  issuingOrganization: string;
  year: number;
  expiryDate?: string;
}

/**
 * Frequently asked question with answer
 */
export interface FAQ {
  question: string;
  answer: string;
}

/**
 * Earliest availability information for a dentist
 */
export interface Availability {
  date: string; // Format: "YYYY-MM-DD"
  time: string; // Format: "HH:MM"
  clinicId: string;
  clinicName: string;
}

/**
 * Complete dentist profile
 */
export interface Dentist {
  id: string;
  slug: string; // URL-friendly identifier (e.g., "dr-jane-smith")
  name: string;
  title: string; // e.g., "Dr.", "DMD", "DDS"
  photo: string; // URL to profile photo
  specialty: string; // Primary specialty (e.g., "General Dentistry", "Orthodontics")
  specialties: string[]; // All specialties (primary + additional)
  bio: string; // Professional biography
  yearsOfExperience: number;
  education: Education[];
  certifications: Certification[];
  affiliations: string[]; // Professional organizations (e.g., "Philippine Dental Association")
  services: string[]; // Services offered (e.g., "Teeth Cleaning", "Root Canal")
  clinics: Clinic[];
  languages: string[]; // Languages spoken (e.g., ["English", "Tagalog", "Cebuano"])
  availability: Availability; // Earliest available appointment
  faqs: FAQ[];
  contact: ContactInfo; // Primary contact information
  verified: boolean; // Whether the dentist profile is verified
  featured: boolean; // Whether to feature on directory page
  rating?: number; // Optional: average rating (0-5)
  reviewCount?: number; // Optional: number of reviews
}

/**
 * Appointment request payload
 */
export interface AppointmentRequest {
  dentistId: string;
  clinicId: string;
  patientType: 'new' | 'existing';
  consultationType: string; // e.g., "Initial Consultation", "Follow-up"
  preferredDate: string; // Format: "YYYY-MM-DD"
  preferredTime: string; // Format: "HH:MM"
  reason: string; // Reason for appointment
  patientInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  consent: boolean; // User consent to terms and conditions
  notes?: string; // Additional notes or requests
}

/**
 * Appointment request response
 */
export interface AppointmentRequestResponse {
  success: boolean;
  requestId?: string;
  message: string;
  error?: string;
}

/**
 * Filter options for directory search
 */
export interface DirectoryFilters {
  specialties: string[];
  locations: string[];
  services: string[];
  languages?: string[];
  availability?: 'today' | 'this-week' | 'this-month' | 'any';
}

/**
 * Search parameters for dentist directory
 */
export interface SearchParams {
  query?: string; // Free text search
  filters?: DirectoryFilters;
  sortBy?: 'relevance' | 'name' | 'experience' | 'availability';
  page?: number;
  limit?: number;
}

/**
 * API response for dentists list
 */
export interface DentistsResponse {
  dentists: Dentist[];
  total: number;
  page: number;
  limit: number;
}
