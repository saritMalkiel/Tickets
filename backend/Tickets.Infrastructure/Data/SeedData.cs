using Tickets.Core.Entities;
using Tickets.Core.Enums;

namespace Tickets.Infrastructure.Data;

public static class SeedData
{
    public static void EnsureSeeded(AppDbContext db)
    {
        if (db.Tickets.Any())
            return;

        db.Tickets.AddRange(
            new Ticket
            {
                Title = "Printer not working",
                Description = "The office printer on the 3rd floor is jammed.",
                Urgency = TicketUrgency.Low,
                Status = TicketStatus.Open
            },
            new Ticket
            {
                Title = "Server outage",
                Description = "Production API is returning 500 errors.",
                Urgency = TicketUrgency.High,
                Status = TicketStatus.InProgress
            },
            new Ticket
            {
                Title = "Password reset request",
                Description = "User cannot log in and needs a password reset.",
                Urgency = TicketUrgency.Medium,
                Status = TicketStatus.Closed
            }
        );

        db.SaveChanges();
    }
}
