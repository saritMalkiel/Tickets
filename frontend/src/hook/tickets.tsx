import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTicket, getTickets, postTickets, updateTicketStatus } from "../api/tickets";
import type { TicketStatus, TicketUrgency } from "../model/ticket";

export const useTickets = (status?: TicketStatus, urgency?: TicketUrgency) => {
    return useQuery({
        queryKey: ['tickets', status, urgency],
        queryFn: () => getTickets(status, urgency),
        staleTime: 1000 * 60 * 5,
    });
};
export const useCreateTicket = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: postTickets,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tickets'] });
        },
        onError: (error) => {
            console.error('Failed to create the ticket:', error);
        }
    });
};
export const useUpdateTicket = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTicketStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tickets'] });
        },
        onError: (error) => {
            console.error('Failed to update the status:', error);
        }
    });
};
export const useDeleteTicket = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTicket,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tickets'] });
        },
        onError: (error) => {
            console.error('Failed to delete the ticket:', error);
        }
    });
};