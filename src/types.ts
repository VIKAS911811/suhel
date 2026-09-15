export type CompanyId = 'sr-group' | 'sr-infra' | 'suhel-engineering' | 'sr-power-solution';

export interface DepartmentEmail {
  department: string;
  email: string;
  desc: string;
  badge?: string;
}

export interface CompanyProfile {
  id: CompanyId;
  name: string;
  tagline: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  accentColor: string; // e.g. '#f97316' or '#0284c7' or '#e11d48'
  badge: string;
  services: string[];
  keyHighlights: string[];
  heroImage: string;
  primaryPhone: string;
  secondaryPhone?: string;
  primaryEmail: string;
  secondaryEmail?: string;
  projectEmail?: string;
  accountEmail?: string;
  billingEmail?: string;
  purchaseEmail?: string;
  departmentEmails?: DepartmentEmail[];
  website?: string;
  gstin?: string;
  vendorCode?: string;
  officeLocation: string;
  overview: string;
}

export interface DetailedServiceItem {
  id: string;
  slug: string;
  title: string;
  companyId: CompanyId;
  category: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  iconName: string;
  scope: string[];
  keyHighlights: string[];
  specs?: { label: string; value: string }[];
}

export interface ServiceCategory {
  id: string;
  slug: string;
  title: string;
  companyId: CompanyId;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  heroImage: string;
  items: string[];
  processSteps?: {
    step: string;
    title: string;
    desc: string;
  }[];
  specifications?: {
    label: string;
    value: string;
  }[];
}

export interface IndustrySector {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  gallery?: string[];
  relevantCompanies: CompanyId[];
  keyServices: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  companyId: CompanyId;
  companyName: string;
  industry: string;
  location: string;
  scopeOfWork: string;
  completionStatus: 'Completed' | 'Ongoing' | 'Turnkey';
  image: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'FABRICATION' | 'ERECTION' | 'PIPELINE' | 'POWER' | 'PLANT' | 'SAFETY';
  companyId: CompanyId;
  image: string;
  caption: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  desc: string;
  icon: string;
}

export interface QualitySafetyCard {
  title: 'QUALITY' | 'SAFETY' | 'ENVIRONMENT';
  subtitle: string;
  points: string[];
  icon: string;
  image: string;
}

export interface WhyChooseItem {
  title: string;
  desc: string;
  icon: string;
}

export interface QuoteFormData {
  targetCompany: CompanyId;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  industry: string;
  serviceRequired: string;
  projectLocation: string;
  estimatedSize: string;
  message: string;
  fileName?: string;
}

export interface ContactFormData {
  companyContext: CompanyId;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

export interface CareerFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  message: string;
  fileName?: string;
}

export type CompanyCategory =
  | 'All'
  | 'Power'
  | 'Steel'
  | 'Manufacturing'
  | 'Infrastructure'
  | 'Oil & Gas'
  | 'Chemical'
  | 'Refinery'
  | 'Engineering'
  | 'Construction'
  | 'Other';

export interface CompanyProject {
  projectName: string;
  scopeOfWork?: string;
  year?: string;
  location?: string;
}

export interface WorkedWithCompany {
  id: string;
  company_name: string;
  logo_url?: string;
  industry: string;
  category: CompanyCategory;
  project_name?: string;
  scope_of_work?: string;
  location?: string;
  year?: string;
  description?: string;
  display_order: number;
  status: 'active' | 'inactive';
  projects?: CompanyProject[];
  created_at: string;
  updated_at: string;
}
