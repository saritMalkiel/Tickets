using Tickets.Core.DTOs;
using Tickets.Core.Entities;

namespace Tickets.Core.Mappers;

public static class TicketMapper
{
    public static Ticket ToEntity(this CreateTicketDto dto)
    {
        return new Ticket
        {
            Title = dto.Title,
            Description = dto.Description,
            Urgency = dto.Urgency
        };
    }

    public static TicketResponseDto ToResponseDto(this Ticket ticket)
    {
        return new TicketResponseDto(
            ticket.Id,
            ticket.Title,
            ticket.Description,
            ticket.Urgency,
            ticket.Status,
            ticket.CreatedAt
        );
    }
}