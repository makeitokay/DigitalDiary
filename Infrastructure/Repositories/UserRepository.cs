using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public interface IUserRepository : IBaseUserRepository<User>
{
	Task<List<User>> GetUsersInSchoolByRoleAsync(int schoolId, Role role);
	Task<User> GetByEmailAndRoleAsync(string email, Role role);
	Task<User?> TryGetByEmailAndRoleAsync(string email, Role role);
}

public class UserRepository : BaseUserRepository<User>, IUserRepository
{
	public UserRepository(ApplicationDbContext dbContext) : base(dbContext)
	{
	}

	public async Task<List<User>> GetUsersInSchoolByRoleAsync(int schoolId, Role role)
	{
		return await Set.Where(u => u.Role == role && u.SchoolId == schoolId).ToListAsync();
	}

	public async Task<User> GetByEmailAndRoleAsync(string email, Role role)
	{
		return await TryGetByEmailAndRoleAsync(email, role) ?? throw new ArgumentException();
	}

	public async Task<User?> TryGetByEmailAndRoleAsync(string email, Role role)
	{
		return await Set.SingleOrDefaultAsync(user => user.Email == email && user.Role == role);
	}
}