using Tickets.Core.DTOs;
using Tickets.Core.Enums;
using Tickets.Core.Mappers;
using Tickets.Core.Repositories;

namespace Tickets.Application.Services;

public class TicketService : ITicketService
{
    private readonly ITicketRepository _repository;

    public TicketService(ITicketRepository repository)
    {
        _repository = repository;
    }

    public async Task<TicketResponseDto> CreateAsync(CreateTicketDto dto)
    {
        if (!Enum.IsDefined(dto.Urgency)) throw new ArgumentException("Invalid urgency value");

        var ticket = dto.ToEntity();
        var created = await _repository.CreateAsync(ticket);
        return created.ToResponseDto();
    }

    public async Task<List<TicketResponseDto>> GetAllAsync(TicketStatus? status, TicketUrgency? urgency)
    {
        var tickets = await _repository.GetAllAsync(status, urgency);
        return tickets.Select(t => t.ToResponseDto()).ToList();
    }

    public async Task<TicketResponseDto?> GetByIdAsync(int id)
    {
        var ticket = await _repository.GetByIdAsync(id);
        return ticket?.ToResponseDto();
    }

    public async Task<bool> UpdateStatusAsync(int id, UpdateTicketStatusDto dto)
    {
        if (!Enum.IsDefined(dto.Status)) throw new ArgumentException("Invalid status value");
        return await _repository.UpdateAsync(id, dto.Status);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }
}