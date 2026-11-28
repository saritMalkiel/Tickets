import axios from "./api";
import type { Ticket, TicketStatus, TicketUrgency } from "../model/ticket";
export type CreateTicketDto = Pick<Ticket, 'title' | 'description' | 'urgency'>;

export const getTickets = async (status?: TicketStatus, urgency?: TicketUrgency) => {
    const response = await axios.get<Ticket[]>(`tickets`, {
        params: {
            status,
            urgency
        }
    });
    return response.data;
}
export const postTickets = async (ticket: CreateTicketDto) => {
    const response = await axios.post<Ticket>(`tickets`, ticket);
    return response.data;
}
export const updateTicketStatus = async ({ id, status }: { id: number; status: TicketStatus }) => {
   await axios.patch(`tickets/${id}/status`, { status });
}
export const deleteTicket = async (id: number) => {
    const response = await axios.delete(`tickets/${id}`);
    return response.data;
}

