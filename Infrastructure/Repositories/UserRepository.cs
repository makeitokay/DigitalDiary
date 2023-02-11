using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public interface IUserRepository : IBaseUserRepository<User>
{
	Task<List<User>> GetUsersInSchoolByRoleAsync(int schoolId, Role role);
}

public class UserRepository : BaseUserRepository<User>, IUserRepository
{
	public UserRepository(ApplicationDbContext dbContext) : base(dbContext)
	{
	}

	public async Task<List<User>> GetUsersInSchoolByRoleAsync(int schoolId, Role role)
	{
		return await Set.Where(u => u.Role == role && u.School.Id == schoolId).ToListAsync();
	}
}