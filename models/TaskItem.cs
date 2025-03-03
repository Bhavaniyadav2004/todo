namespace TodoApi.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
        public int UserId { get; set; }

        // Navigation property (optional when creating tasks)
        public User? User { get; set; }
    }
}
