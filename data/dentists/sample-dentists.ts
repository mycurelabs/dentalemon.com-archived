/**
 * Sample dentist profiles for Dentalemon Dentist Directory
 * Mock data matching the Dentist interface from types/dentist.ts
 */

import { Dentist } from "@/types/dentist";

export const sampleDentists: Dentist[] = [
  {
    id: "dentist-001",
    slug: "dr-jane-smith",
    name: "Dr. Jane Smith",
    title: "DMD",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    specialty: "General Dentistry",
    specialties: ["General Dentistry", "Cosmetic Dentistry"],
    bio: "Dr. Jane Smith is a dedicated general dentist with over 15 years of experience in providing comprehensive dental care to families in Metro Manila. She believes in a patient-centered approach, ensuring every visit is comfortable and stress-free. Dr. Smith is passionate about preventive care and educating patients on proper oral hygiene. She has completed advanced training in cosmetic dentistry and takes pride in helping patients achieve their dream smiles.",
    yearsOfExperience: 15,
    education: [
      {
        degree: "Doctor of Dental Medicine (DMD)",
        institution: "University of the Philippines Manila",
        year: 2009,
        location: "Manila, Philippines"
      },
      {
        degree: "Bachelor of Science in Biology",
        institution: "Ateneo de Manila University",
        year: 2005,
        location: "Quezon City, Philippines"
      }
    ],
    certifications: [
      {
        title: "Advanced Cosmetic Dentistry Certification",
        issuingOrganization: "American Academy of Cosmetic Dentistry",
        year: 2015
      },
      {
        title: "Invisalign Certified Provider",
        issuingOrganization: "Align Technology",
        year: 2018
      }
    ],
    affiliations: [
      "Philippine Dental Association (PDA)",
      "Academy of General Dentistry",
      "International Congress of Oral Implantologists"
    ],
    services: [
      "Teeth Cleaning",
      "Dental Fillings",
      "Teeth Whitening",
      "Veneers",
      "Dental Crowns",
      "Preventive Care"
    ],
    clinics: [
      {
        id: "clinic-001",
        name: "SmileCare Dental Clinic - Makati",
        address: {
          street: "Unit 305, Greenbelt Tower 3, Ayala Avenue",
          city: "Makati",
          province: "Metro Manila",
          postalCode: "1224",
          country: "Philippines"
        },
        contact: {
          phone: "+63 2 8856 4321",
          email: "makati@smilecare.ph",
          website: "https://smilecare.ph"
        },
        schedules: [
          {
            day: "Monday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "12:00" },
              { start: "14:00", end: "18:00" }
            ]
          },
          {
            day: "Tuesday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "12:00" },
              { start: "14:00", end: "18:00" }
            ]
          },
          {
            day: "Wednesday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "12:00" },
              { start: "14:00", end: "18:00" }
            ]
          },
          {
            day: "Thursday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "12:00" },
              { start: "14:00", end: "18:00" }
            ]
          },
          {
            day: "Friday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "12:00" },
              { start: "14:00", end: "17:00" }
            ]
          },
          {
            day: "Saturday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "13:00" }
            ]
          },
          {
            day: "Sunday",
            isOpen: false,
            slots: []
          }
        ],
        fees: [
          {
            consultationType: "Initial Consultation",
            amount: 1500,
            currency: "PHP",
            notes: "Includes basic oral examination"
          },
          {
            consultationType: "General Checkup",
            amount: 1000,
            currency: "PHP"
          }
        ]
      }
    ],
    languages: ["English", "Tagalog", "Cebuano"],
    availability: {
      date: "2026-02-10",
      time: "10:00",
      clinicId: "clinic-001",
      clinicName: "SmileCare Dental Clinic - Makati"
    },
    faqs: [
      {
        question: "Do you accept walk-in patients?",
        answer: "We recommend scheduling an appointment to minimize waiting time, but we do accept walk-ins based on availability."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept cash, credit/debit cards, and major HMO cards including Maxicare, Medicard, and Intellicare."
      },
      {
        question: "Do you offer teeth whitening services?",
        answer: "Yes, we offer both in-office and take-home teeth whitening treatments. Our team can help you choose the best option for your needs."
      }
    ],
    contact: {
      phone: "+63 917 123 4567",
      email: "dr.janesmith@smilecare.ph"
    },
    verified: true,
    featured: true,
    rating: 4.8,
    reviewCount: 127
  },
  {
    id: "dentist-002",
    slug: "dr-carlos-rivera",
    name: "Dr. Carlos Rivera",
    title: "DDS",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    specialty: "Orthodontics",
    specialties: ["Orthodontics", "Dentofacial Orthopedics"],
    bio: "Dr. Carlos Rivera is a board-certified orthodontist specializing in braces and clear aligners. With over 12 years of experience, he has helped thousands of patients achieve straight, beautiful smiles. Dr. Rivera stays current with the latest orthodontic technologies and techniques, including digital treatment planning and 3D imaging. He is known for his gentle approach and excellent patient communication, making orthodontic treatment comfortable for patients of all ages.",
    yearsOfExperience: 12,
    education: [
      {
        degree: "Master of Science in Orthodontics",
        institution: "University of Santo Tomas",
        year: 2013,
        location: "Manila, Philippines"
      },
      {
        degree: "Doctor of Dental Surgery (DDS)",
        institution: "Far Eastern University",
        year: 2010,
        location: "Manila, Philippines"
      }
    ],
    certifications: [
      {
        title: "Philippine Board of Orthodontics Diplomate",
        issuingOrganization: "Philippine Board of Orthodontics",
        year: 2014
      },
      {
        title: "Certified Invisalign Provider",
        issuingOrganization: "Align Technology",
        year: 2016
      }
    ],
    affiliations: [
      "Philippine Association of Orthodontists",
      "World Federation of Orthodontists",
      "Philippine Dental Association"
    ],
    services: [
      "Traditional Braces",
      "Clear Aligners",
      "Invisalign",
      "Retainers",
      "Orthodontic Consultations",
      "Dentofacial Orthopedics"
    ],
    clinics: [
      {
        id: "clinic-002",
        name: "Rivera Orthodontics - Quezon City",
        address: {
          street: "2nd Floor, Eastwood Mall, Libis",
          city: "Quezon City",
          province: "Metro Manila",
          postalCode: "1110",
          country: "Philippines"
        },
        contact: {
          phone: "+63 2 8941 5678",
          email: "qc@riveraortho.ph",
          website: "https://riveraortho.ph"
        },
        schedules: [
          {
            day: "Monday",
            isOpen: true,
            slots: [
              { start: "10:00", end: "13:00" },
              { start: "15:00", end: "19:00" }
            ]
          },
          {
            day: "Tuesday",
            isOpen: true,
            slots: [
              { start: "10:00", end: "13:00" },
              { start: "15:00", end: "19:00" }
            ]
          },
          {
            day: "Wednesday",
            isOpen: true,
            slots: [
              { start: "10:00", end: "13:00" },
              { start: "15:00", end: "19:00" }
            ]
          },
          {
            day: "Thursday",
            isOpen: true,
            slots: [
              { start: "10:00", end: "13:00" },
              { start: "15:00", end: "19:00" }
            ]
          },
          {
            day: "Friday",
            isOpen: true,
            slots: [
              { start: "10:00", end: "13:00" },
              { start: "15:00", end: "18:00" }
            ]
          },
          {
            day: "Saturday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "14:00" }
            ]
          },
          {
            day: "Sunday",
            isOpen: false,
            slots: []
          }
        ],
        fees: [
          {
            consultationType: "Initial Consultation",
            amount: 2000,
            currency: "PHP",
            notes: "Includes complete orthodontic evaluation and treatment plan"
          },
          {
            consultationType: "Follow-up",
            amount: 1500,
            currency: "PHP"
          }
        ]
      }
    ],
    languages: ["English", "Tagalog", "Spanish"],
    availability: {
      date: "2026-02-11",
      time: "15:00",
      clinicId: "clinic-002",
      clinicName: "Rivera Orthodontics - Quezon City"
    },
    faqs: [
      {
        question: "How long does orthodontic treatment typically take?",
        answer: "Treatment duration varies by case complexity, but most patients wear braces for 18-24 months. We'll provide a detailed timeline during your consultation."
      },
      {
        question: "Am I too old for braces?",
        answer: "Not at all! We treat patients of all ages. Adult orthodontics is very common, and options like clear aligners make treatment discreet."
      },
      {
        question: "Do you offer payment plans?",
        answer: "Yes, we offer flexible payment plans to make orthodontic treatment affordable for all families."
      }
    ],
    contact: {
      phone: "+63 918 234 5678",
      email: "dr.rivera@riveraortho.ph"
    },
    verified: true,
    featured: true,
    rating: 4.9,
    reviewCount: 203
  },
  {
    id: "dentist-003",
    slug: "dr-maria-santos",
    name: "Dr. Maria Santos",
    title: "DMD",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    specialty: "Periodontics",
    specialties: ["Periodontics", "Dental Implants"],
    bio: "Dr. Maria Santos is a periodontist with 10 years of experience specializing in gum disease treatment and dental implants. She is passionate about preserving natural teeth and restoring oral health for patients with complex periodontal conditions. Dr. Santos uses the latest minimally invasive techniques to treat gum disease and has advanced training in implant dentistry. Her compassionate approach helps anxious patients feel comfortable during treatment.",
    yearsOfExperience: 10,
    education: [
      {
        degree: "Master of Science in Periodontics",
        institution: "University of the Philippines Manila",
        year: 2016,
        location: "Manila, Philippines"
      },
      {
        degree: "Doctor of Dental Medicine (DMD)",
        institution: "Centro Escolar University",
        year: 2012,
        location: "Manila, Philippines"
      }
    ],
    certifications: [
      {
        title: "Diplomate, Philippine Board of Periodontics",
        issuingOrganization: "Philippine Board of Periodontics",
        year: 2017
      },
      {
        title: "Advanced Implant Dentistry Certification",
        issuingOrganization: "International Congress of Oral Implantologists",
        year: 2019
      }
    ],
    affiliations: [
      "Philippine Society of Periodontology",
      "American Academy of Periodontology",
      "Philippine Dental Association"
    ],
    services: [
      "Gum Disease Treatment",
      "Dental Implants",
      "Bone Grafting",
      "Gum Grafting",
      "Periodontal Maintenance",
      "Crown Lengthening"
    ],
    clinics: [
      {
        id: "clinic-003",
        name: "Santos Periodontics - BGC",
        address: {
          street: "25th Floor, High Street South Corporate Plaza, 9th Avenue",
          city: "Taguig",
          province: "Metro Manila",
          postalCode: "1634",
          country: "Philippines"
        },
        contact: {
          phone: "+63 2 8403 9012",
          email: "bgc@santosperio.ph",
          website: "https://santosperio.ph"
        },
        schedules: [
          {
            day: "Monday",
            isOpen: true,
            slots: [
              { start: "08:00", end: "12:00" },
              { start: "13:00", end: "17:00" }
            ]
          },
          {
            day: "Tuesday",
            isOpen: true,
            slots: [
              { start: "08:00", end: "12:00" },
              { start: "13:00", end: "17:00" }
            ]
          },
          {
            day: "Wednesday",
            isOpen: true,
            slots: [
              { start: "08:00", end: "12:00" },
              { start: "13:00", end: "17:00" }
            ]
          },
          {
            day: "Thursday",
            isOpen: true,
            slots: [
              { start: "08:00", end: "12:00" },
              { start: "13:00", end: "17:00" }
            ]
          },
          {
            day: "Friday",
            isOpen: true,
            slots: [
              { start: "08:00", end: "12:00" },
              { start: "13:00", end: "16:00" }
            ]
          },
          {
            day: "Saturday",
            isOpen: false,
            slots: []
          },
          {
            day: "Sunday",
            isOpen: false,
            slots: []
          }
        ],
        fees: [
          {
            consultationType: "Initial Consultation",
            amount: 2500,
            currency: "PHP",
            notes: "Includes comprehensive periodontal examination"
          },
          {
            consultationType: "Specialist Consultation",
            amount: 2500,
            currency: "PHP"
          }
        ]
      }
    ],
    languages: ["English", "Tagalog", "Ilocano"],
    availability: {
      date: "2026-02-12",
      time: "09:00",
      clinicId: "clinic-003",
      clinicName: "Santos Periodontics - BGC"
    },
    faqs: [
      {
        question: "What are the signs of gum disease?",
        answer: "Common signs include bleeding gums, persistent bad breath, receding gums, and loose teeth. If you notice any of these symptoms, schedule a consultation."
      },
      {
        question: "Are dental implants painful?",
        answer: "The procedure is performed under local anesthesia, so you won't feel pain during treatment. Most patients report minimal discomfort during recovery."
      },
      {
        question: "How long do dental implants last?",
        answer: "With proper care, dental implants can last a lifetime. We'll provide detailed aftercare instructions to ensure the longevity of your implants."
      }
    ],
    contact: {
      phone: "+63 919 345 6789",
      email: "dr.santos@santosperio.ph"
    },
    verified: true,
    featured: false,
    rating: 4.7,
    reviewCount: 89
  },
  {
    id: "dentist-004",
    slug: "dr-michael-tan",
    name: "Dr. Michael Tan",
    title: "DMD",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    specialty: "Endodontics",
    specialties: ["Endodontics", "Root Canal Therapy"],
    bio: "Dr. Michael Tan is an endodontist specializing in saving teeth through root canal therapy and endodontic retreatment. With 8 years of specialized experience, he uses advanced microscopic techniques and digital imaging to provide precise, comfortable treatment. Dr. Tan is committed to patient education and making root canal treatment anxiety-free. His gentle approach and use of modern technology have helped him build a reputation as one of the most trusted endodontists in Metro Manila.",
    yearsOfExperience: 8,
    education: [
      {
        degree: "Certificate in Endodontics",
        institution: "University of Santo Tomas",
        year: 2018,
        location: "Manila, Philippines"
      },
      {
        degree: "Doctor of Dental Medicine (DMD)",
        institution: "University of the East Ramon Magsaysay Memorial Medical Center",
        year: 2014,
        location: "Quezon City, Philippines"
      }
    ],
    certifications: [
      {
        title: "Diplomate, Philippine Board of Endodontics",
        issuingOrganization: "Philippine Board of Endodontics",
        year: 2019
      },
      {
        title: "Microscopic Endodontics Certification",
        issuingOrganization: "American Association of Endodontists",
        year: 2020
      }
    ],
    affiliations: [
      "Philippine Association of Endodontists",
      "American Association of Endodontists",
      "Philippine Dental Association"
    ],
    services: [
      "Root Canal Therapy",
      "Endodontic Retreatment",
      "Apicoectomy",
      "Dental Trauma Management",
      "Microscopic Endodontics",
      "Emergency Dental Care"
    ],
    clinics: [
      {
        id: "clinic-004",
        name: "Tan Endodontics - Pasig",
        address: {
          street: "Unit 12-B, The Podium, ADB Avenue",
          city: "Pasig",
          province: "Metro Manila",
          postalCode: "1605",
          country: "Philippines"
        },
        contact: {
          phone: "+63 2 8634 7890",
          email: "pasig@tanendo.ph",
          website: "https://tanendo.ph"
        },
        schedules: [
          {
            day: "Monday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "13:00" },
              { start: "14:00", end: "18:00" }
            ]
          },
          {
            day: "Tuesday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "13:00" },
              { start: "14:00", end: "18:00" }
            ]
          },
          {
            day: "Wednesday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "13:00" },
              { start: "14:00", end: "18:00" }
            ]
          },
          {
            day: "Thursday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "13:00" },
              { start: "14:00", end: "18:00" }
            ]
          },
          {
            day: "Friday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "13:00" },
              { start: "14:00", end: "17:00" }
            ]
          },
          {
            day: "Saturday",
            isOpen: true,
            slots: [
              { start: "10:00", end: "15:00" }
            ]
          },
          {
            day: "Sunday",
            isOpen: false,
            slots: []
          }
        ],
        fees: [
          {
            consultationType: "Initial Consultation",
            amount: 1800,
            currency: "PHP",
            notes: "Includes diagnostic imaging"
          },
          {
            consultationType: "Specialist Consultation",
            amount: 2000,
            currency: "PHP"
          }
        ]
      }
    ],
    languages: ["English", "Tagalog", "Mandarin"],
    availability: {
      date: "2026-02-13",
      time: "11:00",
      clinicId: "clinic-004",
      clinicName: "Tan Endodontics - Pasig"
    },
    faqs: [
      {
        question: "Is root canal treatment painful?",
        answer: "Modern root canal treatment is no more uncomfortable than getting a filling. We use local anesthesia and sedation options to ensure your comfort."
      },
      {
        question: "How many visits are needed for root canal treatment?",
        answer: "Most cases can be completed in 1-2 visits, depending on the complexity. We'll discuss the timeline during your consultation."
      },
      {
        question: "What happens after root canal treatment?",
        answer: "After treatment, you'll need a crown to protect the tooth. We work closely with your general dentist to ensure seamless care."
      }
    ],
    contact: {
      phone: "+63 920 456 7890",
      email: "dr.tan@tanendo.ph"
    },
    verified: true,
    featured: false,
    rating: 4.9,
    reviewCount: 156
  },
  {
    id: "dentist-005",
    slug: "dr-lisa-chen",
    name: "Dr. Lisa Chen",
    title: "DDS",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    specialty: "Oral Surgery",
    specialties: ["Oral and Maxillofacial Surgery", "Dental Implants"],
    bio: "Dr. Lisa Chen is an oral and maxillofacial surgeon with 14 years of experience in complex dental extractions, wisdom teeth removal, and dental implant surgery. She completed her surgical training in both the Philippines and the United States, bringing world-class expertise to her practice. Dr. Chen is known for her meticulous surgical technique and compassionate patient care. She uses advanced 3D imaging and computer-guided surgery to ensure optimal outcomes for her patients.",
    yearsOfExperience: 14,
    education: [
      {
        degree: "Certificate in Oral and Maxillofacial Surgery",
        institution: "University of California San Francisco",
        year: 2014,
        location: "San Francisco, USA"
      },
      {
        degree: "Doctor of Dental Surgery (DDS)",
        institution: "University of the Philippines Manila",
        year: 2010,
        location: "Manila, Philippines"
      }
    ],
    certifications: [
      {
        title: "Diplomate, Philippine Board of Oral and Maxillofacial Surgery",
        issuingOrganization: "Philippine Board of Oral and Maxillofacial Surgery",
        year: 2015
      },
      {
        title: "Advanced Trauma Life Support Certification",
        issuingOrganization: "American College of Surgeons",
        year: 2016
      }
    ],
    affiliations: [
      "Philippine Association of Oral and Maxillofacial Surgeons",
      "American Association of Oral and Maxillofacial Surgeons",
      "Philippine Dental Association"
    ],
    services: [
      "Wisdom Teeth Removal",
      "Dental Extractions",
      "Dental Implant Surgery",
      "Bone Grafting",
      "TMJ Treatment",
      "Facial Trauma Treatment"
    ],
    clinics: [
      {
        id: "clinic-005",
        name: "Chen Oral Surgery - Alabang",
        address: {
          street: "3rd Floor, Molito Lifestyle Center, Madrigal Avenue",
          city: "Muntinlupa",
          province: "Metro Manila",
          postalCode: "1780",
          country: "Philippines"
        },
        contact: {
          phone: "+63 2 8809 2345",
          email: "alabang@chenoralsurgery.ph",
          website: "https://chenoralsurgery.ph"
        },
        schedules: [
          {
            day: "Monday",
            isOpen: true,
            slots: [
              { start: "08:00", end: "12:00" },
              { start: "13:00", end: "16:00" }
            ]
          },
          {
            day: "Tuesday",
            isOpen: true,
            slots: [
              { start: "08:00", end: "12:00" },
              { start: "13:00", end: "16:00" }
            ]
          },
          {
            day: "Wednesday",
            isOpen: true,
            slots: [
              { start: "08:00", end: "12:00" },
              { start: "13:00", end: "16:00" }
            ]
          },
          {
            day: "Thursday",
            isOpen: true,
            slots: [
              { start: "08:00", end: "12:00" },
              { start: "13:00", end: "16:00" }
            ]
          },
          {
            day: "Friday",
            isOpen: true,
            slots: [
              { start: "08:00", end: "12:00" },
              { start: "13:00", end: "15:00" }
            ]
          },
          {
            day: "Saturday",
            isOpen: false,
            slots: []
          },
          {
            day: "Sunday",
            isOpen: false,
            slots: []
          }
        ],
        fees: [
          {
            consultationType: "Initial Consultation",
            amount: 2500,
            currency: "PHP",
            notes: "Includes 3D imaging if required"
          },
          {
            consultationType: "Specialist Consultation",
            amount: 2500,
            currency: "PHP"
          }
        ]
      }
    ],
    languages: ["English", "Tagalog", "Mandarin", "Hokkien"],
    availability: {
      date: "2026-02-14",
      time: "08:30",
      clinicId: "clinic-005",
      clinicName: "Chen Oral Surgery - Alabang"
    },
    faqs: [
      {
        question: "Do I need to remove my wisdom teeth?",
        answer: "Not always. We'll evaluate your wisdom teeth with 3D imaging and only recommend removal if they're impacted, infected, or causing problems."
      },
      {
        question: "What anesthesia options are available?",
        answer: "We offer local anesthesia, conscious sedation, and general anesthesia depending on the procedure and your comfort level."
      },
      {
        question: "How long is recovery after wisdom teeth removal?",
        answer: "Most patients recover within 3-7 days. We provide detailed post-operative instructions and are available 24/7 for emergencies."
      }
    ],
    contact: {
      phone: "+63 921 567 8901",
      email: "dr.chen@chenoralsurgery.ph"
    },
    verified: true,
    featured: true,
    rating: 4.8,
    reviewCount: 174
  },
  {
    id: "dentist-006",
    slug: "dr-ramon-cruz",
    name: "Dr. Ramon Cruz",
    title: "DMD",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
    specialty: "Prosthodontics",
    specialties: ["Prosthodontics", "Cosmetic Dentistry"],
    bio: "Dr. Ramon Cruz is a prosthodontist with 18 years of experience specializing in dental prosthetics, full mouth rehabilitation, and complex cosmetic cases. He is an expert in creating natural-looking crowns, bridges, dentures, and veneers. Dr. Cruz combines artistry with science to restore both function and aesthetics for patients with missing or damaged teeth. His attention to detail and commitment to excellence have made him a sought-after specialist for complex restorative cases.",
    yearsOfExperience: 18,
    education: [
      {
        degree: "Master of Science in Prosthodontics",
        institution: "University of Santo Tomas",
        year: 2008,
        location: "Manila, Philippines"
      },
      {
        degree: "Doctor of Dental Medicine (DMD)",
        institution: "University of the Philippines Manila",
        year: 2004,
        location: "Manila, Philippines"
      }
    ],
    certifications: [
      {
        title: "Diplomate, Philippine Board of Prosthodontics",
        issuingOrganization: "Philippine Board of Prosthodontics",
        year: 2009
      },
      {
        title: "Digital Dentistry Certification",
        issuingOrganization: "American College of Prosthodontists",
        year: 2018
      }
    ],
    affiliations: [
      "Philippine Prosthodontic Society",
      "American College of Prosthodontists",
      "Philippine Dental Association"
    ],
    services: [
      "Dental Crowns and Bridges",
      "Dentures (Full and Partial)",
      "Dental Veneers",
      "Dental Implant Restorations",
      "Full Mouth Reconstruction",
      "Smile Makeovers"
    ],
    clinics: [
      {
        id: "clinic-006",
        name: "Cruz Prosthodontics - Ortigas",
        address: {
          street: "Unit 501, Medical Plaza Ortigas, Ortigas Avenue",
          city: "Pasig",
          province: "Metro Manila",
          postalCode: "1600",
          country: "Philippines"
        },
        contact: {
          phone: "+63 2 8687 3456",
          email: "ortigas@cruzprostho.ph",
          website: "https://cruzprostho.ph"
        },
        schedules: [
          {
            day: "Monday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "12:00" },
              { start: "14:00", end: "18:00" }
            ]
          },
          {
            day: "Tuesday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "12:00" },
              { start: "14:00", end: "18:00" }
            ]
          },
          {
            day: "Wednesday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "12:00" },
              { start: "14:00", end: "18:00" }
            ]
          },
          {
            day: "Thursday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "12:00" },
              { start: "14:00", end: "18:00" }
            ]
          },
          {
            day: "Friday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "12:00" },
              { start: "14:00", end: "17:00" }
            ]
          },
          {
            day: "Saturday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "13:00" }
            ]
          },
          {
            day: "Sunday",
            isOpen: false,
            slots: []
          }
        ],
        fees: [
          {
            consultationType: "Initial Consultation",
            amount: 2200,
            currency: "PHP",
            notes: "Includes comprehensive examination and treatment planning"
          },
          {
            consultationType: "Specialist Consultation",
            amount: 2200,
            currency: "PHP"
          }
        ]
      }
    ],
    languages: ["English", "Tagalog"],
    availability: {
      date: "2026-02-15",
      time: "14:00",
      clinicId: "clinic-006",
      clinicName: "Cruz Prosthodontics - Ortigas"
    },
    faqs: [
      {
        question: "What's the difference between crowns and veneers?",
        answer: "Crowns cover the entire tooth and are used for damaged teeth, while veneers are thin shells bonded to the front of teeth for cosmetic enhancement."
      },
      {
        question: "How long do dental prosthetics last?",
        answer: "With proper care, crowns and bridges can last 10-15 years, veneers 10-20 years, and implant restorations can last a lifetime."
      },
      {
        question: "Do you offer same-day crowns?",
        answer: "Yes, we have CEREC technology for same-day crown fabrication in select cases. Traditional custom crowns take 2-3 weeks."
      }
    ],
    contact: {
      phone: "+63 922 678 9012",
      email: "dr.cruz@cruzprostho.ph"
    },
    verified: true,
    featured: false,
    rating: 4.9,
    reviewCount: 142
  },
  {
    id: "dentist-007",
    slug: "dr-anna-garcia",
    name: "Dr. Anna Garcia",
    title: "DMD",
    photo: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=400&fit=crop",
    specialty: "Pediatric Dentistry",
    specialties: ["Pediatric Dentistry", "Preventive Care"],
    bio: "Dr. Anna Garcia is a pediatric dentist dedicated to providing gentle, child-friendly dental care for infants, children, and adolescents. With 11 years of experience, she specializes in preventive care, early orthodontic intervention, and treating children with special healthcare needs. Dr. Garcia creates a warm, welcoming environment that helps children feel comfortable and builds positive attitudes toward dental health. She is passionate about educating parents and children about proper oral hygiene habits.",
    yearsOfExperience: 11,
    education: [
      {
        degree: "Master of Science in Pediatric Dentistry",
        institution: "University of the Philippines Manila",
        year: 2015,
        location: "Manila, Philippines"
      },
      {
        degree: "Doctor of Dental Medicine (DMD)",
        institution: "Centro Escolar University",
        year: 2011,
        location: "Manila, Philippines"
      }
    ],
    certifications: [
      {
        title: "Diplomate, Philippine Board of Pediatric Dentistry",
        issuingOrganization: "Philippine Board of Pediatric Dentistry",
        year: 2016
      },
      {
        title: "Pediatric Advanced Life Support Certification",
        issuingOrganization: "American Heart Association",
        year: 2017
      }
    ],
    affiliations: [
      "Philippine Academy of Pediatric Dentistry",
      "American Academy of Pediatric Dentistry",
      "Philippine Dental Association"
    ],
    services: [
      "Children's Dental Checkups",
      "Dental Sealants",
      "Fluoride Treatments",
      "Cavity Prevention",
      "Early Orthodontic Assessment",
      "Dental Trauma Care for Children"
    ],
    clinics: [
      {
        id: "clinic-007",
        name: "Garcia Pediatric Dentistry - Greenhills",
        address: {
          street: "Unit 203, Promenade, Greenhills Shopping Center",
          city: "San Juan",
          province: "Metro Manila",
          postalCode: "1502",
          country: "Philippines"
        },
        contact: {
          phone: "+63 2 8721 4567",
          email: "greenhills@garciapediatricdentistry.ph",
          website: "https://garciapediatricdentistry.ph"
        },
        schedules: [
          {
            day: "Monday",
            isOpen: true,
            slots: [
              { start: "10:00", end: "13:00" },
              { start: "14:00", end: "18:00" }
            ]
          },
          {
            day: "Tuesday",
            isOpen: true,
            slots: [
              { start: "10:00", end: "13:00" },
              { start: "14:00", end: "18:00" }
            ]
          },
          {
            day: "Wednesday",
            isOpen: true,
            slots: [
              { start: "10:00", end: "13:00" },
              { start: "14:00", end: "18:00" }
            ]
          },
          {
            day: "Thursday",
            isOpen: true,
            slots: [
              { start: "10:00", end: "13:00" },
              { start: "14:00", end: "18:00" }
            ]
          },
          {
            day: "Friday",
            isOpen: true,
            slots: [
              { start: "10:00", end: "13:00" },
              { start: "14:00", end: "17:00" }
            ]
          },
          {
            day: "Saturday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "14:00" }
            ]
          },
          {
            day: "Sunday",
            isOpen: false,
            slots: []
          }
        ],
        fees: [
          {
            consultationType: "Initial Consultation",
            amount: 1500,
            currency: "PHP",
            notes: "For children ages 0-18"
          },
          {
            consultationType: "General Checkup",
            amount: 1200,
            currency: "PHP"
          }
        ]
      }
    ],
    languages: ["English", "Tagalog"],
    availability: {
      date: "2026-02-10",
      time: "14:00",
      clinicId: "clinic-007",
      clinicName: "Garcia Pediatric Dentistry - Greenhills"
    },
    faqs: [
      {
        question: "When should my child first visit the dentist?",
        answer: "We recommend bringing your child for their first dental visit by age 1 or when their first tooth appears. Early visits help establish good oral health habits."
      },
      {
        question: "How can I help my child feel comfortable at the dentist?",
        answer: "We create a fun, child-friendly environment with games and rewards. You can help by staying positive and explaining that we're here to keep their teeth healthy."
      },
      {
        question: "Do you treat children with special needs?",
        answer: "Yes, we have special training and experience in treating children with special healthcare needs. We work closely with families to provide individualized care."
      }
    ],
    contact: {
      phone: "+63 923 789 0123",
      email: "dr.garcia@garciapediatricdentistry.ph"
    },
    verified: true,
    featured: true,
    rating: 4.9,
    reviewCount: 218
  },
  {
    id: "dentist-008",
    slug: "dr-benjamin-lee",
    name: "Dr. Benjamin Lee",
    title: "DDS",
    photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    specialty: "Cosmetic Dentistry",
    specialties: ["Cosmetic Dentistry", "General Dentistry"],
    bio: "Dr. Benjamin Lee is a cosmetic dentist with 13 years of experience creating beautiful, natural-looking smiles. He combines advanced cosmetic techniques with conservative dentistry principles to enhance smiles while preserving tooth structure. Dr. Lee is skilled in smile design, porcelain veneers, teeth whitening, and full smile makeovers. His artistic eye and meticulous attention to detail have helped hundreds of patients achieve their dream smiles. He stays at the forefront of cosmetic dentistry through continuous education and training.",
    yearsOfExperience: 13,
    education: [
      {
        degree: "Certificate in Aesthetic Dentistry",
        institution: "New York University College of Dentistry",
        year: 2013,
        location: "New York, USA"
      },
      {
        degree: "Doctor of Dental Surgery (DDS)",
        institution: "University of the East Ramon Magsaysay Memorial Medical Center",
        year: 2009,
        location: "Quezon City, Philippines"
      }
    ],
    certifications: [
      {
        title: "Accredited Cosmetic Dentist",
        issuingOrganization: "American Academy of Cosmetic Dentistry",
        year: 2014
      },
      {
        title: "Advanced Smile Design Certification",
        issuingOrganization: "Smile Design International",
        year: 2016
      }
    ],
    affiliations: [
      "American Academy of Cosmetic Dentistry",
      "Philippine Academy of Aesthetic Dentistry",
      "Philippine Dental Association"
    ],
    services: [
      "Porcelain Veneers",
      "Professional Teeth Whitening",
      "Smile Makeovers",
      "Composite Bonding",
      "Gum Contouring",
      "Digital Smile Design"
    ],
    clinics: [
      {
        id: "clinic-008",
        name: "Lee Cosmetic Dentistry - Rockwell",
        address: {
          street: "Ground Floor, Power Plant Mall, Rockwell Drive",
          city: "Makati",
          province: "Metro Manila",
          postalCode: "1210",
          country: "Philippines"
        },
        contact: {
          phone: "+63 2 8898 5678",
          email: "rockwell@leecosmeticdentistry.ph",
          website: "https://leecosmeticdentistry.ph"
        },
        schedules: [
          {
            day: "Monday",
            isOpen: true,
            slots: [
              { start: "10:00", end: "13:00" },
              { start: "15:00", end: "19:00" }
            ]
          },
          {
            day: "Tuesday",
            isOpen: true,
            slots: [
              { start: "10:00", end: "13:00" },
              { start: "15:00", end: "19:00" }
            ]
          },
          {
            day: "Wednesday",
            isOpen: true,
            slots: [
              { start: "10:00", end: "13:00" },
              { start: "15:00", end: "19:00" }
            ]
          },
          {
            day: "Thursday",
            isOpen: true,
            slots: [
              { start: "10:00", end: "13:00" },
              { start: "15:00", end: "19:00" }
            ]
          },
          {
            day: "Friday",
            isOpen: true,
            slots: [
              { start: "10:00", end: "13:00" },
              { start: "15:00", end: "18:00" }
            ]
          },
          {
            day: "Saturday",
            isOpen: true,
            slots: [
              { start: "09:00", end: "15:00" }
            ]
          },
          {
            day: "Sunday",
            isOpen: false,
            slots: []
          }
        ],
        fees: [
          {
            consultationType: "Initial Consultation",
            amount: 2000,
            currency: "PHP",
            notes: "Includes smile analysis and digital mockup"
          },
          {
            consultationType: "Specialist Consultation",
            amount: 2000,
            currency: "PHP"
          }
        ]
      }
    ],
    languages: ["English", "Tagalog", "Mandarin"],
    availability: {
      date: "2026-02-12",
      time: "15:00",
      clinicId: "clinic-008",
      clinicName: "Lee Cosmetic Dentistry - Rockwell"
    },
    faqs: [
      {
        question: "How long do veneers last?",
        answer: "Porcelain veneers typically last 10-20 years with proper care. We'll provide detailed maintenance instructions to help maximize their lifespan."
      },
      {
        question: "Is teeth whitening safe?",
        answer: "Yes, professional teeth whitening is safe when performed by a dentist. We use clinically proven methods that protect your teeth and gums."
      },
      {
        question: "How much does a smile makeover cost?",
        answer: "The cost varies based on your goals and treatment plan. During your consultation, we'll create a customized plan and discuss investment options."
      }
    ],
    contact: {
      phone: "+63 924 890 1234",
      email: "dr.lee@leecosmeticdentistry.ph"
    },
    verified: true,
    featured: true,
    rating: 4.8,
    reviewCount: 195
  }
];
