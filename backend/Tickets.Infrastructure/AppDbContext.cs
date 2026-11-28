using Microsoft.EntityFrameworkCore;
using Tickets.Core.Entities;

namespace Tickets.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}
   
    public DbSet<Ticket> Tickets => Set<Ticket>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Ticket>(entity =>
        {
            entity.HasKey(t => t.Id);
            entity.Property(t => t.Title).IsRequired();
            entity.Property(t => t.Description).IsRequired();
        });
    }
}
