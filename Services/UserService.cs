using TodoApi.Models;

namespace TodoApi.Services{
public class UserService : IUserService
{
    private List<User> _users = new()
    {
        new User { Id = 1, Name = "Test User", Email = "test@example.com", Password = "password" }
    };

    public User? Authenticate(string email, string password)
    {
        return _users.FirstOrDefault(u => u.Email == email && u.Password == password);
    }
}
}