
using System.ComponentModel.DataAnnotations;
using Tickets.Core.Enums;

namespace Tickets.Core.Entities;
public class Ticket
{
    [Key]
    public int Id { get; set; }
    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;
    [Required]
    [MaxLength(1000)]
    public string Description { get; set; } = string.Empty;    
    public TicketUrgency Urgency { get; set; }
    public TicketStatus Status { get; set; } = TicketStatus.Open;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}