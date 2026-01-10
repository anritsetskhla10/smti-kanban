// phase types
export type InquiryPhase = 'new' | 'sent_to_hotels' | 'offers_received' | 'completed';

// inquiry interface
export interface Inquiry {
  id: string;
  clientName: string;
  contactPerson?: string; 
  eventType: string; 
  eventDate: string; 
  guestCount: number;
  potentialValue: number;
  phase: InquiryPhase;
  hotels: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// filters interface
export interface InquiryFilters {
  searchQuery: string; 
  dateRange: {
    from: string | null;
    to: string | null;
  };
  minValue: number; 
}