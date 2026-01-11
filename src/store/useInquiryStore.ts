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
        set({ isLoading: true, error: null });
        try {
          const { filters } = get();
          
          // URL პარამეტრები
          const params = new URLSearchParams();
          if (filters.searchQuery) params.append('search', filters.searchQuery);
          if (filters.minValue > 0) params.append('min', filters.minValue.toString());
          if (filters.dateRange.from) params.append('from', filters.dateRange.from);
          if (filters.dateRange.to) params.append('to', filters.dateRange.to);

          const res = await fetch(`/api/inquiries?${params.toString()}`);
          if (!res.ok) throw new Error('Failed to fetch inquiries');
          
          const data = await res.json();
          
          // Mock მონაცემების დაცვა
          if (get().inquiries.length === 0) {
             set({ inquiries: data, isLoading: false });
          } else {
             set({ isLoading: false });
          }
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