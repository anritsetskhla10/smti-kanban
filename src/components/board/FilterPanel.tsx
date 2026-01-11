'use client';

import { useEffect, useState } from "react";
import { useInquiryStore } from "@/store/useInquiryStore";
import { useDebounce } from "@/hooks/useDebounce";
import { Search, X, Calendar } from "lucide-react"; 
import { Button } from "@/components/ui/Button";

export const FilterPanel = () => {
  const { filters, setFilters } = useInquiryStore();
  const [searchTerm, setSearchTerm] = useState(filters.searchQuery);
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => { setFilters({ searchQuery: debouncedSearch }); }, [debouncedSearch, setFilters]);
  useEffect(() => { setSearchTerm(filters.searchQuery); }, [filters.searchQuery]);

  const handleClear = () => {
    setSearchTerm('');
    setFilters({ searchQuery: '', minValue: 0, dateRange: { from: null, to: null } });
  };

  // Count active filters
  const activeFilterCount = [
    filters.searchQuery,
    filters.minValue > 0,
    filters.dateRange.from,
    filters.dateRange.to
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col xl:flex-row gap-8 items-start xl:items-center w-full">
      
      {/* Search Bar */}
      <div className="relative w-full xl:max-w-md group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-500 group-focus-within:text-primary transition-colors" />
        </div>
        <input
            type="text"
            placeholder="Search by client name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
        />
      </div>

      {/* Separator */}
      <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden xl:block" />

      {/*  Filters Group */}
      <div className="flex flex-wrap items-center gap-8 w-full xl:w-auto">
        
        {/* Date Range */}
        <div className="flex items-center bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 gap-3 h-[42px]">
             <Calendar className="w-4 h-4 text-gray-500 shrink-0" />
             <div className="flex items-center gap-2">
                <input 
                    type="date" 
                    className="bg-transparent border-none text-xs font-semibold text-gray-700 dark:text-gray-200 focus:ring-0 p-0 w-[95px] outline-none font-mono cursor-pointer placeholder-gray-400"
                    value={filters.dateRange.from || ''}
                    onChange={(e) => setFilters({ dateRange: { ...filters.dateRange, from: e.target.value || null } })}
                />
                <span className="text-gray-400">→</span>
                <input 
                    type="date" 
                    className="bg-transparent border-none text-xs font-semibold text-gray-700 dark:text-gray-200 focus:ring-0 p-0 w-[95px] outline-none font-mono cursor-pointer placeholder-gray-400"
                    value={filters.dateRange.to || ''}
                    onChange={(e) => setFilters({ dateRange: { ...filters.dateRange, to: e.target.value || null } })}
                />
             </div>
        </div>

        {/* Separator */}
              <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden xl:block" />

        {/* Min Value */}
        <div className="flex items-center gap-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 h-[42px] min-w-[180px]">
            <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest shrink-0">Min Value</span>
            
            <div className="flex items-center gap-1 w-full border-l border-gray-200 dark:border-gray-700 pl-3">
                <span className="text-xs font-bold text-gray-400">CHF</span>
                <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={filters.minValue === 0 ? '' : filters.minValue}
                    onChange={(e) => {
                        const val = e.target.value;
                        setFilters({ minValue: val ? Number(val) : 0 });
                    }}
                    className="w-full bg-transparent border-none text-sm font-bold text-gray-900 dark:text-white focus:ring-0 outline-none p-0 placeholder-gray-300"
                />
            </div>
        </div>

        {/* Clear Button & Count */}
        {activeFilterCount > 0 && (
            <div className="flex items-center gap-3 ml-auto xl:ml-0">
                <span className="text-xs font-medium text-gray-500 hidden sm:inline-block">
                    {activeFilterCount} active filters
                </span>
                <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={handleClear} 
                    className="rounded-xl px-4 h-[42px] shadow-sm bg-red-500 hover:bg-red-600 text-white border-none"
                >
                    <X className="w-4 h-4 mr-2" />
                    Clear
                </Button>
            </div>
        )}
      </div>
    </div>
  );
};