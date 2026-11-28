export const TICKET_STATUSES = [
    'open',
    'inProgress',
    'closed'
] as const;

export const TICKET_URGENCIES = [
    'low',
    'medium',
    'high'
] as const;

export interface Ticket {
    id: number;
    title: string;
    description: string;
    status: typeof TICKET_STATUSES[number];
    urgency: typeof TICKET_URGENCIES[number];
    createdAt: Date;
}

export type TicketStatus = Ticket['status'];
export type TicketUrgency = Ticket['urgency'];