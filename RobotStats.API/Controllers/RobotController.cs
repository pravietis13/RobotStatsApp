using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RobotStats.API.Models;

[ApiController]
[Route("api")]
public class RobotController : ControllerBase
{
    private readonly AppDbContext _db;

    public RobotController(AppDbContext db) => _db = db;

    // Отправить данные о запуске
    [HttpPost("robot-run")]
    public async Task<IActionResult> AddRobotRun([FromBody] RobotRun run)
    {
        _db.RobotRuns.Add(run);
        await _db.SaveChangesAsync();
        return Ok(new { message = "Run saved", id = run.Id });
    }

    // Получить статистику
    [HttpGet("dashboard-stats")]
    public async Task<IActionResult> GetDashboardStats()
    {
        var runs = await _db.RobotRuns.ToListAsync();

        var stats = new
        {
            TotalRuns = runs.Count,
            SuccessfulRuns = runs.Count(r => r.Status.Equals("Completed")),
            FailedRuns = runs.Count(r => r.Status.Equals("Failed")),
            TotalSavedTime = runs.Sum(r => r.SavedTimeMinutes),
            RecentRuns = runs.OrderByDescending(r => r.StartTime).Take(10)
        };

        return Ok(stats);
    }

    // Получить все запуски 
    [HttpGet("runs")]
    public async Task<IActionResult> GetAllRuns() =>
        Ok(await _db.RobotRuns.OrderByDescending(r => r.StartTime).ToListAsync());
}