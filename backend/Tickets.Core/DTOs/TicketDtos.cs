using System.ComponentModel.DataAnnotations;
using Tickets.Core.Enums;

namespace Tickets.Core.DTOs;

public record CreateTicketDto
{
    [Required(ErrorMessage = "Title is required")]
    [MaxLength(100)]
    public string Title { get; set; }
    [Required(ErrorMessage = "Description is required")]
    [MaxLength(1000)]
    public string Description { get; set; }
    public TicketUrgency Urgency { get; set; }
};

public record UpdateTicketStatusDto(TicketStatus Status);

public record TicketResponseDto(int Id, string Title, string Description, TicketUrgency Urgency, TicketStatus Status, DateTime CreatedAt);