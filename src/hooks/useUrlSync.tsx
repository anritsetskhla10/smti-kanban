'use client';

import { useEffect, Suspense } from 'react';
import { useInquiryStore } from '@/store/useInquiryStore';
import { useRouter, useSearchParams } from 'next/navigation';

// this hook syncs the inquiry filters with the URL query parameters
function UrlSyncLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filters, setFilters } = useInquiryStore();

  // initial load: read from URL -> set filters
  useEffect(() => {
    const search = searchParams.get('search');
    const min = searchParams.get('min');
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    // check if any filter exists in URL
    if (search || min || from || to) {
      setFilters({
        searchQuery: search || '',
        minValue: min ? Number(min) : 0,
        dateRange: {
          from: from || null,
          to: to || null
        }
      });
    }
  }, [searchParams, setFilters]); 

  // Synchronization: when filters change -> update URL
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.searchQuery) params.set('search', filters.searchQuery);
    if (filters.minValue > 0) params.set('min', filters.minValue.toString());
    if (filters.dateRange.from) params.set('from', filters.dateRange.from);
    if (filters.dateRange.to) params.set('to', filters.dateRange.to);

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [filters, router]);

  return null;
}

export const UrlSync = () => {
  return (
    <Suspense fallback={null}>
      <UrlSyncLogic />
    </Suspense>
  );
};