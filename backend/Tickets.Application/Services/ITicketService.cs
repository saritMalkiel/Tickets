using Tickets.Core.DTOs;
using Tickets.Core.Enums;

namespace Tickets.Application.Services;

public interface ITicketService
{
    Task<TicketResponseDto> CreateAsync(CreateTicketDto dto);
    Task<List<TicketResponseDto>> GetAllAsync(TicketStatus? status, TicketUrgency? urgency);
    Task<TicketResponseDto?> GetByIdAsync(int id);
    Task<bool> UpdateStatusAsync(int id, UpdateTicketStatusDto dto);
    Task<bool> DeleteAsync(int id);
}

