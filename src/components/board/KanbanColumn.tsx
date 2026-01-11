import { Inquiry, InquiryPhase } from "@/types";
import { InquiryCard } from "./InquiryCard";
import { Droppable } from "@hello-pangea/dnd";
import { Badge } from "@/components/ui/Badge";
import { useMemo, useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { MoreHorizontal, ArrowDownWideNarrow, CalendarDays } from "lucide-react"; 

interface KanbanColumnProps {
  id: InquiryPhase;
  title: string;
  inquiries: Inquiry[];
  onCardClick: (id: string) => void;
}

type SortOption = 'default' | 'value_desc' | 'date_newest';

export const KanbanColumn = ({ id, title, inquiries, onCardClick }: KanbanColumnProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalValue = useMemo(() => 
    inquiries.reduce((sum, item) => sum + item.potentialValue, 0), 
  [inquiries]);

  const formattedTotal = new Intl.NumberFormat("en", {
    notation: "compact",
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 1
  }).format(totalValue);

  // Sorted inquiries based on sortBy state
  const sortedInquiries = useMemo(() => {
    if (sortBy === 'default') return inquiries;
    
    return [...inquiries].sort((a, b) => {
        if (sortBy === 'value_desc') return b.potentialValue - a.potentialValue;
        if (sortBy === 'date_newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0;
    });
  }, [inquiries, sortBy]);

  return (
    <div className="flex flex-col h-full min-w-[300px] w-[85vw] md:w-[350px] bg-gray-50/50 dark:bg-gray-800/20 rounded-2xl p-3 border border-gray-400/40 dark:border-gray-700/50">
      
      {/* Header */}
      <div className="relative flex items-center justify-between px-1 py-2 mb-3 shrink-0">
         <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-tight">{title}</h2>
            <Badge variant="neutral" className="bg-white dark:bg-gray-700 shadow-sm font-mono">{inquiries.length}</Badge>
         </div>
         
         <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-500 bg-gray-200/50 px-2 py-1 rounded-full dark:text-gray-400 dark:bg-gray-700">
                {formattedTotal}
            </span>
            
            {/* Menu Button */}
            <div className="relative" ref={menuRef}>
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={twMerge(
                        "p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-200/50 transition-colors",
                        isMenuOpen && "text-gray-700 bg-gray-200/50"
                    )}
                >
                    <MoreHorizontal className="w-5 h-5" />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                        <div className="p-1">
                            <button 
                                onClick={() => { setSortBy('value_desc'); setIsMenuOpen(false); }}
                                className={twMerge(
                                    "flex items-center gap-2 w-full px-3 py-2 text-xs font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left",
                                    sortBy === 'value_desc' ? "text-primary bg-blue-50/50" : "text-gray-600"
                                )}
                            >
                                <ArrowDownWideNarrow className="w-3.5 h-3.5" />
                                Sort by Value (High-Low)
                            </button>
                            <button 
                                onClick={() => { setSortBy('date_newest'); setIsMenuOpen(false); }}
                                className={twMerge(
                                    "flex items-center gap-2 w-full px-3 py-2 text-xs font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left",
                                    sortBy === 'date_newest' ? "text-primary bg-blue-50/50" : "text-gray-600"
                                )}
                            >
                                <CalendarDays className="w-3.5 h-3.5" />
                                Sort by Date (Newest)
                            </button>
                        </div>
                        {sortBy !== 'default' && (
                            <div className="border-t border-gray-100 dark:border-gray-700 p-1 bg-gray-50/50">
                                <button 
                                    onClick={() => { setSortBy('default'); setIsMenuOpen(false); }}
                                    className="w-full px-3 py-1.5 text-[10px] font-bold text-red-500 hover:bg-red-50 rounded text-center uppercase tracking-wide"
                                >
                                    Reset Sorting
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
         </div>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={twMerge(
                "flex-1 flex flex-col gap-3 min-h-0 overflow-y-auto custom-scrollbar transition-colors rounded-xl pr-2",
                snapshot.isDraggingOver ? "bg-primary/5 ring-2 ring-primary/20 ring-inset" : ""
            )}
          >
            {sortedInquiries.map((inquiry, index) => (
              <InquiryCard
                key={inquiry.id}
                inquiry={inquiry}
                index={index}
                onClick={onCardClick}
              />
            ))}
            {provided.placeholder}
            
            {inquiries.length === 0 && !snapshot.isDraggingOver && (
                <div className="flex flex-col items-center justify-center h-full max-h-40 text-gray-300 dark:text-gray-600 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl m-1">
                    <p className="text-xs font-medium">No items</p>
                </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};