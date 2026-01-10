import { create } from 'zustand';
import { persist } from 'zustand/middleware'; 
import { Inquiry, InquiryPhase, InquiryFilters } from '@/types';

interface InquiryState {
  inquiries: Inquiry[];
  filters: InquiryFilters;
  isLoading: boolean;
  error: string | null;
  
  fetchInquiries: () => Promise<void>;
  updatePhase: (id: string, newPhase: InquiryPhase) => Promise<void>;
  setFilters: (filters: Partial<InquiryFilters>) => void;
  addInquiry: (inquiry: Inquiry) => Promise<void>;
  updateInquiry: (inquiry: Inquiry) => Promise<void>;
}

export const useInquiryStore = create<InquiryState>()(
  persist(
    (set, get) => ({
      inquiries: [],
      isLoading: false,
      error: null,
      filters: {
        searchQuery: '',
        dateRange: { from: null, to: null },
        minValue: 0,
      },

      //  GET 
      fetchInquiries: async () => {
        if (get().inquiries.length > 0) return;

        set({ isLoading: true, error: null });
        try {
          const res = await fetch('/api/inquiries');
          if (!res.ok) throw new Error('Failed to fetch inquiries');
          const data = await res.json();
          set({ inquiries: data, isLoading: false });
        } catch (err) {
          console.error(err);
          set({ error: 'Failed to load inquiries', isLoading: false });
        }
      },

      //  UPDATE PHASE
      updatePhase: async (id, newPhase) => {
        set((state) => ({
          inquiries: state.inquiries.map((inq) => 
            inq.id === id ? { ...inq, phase: newPhase, updatedAt: new Date().toISOString() } : inq
          )
        }));
        // API Call
        try {
          await fetch(`/api/inquiries/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ phase: newPhase }),
          });
        } catch (e) { console.error(e); }
      },

      //  SET FILTERS
      setFilters: (newFilters) => {
        set((state) => ({ filters: { ...state.filters, ...newFilters } }));
      },

      // ADD (Create)
      addInquiry: async (inquiryData) => {
        set((state) => ({ inquiries: [inquiryData, ...state.inquiries] }));
        try {
            await fetch('/api/inquiries', {
                method: 'POST',
                body: JSON.stringify(inquiryData),
            });
        } catch (e) { console.error(e); }
      },

      //  UPDATE (Edit)
      updateInquiry: async (updatedInquiry) => {
        set((state) => ({
          inquiries: state.inquiries.map((inq) => 
            inq.id === updatedInquiry.id ? updatedInquiry : inq
          )
        }));
        // API Call
        try {
           await fetch(`/api/inquiries/${updatedInquiry.id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedInquiry),
          });
        } catch (e) { console.error(e); }
      }
    }),
    {
      name: 'inquiry-storage',
      partialize: (state) => ({ inquiries: state.inquiries }), 
    }
  )
);