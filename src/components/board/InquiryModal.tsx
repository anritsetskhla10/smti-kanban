'use client';

import { useState } from 'react';
import { useInquiryStore } from "@/store/useInquiryStore";
import { X, Calendar, Users, Building2, AlignLeft, Clock, Banknote, Pencil } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { InquiryPhase } from '@/types';
import { CreateInquiryModal } from './CreateInquiryModal';

interface InquiryModalProps {
  inquiryId: string;
  onClose: () => void;
}

export const InquiryModal = ({ inquiryId, onClose }: InquiryModalProps) => {
  const { inquiries, updatePhase } = useInquiryStore();
  const inquiry = inquiries.find((i) => i.id === inquiryId);
  
  // State to manage Edit Modal visibility
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (!inquiry) return null;

  const formattedValue = new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  }).format(inquiry.potentialValue);

  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <Card className="relative w-full max-w-2xl max-h-[90vh] flex flex-col p-0 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 border-none bg-white dark:bg-gray-800">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30 flex justify-between items-start">
          <div className="flex items-center gap-4">
             <Avatar name={inquiry.clientName} className="h-12 w-12 text-sm" />
             <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{inquiry.clientName}</h2>
                <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{inquiry.eventType}</Badge>
                    <span className="text-xs text-gray-500">{inquiry.id}</span>
                </div>
             </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* EDIT Button */}
            <Button variant="secondary" size="sm" onClick={() => setIsEditOpen(true)}>
                <Pencil className="w-4 h-4 mr-2" />
                Edit
            </Button>
            
            <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-8">
          
          {/* Key Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-main border border-blue-100 dark:border-blue-800">
                 <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase">Date</span>
                 </div>
                 <p className="font-medium text-gray-900 dark:text-white">{new Date(inquiry.eventDate).toLocaleDateString()}</p>
             </div>
             
             <div className="p-3 bg-purple-50/50 dark:bg-purple-900/20 rounded-main border border-purple-100 dark:border-purple-800">
                 <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase">Guests</span>
                 </div>
                 <p className="font-medium text-gray-900 dark:text-white">{inquiry.guestCount}</p>
             </div>

             <div className="p-3 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-main border border-emerald-100 dark:border-emerald-800">
                 <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                    <Banknote className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase">Value</span>
                 </div>
                 <p className="font-medium text-gray-900 dark:text-white">{formattedValue}</p>
             </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-main border border-gray-100 dark:border-gray-700">
            <Select 
              label="Current Phase"
              value={inquiry.phase}
              onChange={(e) => updatePhase(inquiry.id, e.target.value as InquiryPhase)}
              className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="new">New Inquiry</option>
              <option value="sent_to_hotels">Sent to Hotels</option>
              <option value="offers_received">Offers Received</option>
              <option value="completed">Completed</option>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <h3 className="font-bold text-xs uppercase tracking-wider text-gray-500">Hotels</h3>
                </div>
                {inquiry.hotels && inquiry.hotels.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {inquiry.hotels.map((hotel, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">
                        {hotel}
                    </span>
                    ))}
                </div>
                ) : (
                <p className="text-sm text-gray-400 italic">No hotels selected.</p>
                )}
            </div>

            <div>
                <div className="flex items-center gap-2 mb-3">
                    <AlignLeft className="w-4 h-4 text-gray-500" />
                    <h3 className="font-bold text-xs uppercase tracking-wider text-gray-500">Notes</h3>
                </div>
                <div className="p-3 bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-main text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap min-h-[100px]">
                {inquiry.notes || "No notes available."}
                </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Created: {new Date(inquiry.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Updated: {formatDistanceToNow(new Date(inquiry.updatedAt))} ago</span>
            </div>
          </div>
        </div>
      </Card>
    </div>

    {/* EDIT MODAL CALL */}
    {isEditOpen && (
        <CreateInquiryModal 
            initialData={inquiry} 
            onClose={() => setIsEditOpen(false)} 
        />
    )}
    </>
  );
};