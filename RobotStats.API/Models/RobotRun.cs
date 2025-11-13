namespace RobotStats.API.Models
{
    public class RobotRun
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string RobotName { get; set; } = string.Empty;
        public DateTime StartTime { get; set; } = DateTime.UtcNow;
        public DateTime? EndTime { get; set; }
        public RunStatus Status { get; set; }
        public int SavedTimeMinutes { get; set; }
        public string? ErrorMessage { get; set; }
    }

    public enum RunStatus
    {
        InProgress = 1,
        Success = 2,
        Failed = 3
    }
}
