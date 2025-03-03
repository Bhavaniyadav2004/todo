namespace TodoApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        // Navigation property - User can have many tasks
        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}
