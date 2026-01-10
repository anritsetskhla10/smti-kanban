import { Inquiry } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Users, Calendar, Banknote, GripVertical } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { twMerge } from "tailwind-merge";

interface InquiryCardProps {
  inquiry: Inquiry;
  index: number;
  onClick: (id: string) => void;
}

export const InquiryCard = ({ inquiry, index, onClick }: InquiryCardProps) => {
  const formattedValue = new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  }).format(inquiry.potentialValue);

  const isHighValue = inquiry.potentialValue > 50000;

  return (
    <Draggable draggableId={inquiry.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
          onClick={() => onClick(inquiry.id)}
          className="group outline-none my-2 px-1"
        >
          <Card 
            className={twMerge(
              "flex flex-col gap-3 cursor-grab active:cursor-grabbing relative overflow-hidden",
              "transform transition-all duration-200 ease-in-out",
              "hover:-translate-y-1 hover:shadow-lg hover:border-primary/40",
              isHighValue ? "border-l-[3px] border-l-amber-400 dark:border-l-amber-500" : "border-l-[3px] border-l-transparent",
              snapshot.isDragging && "rotate-2 scale-105 shadow-2xl ring-2 ring-primary z-50 opacity-90"
            )}
          >
             {/* Grip Icon */}
             <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-text-muted z-20">
                <GripVertical className="w-4 h-4" />
             </div>

             {/* High Value Glow Effect */}
             {isHighValue && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 blur-2xl -mr-10 -mt-10 pointer-events-none z-0" />
             )}

            {/* Header*/}
            <div className="flex justify-between items-start gap-2 relative z-10 pr-4">
              <div className="flex items-center gap-3">
                  <Avatar name={inquiry.clientName} className="ring-2 ring-bg-card transition-transform group-hover:scale-110" />
                  <div className="flex flex-col min-w-0">
                      <h3 className="font-bold text-text-main truncate text-sm group-hover:text-primary transition-colors">
                          {inquiry.clientName}
                      </h3>
                      <span className="text-[10px] text-text-muted truncate uppercase tracking-wider font-semibold">{inquiry.eventType}</span>
                  </div>
              </div>
              
              {/* Badge */}
              {isHighValue && (
                 <Badge variant="warning" className="shrink-0 text-[9px] py-0.5">High Value</Badge>
              )}
            </div>

            {/* Stats Pills */}
            <div className="flex gap-2 text-xs text-text-muted mt-1 relative z-10">
              <div className="flex items-center gap-1.5 bg-bg-input/50 px-2 py-1 rounded-md border border-transparent group-hover:border-border transition-colors">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="font-medium">{new Date(inquiry.eventDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-bg-input/50 px-2 py-1 rounded-md border border-transparent group-hover:border-border transition-colors">
                  <Users className="w-3.5 h-3.5" />
                  <span className="font-medium">{inquiry.guestCount}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-border/50 mt-1 relative z-10">
              <div className={twMerge("flex items-center gap-1.5 font-bold text-sm", isHighValue ? "text-amber-600 dark:text-amber-400" : "text-text-main")}>
                  <Banknote className="w-4 h-4" />
                  <span>{formattedValue}</span>
              </div>
              
              <span className="text-[10px] text-text-muted font-medium">
                {formatDistanceToNow(new Date(inquiry.updatedAt))} ago
              </span>
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
};