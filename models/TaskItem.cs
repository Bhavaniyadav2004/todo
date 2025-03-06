namespace TodoApi.Models;

public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
    public string Description { get; set; } = string.Empty;
    public DateTime DueDate { get; set; }

    // Foreign key to User
    public int UserId { get; set; }
    
    // Navigation property (optional if not using it in POST)
    public User? User { get; set; }
}
