'use client';

import { useInquiryStore } from "@/store/useInquiryStore";
import { KanbanColumn } from "./KanbanColumn";
import { InquiryPhase } from "@/types";
import { DndContext } from "./DndContext";
import { DropResult } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/Button";

const COLUMNS: { id: InquiryPhase; title: string }[] = [
  { id: "new", title: "New Inquiry" },
  { id: "sent_to_hotels", title: "Sent to Hotels" },
  { id: "offers_received", title: "Offers Received" },
  { id: "completed", title: "Completed" },
];

interface KanbanBoardProps {
  onCardClick: (id: string) => void;
}

export const KanbanBoard = ({ onCardClick }: KanbanBoardProps) => {
  const { inquiries, isLoading, error, updatePhase, filters } = useInquiryStore();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newPhase = destination.droppableId as InquiryPhase;
    updatePhase(draggableId, newPhase);
  };

 const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch = inq.clientName.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesValue = inq.potentialValue >= filters.minValue;
    
    let matchesDate = true;
    if (filters.dateRange.from || filters.dateRange.to) {
        const inquiryDate = inq.eventDate.split('T')[0]; 
        
        if (filters.dateRange.from) {
            matchesDate = matchesDate && inquiryDate >= filters.dateRange.from;
        }
        if (filters.dateRange.to) {
            matchesDate = matchesDate && inquiryDate <= filters.dateRange.to;
        }
    }
    
    return matchesSearch && matchesValue && matchesDate;
  });

  if (isLoading) {
    return (
       <div className="flex h-full gap-4 overflow-hidden px-layout pb-4">
         {[1, 2, 3, 4].map((i) => (
           <div key={i} className="min-w-[300px] w-full md:w-[350px] bg-bg-card/50 rounded-main h-full animate-pulse border border-border" />
         ))}
       </div>
    );
  }

  if (error) {
     return (
        <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">Retry</Button>
        </div>
     );
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="flex h-full gap-4 overflow-x-auto px-layout pb-4 items-start justify-start 2xl:justify-center snap-x snap-mandatory md:snap-none scrollbar-thin scrollbar-thumb-bg-input scrollbar-track-transparent">
        {COLUMNS.map((col) => {
          const columnInquiries = filteredInquiries.filter(
            (inq) => inq.phase === col.id
          );

          return (
            <div key={col.id} className="h-full snap-center shrink-0">
              <KanbanColumn
                id={col.id}
                title={col.title}
                inquiries={columnInquiries}
                onCardClick={onCardClick}
              />
            </div>
          );
        })}
      </div>
    </DndContext>
  );
};