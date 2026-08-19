export type HazardSeverity = 'P0_CRITICAL' | 'P1_MODERATE' | 'P2_ADVISORY' | 'RESOLVED' | 'UNDER_REVIEW';

export type HazardCategory = 
  | 'FOREIGN_OBJECT'
  | 'FOOD_POISONING'
  | 'SPOILED_MOLD'
  | 'EXPIRED_PRODUCT'
  | 'CHEMICAL_ADULTERANT'
  | 'VEG_NONVEG_CONTAMINATION'
  | 'PEST_RODENT'
  | 'PDS_ADULTERATION'
  | 'UNHYGIENIC_KITCHEN'
  | 'WATER_QUALITY';

export type OutletCategory = 
  | 'Restaurant / Café'
  | 'Cloud Kitchen'
  | 'Street Vendor / Stall'
  | 'Packaged Food'
  | 'PDS / Ration Shop'
  | 'Sweet Shop / Mithai'
  | 'Temple Kitchen'
  | 'Other';

export type MerchantResponse = 
  | 'Haven\'t told them yet'
  | 'They replaced / refunded'
  | 'Acknowledged but didn\'t fix'
  | 'They denied the problem'
  | 'They ignored me';

export type RequestedAction = 
  | 'Public awareness only'
  | 'FSO inspection'
  | 'Formal FSSAI complaint';

export type ModerationStatus = 'APPROVED' | 'PENDING' | 'REJECTED';

export type FSOStatus = 
  | 'Pending Review'
  | 'Under FSO Review'
  | 'FSO Inspection Scheduled'
  | 'Inspected & Action Taken';

export interface Incident {
  incident_id: string;
  timestamp: string;
  city: string;
  state: string;
  ward: string;
  lat: number;
  lng: number;
  fbo_name: string;
  fbo_slug: string;
  fssai_license: string;
  fssai_verified: boolean;
  category: OutletCategory;
  hazard_primary: HazardCategory;
  hazard_severity: HazardSeverity;
  user_description: string;
  evidence_url: string;
  phash_flags: string[];
  merchant_response: MerchantResponse;
  refund_received: boolean;
  action_requested: RequestedAction;
  moderation_status: ModerationStatus;
  auto_approved: boolean;
  cluster_id?: string;
  fso_status: FSOStatus;
  upvotes: number;
  ddo_email?: string;
}

export interface FBOProfile {
  fssai_license: string;
  establishment_name: string;
  slug: string;
  category: OutletCategory;
  city: string;
  address: string;
  lat: number;
  lng: number;
  safety_score: 'LOW_RISK' | 'MODERATE' | 'HIGH_RISK' | 'UNDER_REVIEW';
  total_reports: number;
  p0_count: number;
  merchant_resolution_rate: number;
  fso_actions_count: number;
  last_report_date: string;
}

export interface DispatchEvent {
  dispatch_id: string;
  cluster_id: string;
  fbo_name: string;
  fssai_license: string;
  city: string;
  ddo_email: string;
  report_count: number;
  p0_count: number;
  triggered_at: string;
  status: 'SENT' | 'ACKNOWLEDGED' | 'INSPECTED';
  fso_response_date?: string;
}

export interface AdminUser {
  email: string;
  role: 'Super Admin' | 'District Food Safety Officer' | 'Moderator';
  token: string;
}
