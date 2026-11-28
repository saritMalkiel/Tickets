using Microsoft.EntityFrameworkCore;
using Tickets.Core.Entities;
using Tickets.Core.Enums;
using Tickets.Core.Repositories;
using Tickets.Infrastructure.Data;
using System.Linq;

namespace Tickets.Infrastructure.Repositories;

public class TicketRepository(AppDbContext context) : ITicketRepository
{
    private readonly AppDbContext _context = context;

    public async Task<Ticket> CreateAsync(Ticket ticket)
    {
        _context.Tickets.Add(ticket);
        await _context.SaveChangesAsync();
        return ticket;
    }

    public async Task<List<Ticket>> GetAllAsync(TicketStatus? status, TicketUrgency? urgency)
    {
        return await _context.Tickets
        .Where(t => (status == null || t.Status == status) && (urgency == null || t.Urgency == urgency)).ToListAsync();

    }

    public async Task<Ticket?> GetByIdAsync(int id)
    {
        return await _context.Tickets.FindAsync(id);
    }

    public async Task<bool> UpdateAsync(int id, TicketStatus status)
    {
        var existing = await _context.Tickets.FindAsync(id);
        if (existing is null) return false;

        existing.Status = status;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var existing = await _context.Tickets.FindAsync(id);
        if (existing is null) return false;

        _context.Tickets.Remove(existing);
        await _context.SaveChangesAsync();
        return true;
    }
}