'use client';

import { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { useInquiryStore } from '@/store/useInquiryStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Inquiry } from '@/types';
import { generateInquiryId } from '@/lib/utils'; 

interface CreateInquiryModalProps {
  onClose: () => void;
  initialData?: Inquiry | null; 
}

export const CreateInquiryModal = ({ onClose, initialData }: CreateInquiryModalProps) => {
  const { addInquiry, updateInquiry } = useInquiryStore();
  
  const [hotelInput, setHotelInput] = useState('');
  
  // formData initial state
  const [formData, setFormData] = useState<Partial<Inquiry>>({
    clientName: '',
    eventType: '',
    eventDate: '',
    guestCount: 0,
    potentialValue: 0,
    hotels: [],
    notes: '',
  });

  // თუ initialData გვაქვს, ვავსებთ formData-ს
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // add hotel to the list
  const handleAddHotel = () => {
    if (!hotelInput.trim()) return;
    setFormData(prev => ({
      ...prev,
      hotels: [...(prev.hotels || []), hotelInput.trim()]
    }));
    setHotelInput('');
  };

  // delete hotel from the list
  const removeHotel = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      hotels: prev.hotels?.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalHotels = [...(formData.hotels || [])];
    if (hotelInput.trim()) {
        finalHotels.push(hotelInput.trim());
    }

    const payload = {
        ...formData,
        hotels: finalHotels, 
    };
    
    if (initialData) {
      // EDIT LOGIC 
      updateInquiry({
        ...initialData,
        ...payload,
        updatedAt: new Date().toISOString(),
      } as Inquiry);
    } else {
      // CREATE LOGIC 
      const newInquiry: Inquiry = {
        id: generateInquiryId(),
        clientName: payload.clientName || '',
        eventType: payload.eventType || '',
        eventDate: payload.eventDate || new Date().toISOString(),
        guestCount: payload.guestCount || 0,
        potentialValue: payload.potentialValue || 0,
        phase: 'new',
        hotels: payload.hotels || [], 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        notes: payload.notes || '',
      };
      addInquiry(newInquiry);
    }
    onClose();
};

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <Card className="w-full max-w-lg relative p-6 bg-white dark:bg-gray-800 border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold dark:text-white">
                {initialData ? 'Edit Inquiry' : 'Create New Inquiry'}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-5 h-5" />
            </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Client Name" 
            required 
            value={formData.clientName}
            onChange={(e) => setFormData({...formData, clientName: e.target.value})}
            className="dark:bg-gray-700 dark:border-gray-600"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input 
                label="Event Type" 
                placeholder="e.g. Conference" 
                required 
                value={formData.eventType}
                onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                className="dark:bg-gray-700 dark:border-gray-600"
            />
             <Input 
              type="date" 
              label="Event Date" 
              required 
              value={formData.eventDate ? formData.eventDate.toString().split('T')[0] : ''}
              onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
              className="dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              type="number" 
              label="Guests" 
              required 
              min={1}
              value={formData.guestCount === 0 ? '' : formData.guestCount}
              onChange={(e) => setFormData({...formData, guestCount: Number(e.target.value)})}
              className="dark:bg-gray-700 dark:border-gray-600"
            />
            <Input 
              type="number" 
              label="Potential Value (CHF)" 
              required 
              min={0}
              value={formData.potentialValue === 0 ? '' : formData.potentialValue}
              onChange={(e) => setFormData({...formData, potentialValue: Number(e.target.value)})}
              className="dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          {/* Hotels Input Section */}
          <div className="space-y-2">
             <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Hotels</label>
             <div className="flex gap-2">
                <Input 
                    placeholder="Type hotel name & press Enter..."
                    value={hotelInput}
                    onChange={(e) => setHotelInput(e.target.value)}
                    onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleAddHotel(); }}}
                    className="dark:bg-gray-700 dark:border-gray-600"
                />
                <Button type="button" onClick={handleAddHotel} variant="secondary">
                    <Plus className="w-4 h-4" />
                </Button>
             </div>
             
             {/* Tag List */}
             <div className="flex flex-wrap gap-2 mt-2">
                {formData.hotels?.map((hotel, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs border border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 animate-in fade-in zoom-in duration-200">
                        {hotel}
                        <button type="button" onClick={() => removeHotel(idx)} className="hover:text-blue-900 dark:hover:text-blue-100">
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}
             </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Notes</label>
            <textarea
                className="flex w-full rounded-main border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px]"
                placeholder="Add any additional details..."
                value={formData.notes || ''}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>
          
          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="px-6">
                {initialData ? 'Save Changes' : 'Create Inquiry'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};