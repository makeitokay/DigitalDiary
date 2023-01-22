using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public interface IUserRepository : IRepository<User>
{
	Task<User?> TryGetByEmailAsync(string email);
}

public class UserRepository : BaseRepository<User>, IUserRepository
{
	public UserRepository(ApplicationDbContext dbContext) : base(dbContext)
	{
	}

	public async Task<User?> TryGetByEmailAsync(string email)
	{
		return await Set.SingleOrDefaultAsync(user => user.Email == email);
	}
}