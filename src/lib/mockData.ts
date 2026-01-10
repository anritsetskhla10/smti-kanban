import { Inquiry } from '@/types';

export const INITIAL_INQUIRIES: Inquiry[] = [
    {
        id: "INQ-2026-0033",
        clientName: "GlaxoSmithKline",
        eventType: "Product Launch",
        eventDate: "2026-05-05",
        guestCount: 200,
        potentialValue:50000,
        phase: "sent_to_hotels",
        hotels: ["Hotel Eden Roc", "Baur au Lac"],
        createdAt: "2026-01-09T11:15:00Z",
        updatedAt: "2026-01-10T16:45:00Z"
    },
    {
        id: "INQ-2026-0034",
        clientName: "Novartis AG",
        contactPerson: "Anna Mueller",
        eventType: "Conference",
        eventDate: "2026-03-15",
        guestCount: 120,
        potentialValue: 48500,
        phase: "offers_received",
        hotels: ["Grand Hotel Zurich", "Hotel Schweizerhof"],
        notes: "Client prefers city center location",
        createdAt: "2026-01-10T09:00:00Z",
        updatedAt: "2026-01-12T14:30:00Z"
    },
    {
        id: "INQ-2026-0035",
        clientName: "Roche",
        eventType: "Team Building",
        eventDate: "2026-04-20",
        guestCount: 50,
        potentialValue: 60000, 
        phase: "new",
        hotels: [],
        createdAt: "2026-01-11T10:00:00Z",
        updatedAt: "2026-01-11T10:00:00Z"
    },
    {
        id: "INQ-2026-0036",
        clientName: "Credit Suisse",
        contactPerson: "Markus Steiner",
        eventType: "Annual Meeting",
        eventDate: "2026-06-10",
        guestCount: 300,
        potentialValue: 120000,
        phase: "completed",
        hotels: ["Dolder Grand", "Baur au Lac"],
        notes: "Require AV equipment and catering",
        createdAt: "2026-01-12T08:30:00Z",
        updatedAt: "2026-01-20T12:00:00Z"
    }
];