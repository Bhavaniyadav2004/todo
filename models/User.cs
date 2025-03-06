namespace TodoApi.Models;

public class User
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;  // Username
    public string Email { get; set; } = string.Empty; // Email
    public string Password { get; set; } = string.Empty; // Password (should be hashed ideally)

    // One user can have multiple tasks
    public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
}
