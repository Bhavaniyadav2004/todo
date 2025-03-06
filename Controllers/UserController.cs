using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using TodoApi.Data;
using TodoApi.Models;
using TodoApi.Services;  // Ensure JwtService is in this namespace

namespace TodoApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly JwtService _jwtService;

    public UserController(ApplicationDbContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    // GET: api/User
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.Users.Include(u => u.Tasks).ToListAsync();
    }

    // GET: api/User/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var user = await _context.Users
            .Include(u => u.Tasks)
            .FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }

    // POST: api/User (Sign-Up)
    [HttpPost]
    public async Task<ActionResult<User>> CreateUser(User user)
    {
        if (string.IsNullOrWhiteSpace(user.Email) || string.IsNullOrWhiteSpace(user.Password))
        {
            return BadRequest("Email and Password are required.");
        }

        if (await _context.Users.AnyAsync(u => u.Email == user.Email))
        {
            return Conflict("Email already in use.");
        }

        user.Password = HashPassword(user.Password);  // Hash password before saving

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var userResponse = new
        {
            user.Id,
            user.Name,
            user.Email
        };

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, userResponse);
    }

    // POST: api/User/login (Login Endpoint)
    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest("Email and Password are required.");
        }

        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null || !VerifyPassword(request.Password, user.Password))
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        // Generate JWT token
        var token = _jwtService.GenerateToken(user);

        var userResponse = new
        {
            user.Id,
            user.Name,
            user.Email
        };

        return Ok(new
        {
            Message = "Login successful",
            Token = token,
            User = userResponse
        });
    }

    // DELETE: api/User/{id}
    [Authorize]    // Protect deletion with authorization (optional)
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // Utility - Hash password (SHA256)
    private string HashPassword(string password)
    {
        using (var sha256 = SHA256.Create())
        {
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }
    }

    // Utility - Compare hashed password
    private bool VerifyPassword(string enteredPassword, string storedHash)
    {
        return HashPassword(enteredPassword) == storedHash;
    }
}

// Model for Login Request (inside same file or create a new class)
public class LoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}
