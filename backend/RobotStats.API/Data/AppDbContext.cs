using RobotStats.API.Models;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<RobotRun> RobotRuns => Set<RobotRun>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Конвертируем enum в string для хранения в БД
        modelBuilder.Entity<RobotRun>()
            .Property(r => r.Status)
            .HasConversion<string>(); // "Running", "Success", "Failed"
    }
}