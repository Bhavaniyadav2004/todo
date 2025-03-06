using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<TaskItem> TaskItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Define relationship: One User has Many Tasks
        modelBuilder.Entity<TaskItem>()
            .HasOne(t => t.User)                   // Each TaskItem has one User
            .WithMany(u => u.Tasks)                 // Each User has many TaskItems
            .HasForeignKey(t => t.UserId)           // Foreign Key in TaskItem table

            // Optional - restrict deletion if necessary (cascade delete enabled by default)
            .OnDelete(DeleteBehavior.Cascade);

        base.OnModelCreating(modelBuilder);
    }
}
