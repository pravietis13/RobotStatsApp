using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RobotStats.API.Models;

[ApiController]
[Route("api")]
public class RobotController : ControllerBase
{
    private readonly AppDbContext _db;

    public RobotController(AppDbContext db) => _db = db;

    [HttpPost("run/start")]
    public async Task<IActionResult> StartRun(string robotName)
    {
        var run = new RobotRun
        {
            RobotName = robotName,
            Status = RunStatus.Running
        };

        _db.RobotRuns.Add(run);
        await _db.SaveChangesAsync();

        return Ok(new { id = run.Id });
    }

    [HttpPost("run/complete")]
    public async Task<IActionResult> CompleteRun(Guid runId)
    {
        var run = await _db.RobotRuns.FindAsync(runId);
        if (run == null) return NotFound();

        run.EndTime = DateTime.UtcNow;
        run.Status = RunStatus.Success;

        // Рассчитываем сэкономленное время
        var duration = run.EndTime.Value - run.StartTime;
        run.SavedTimeMinutes = (int)duration.TotalMinutes;

        await _db.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("run/error")]
    public async Task<IActionResult> FailRun(Guid runId, string errorMessage)
    {
        var run = await _db.RobotRuns.FindAsync(runId);
        if (run == null) return NotFound();

        run.EndTime = DateTime.UtcNow;
        run.Status = RunStatus.Failed;
        run.ErrorMessage = errorMessage;

        run.SavedTimeMinutes = 0;

        await _db.SaveChangesAsync();
        return Ok();
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetDashboardStats()
    {
        var runs = await _db.RobotRuns.ToListAsync();

        var stats = new
        {
            TotalRuns = runs.Count,
            Successful = runs.Count(r => r.Status == RunStatus.Success),
            Failed = runs.Count(r => r.Status == RunStatus.Failed),
            Running = runs.Count(r => r.Status == RunStatus.Running),
            TotalSavedTime = runs.Sum(r => r.SavedTimeMinutes),
        };

        return Ok(stats);
    }

    // Получить все запуски 
    [HttpGet("stats/runs")]
    public async Task<IActionResult> GetAllRuns() =>
        Ok(await _db.RobotRuns.OrderByDescending(r => r.StartTime).ToListAsync());
}