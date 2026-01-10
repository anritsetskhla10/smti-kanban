'use client';

import { useEffect, useState } from 'react';
import { useInquiryStore } from '@/store/useInquiryStore';
import { KanbanBoard } from '@/components/board/KanbanBoard';
import { InquiryModal } from '@/components/board/InquiryModal';
import { CreateInquiryModal } from '@/components/board/CreateInquiryModal'; 
import { FilterPanel } from '@/components/board/FilterPanel';
import { Header } from '@/components/layout/Header'; 
import { UrlSync } from '@/hooks/useUrlSync';

export default function Home() {
  const { fetchInquiries } = useInquiryStore();
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); 

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  return (
    <main className="h-screen flex flex-col bg-gray-50/50 dark:bg-gray-900 overflow-hidden font-sans text-text-main">
      <UrlSync />
      
      {/* Top Section Container */}
      <div className="px-6 pt-6 pb-2 shrink-0 z-30">
        <div className="max-w-[1920px] mx-auto">
            <Header onNewInquiry={() => setIsCreateModalOpen(true)} />

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/60 dark:border-gray-700 p-1 shadow-sm mb-2">
                <FilterPanel />
            </div>
        </div>
      </div>

      {/* Main Board Area */}
      <div className="flex-1 overflow-hidden px-2 pb-2">
        <KanbanBoard onCardClick={setSelectedInquiryId} />
      </div>

      {/* Modals */}
      {selectedInquiryId && (
        <InquiryModal 
          inquiryId={selectedInquiryId} 
          onClose={() => setSelectedInquiryId(null)} 
        />
      )}
      
      {isCreateModalOpen && (
        <CreateInquiryModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </main>
  );
}