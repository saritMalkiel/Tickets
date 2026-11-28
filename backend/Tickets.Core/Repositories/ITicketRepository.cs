using Tickets.Core.Entities;
using Tickets.Core.Enums;

namespace Tickets.Core.Repositories;

public interface ITicketRepository
{
    Task<Ticket> CreateAsync(Ticket ticket);
    Task<List<Ticket>> GetAllAsync(TicketStatus? status, TicketUrgency? urgency);
    Task<Ticket?> GetByIdAsync(int id);
    Task<bool> UpdateAsync(int id, TicketStatus ticket);
    Task<bool> DeleteAsync(int id);
}