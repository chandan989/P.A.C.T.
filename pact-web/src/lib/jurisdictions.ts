// Comprehensive list of 50+ jurisdictions for compliance management

export const JURISDICTIONS = [
  // US States (50)
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina',
  'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
  // US Territories (5)
  'American Samoa', 'Guam', 'Northern Mariana Islands', 'Puerto Rico', 'US Virgin Islands',
  // District
  'District of Columbia',
  // International (Major jurisdictions)
  'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Singapore', 'Hong Kong', 'Switzerland',
  'Netherlands', 'Ireland', 'Luxembourg', 'Bermuda', 'Cayman Islands', 'British Virgin Islands',
];

export const DOCUMENT_TYPES = [
  'Employment Contract', 'NDA', 'Corporate', 'Service Agreement', 'M&A Agreement', 'Licensing Agreement',
  'Partnership Agreement', 'Franchise Agreement', 'Real Estate Contract', 'IP License', 'Software License',
  'Privacy Policy', 'Terms of Service', 'Vendor Agreement', 'Consulting Agreement'
];

export interface JurisdictionRequirement {
  jurisdiction: string;
  documentType: string;
  requirements: string[];
  mandatoryClauses: string[];
  lastUpdated: string;
}

// Generate default requirements for all jurisdictions and document types
export function generateDefaultRequirements(): JurisdictionRequirement[] {
  const requirements: JurisdictionRequirement[] = [];
  
  // Generate basic requirements for each jurisdiction/document type combination
  // This is a template - in production, these would be more specific
  JURISDICTIONS.forEach(jurisdiction => {
    DOCUMENT_TYPES.forEach(docType => {
      const baseRequirements = [
        `${jurisdiction} law compliance`,
        'Proper jurisdiction clause',
        'Dispute resolution mechanism',
      ];
      
      const baseClauses = [
        `${jurisdiction} governing law`,
        'Jurisdiction and venue',
      ];
      
      // Add jurisdiction-specific requirements
      if (jurisdiction === 'California') {
        baseRequirements.push('California Consumer Privacy Act (CCPA) compliance');
        baseClauses.push('At-will employment statement');
      } else if (jurisdiction === 'Delaware') {
        baseRequirements.push('Delaware General Corporation Law compliance');
        baseClauses.push('Corporate governance structure');
      } else if (jurisdiction === 'New York') {
        baseRequirements.push('NY state employment law compliance');
        baseClauses.push('NY jurisdiction clause');
      } else if (jurisdiction === 'United Kingdom') {
        baseRequirements.push('UK GDPR compliance', 'UK Companies Act compliance');
        baseClauses.push('UK governing law');
      } else if (jurisdiction === 'Singapore') {
        baseRequirements.push('Singapore Companies Act compliance', 'PDPA compliance');
        baseClauses.push('Singapore jurisdiction');
      }
      
      requirements.push({
        jurisdiction,
        documentType: docType,
        requirements: baseRequirements,
        mandatoryClauses: baseClauses,
        lastUpdated: new Date().toISOString(),
      });
    });
  });
  
  return requirements;
}

