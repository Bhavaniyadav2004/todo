using TodoApi.Models;
using TodoApi.Services;
namespace TodoApi.Services
{
    public interface IUserService
    {
        User? Authenticate(string email, string password);
    }
}
