using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TodoApi.Data;
using TodoApi.Models;
using System.IdentityModel.Tokens.Jwt;

namespace TodoApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]  // Require authorization for all endpoints
public class TaskController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TaskController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Task - Fetch tasks for the logged-in user
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
    {
        var userId = GetUserIdFromToken();
        if (userId == null)
        {
            return Unauthorized("Invalid token or user not found.");
        }

        return await _context.TaskItems
            .Where(t => t.UserId == userId)
            .Include(t => t.User)
            .ToListAsync();
    }

    // GET: api/Task/5 - Fetch a specific task (ensure it belongs to the logged-in user)
    [HttpGet("{id}")]
    public async Task<ActionResult<TaskItem>> GetTask(int id)
    {
        var userId = GetUserIdFromToken();
        if (userId == null)
        {
            return Unauthorized("Invalid token or user not found.");
        }

        var task = await _context.TaskItems
            .Where(t => t.Id == id && t.UserId == userId)
            .Include(t => t.User)
            .FirstOrDefaultAsync();

        if (task == null)
        {
            return NotFound("Task not found or does not belong to you.");
        }

        return task;
    }

    // POST: api/Task - Create a task for the logged-in user
    [HttpPost]
    public async Task<ActionResult<TaskItem>> PostTask(TaskItem taskItem)
    {
        var userId = GetUserIdFromToken();
        if (userId == null)
        {
            return Unauthorized("Invalid token or user not found.");
        }

        // Link the task to the logged-in user
        taskItem.UserId = userId.Value;

        _context.TaskItems.Add(taskItem);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTask), new { id = taskItem.Id }, taskItem);
    }

    // PUT: api/Task/5 - Update task (only if it belongs to the logged-in user)
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTask(int id, TaskItem taskItem)
    {
        var userId = GetUserIdFromToken();
        if (userId == null)
        {
            return Unauthorized("Invalid token or user not found.");
        }

        if (id != taskItem.Id)
        {
            return BadRequest("Task ID mismatch.");
        }

        var existingTask = await _context.TaskItems.FindAsync(id);
        if (existingTask == null || existingTask.UserId != userId)
        {
            return NotFound("Task not found or does not belong to you.");
        }

        // Allow only updating allowed fields
        existingTask.Title = taskItem.Title;
        existingTask.IsCompleted = taskItem.IsCompleted;

        _context.Entry(existingTask).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TaskExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // DELETE: api/Task/5 - Delete task (only if it belongs to the logged-in user)
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var userId = GetUserIdFromToken();
        if (userId == null)
        {
            return Unauthorized("Invalid token or user not found.");
        }

        var task = await _context.TaskItems.FindAsync(id);
        if (task == null || task.UserId != userId)
        {
            return NotFound("Task not found or does not belong to you.");
        }

        _context.TaskItems.Remove(task);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TaskExists(int id)
    {
        return _context.TaskItems.Any(e => e.Id == id);
    }

    // Extract UserId from JWT token claims
    private int? GetUserIdFromToken()
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub);
        if (userIdClaim == null)
        {
            return null;
        }

        if (int.TryParse(userIdClaim.Value, out int userId))
        {
            return userId;
        }

        return null;
    }

    // New: AddTask - Add a task with user linking
    [HttpPost("add")]
    public IActionResult AddTask([FromBody] TaskItem taskItem)
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub);
        if (userIdClaim == null)
        {
            return Unauthorized("Invalid token");
        }

        if (!int.TryParse(userIdClaim.Value, out int userId))
        {
            return Unauthorized("Invalid user ID in token");
        }

        // Assign UserId to the task
        taskItem.UserId = userId;

        _context.TaskItems.Add(taskItem);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetTask), new { id = taskItem.Id }, taskItem);
    }

    // New: GetUserTasks - Fetch all tasks for logged-in user
    [HttpGet("user-tasks")]
    public IActionResult GetUserTasks()
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub);
        if (userIdClaim == null)
        {
            return Unauthorized("Invalid token");
        }

        if (!int.TryParse(userIdClaim.Value, out int userId))
        {
            return Unauthorized("Invalid user ID in token");
        }

        var tasks = _context.TaskItems.Where(t => t.UserId == userId).ToList();

        return Ok(tasks);
    }
}
