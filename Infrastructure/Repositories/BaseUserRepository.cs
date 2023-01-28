using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;



public abstract class BaseUserRepository<TUser> : BaseRepository<TUser>, IBaseUserRepository<TUser> where TUser : BaseUser
{
	protected BaseUserRepository(ApplicationDbContext dbContext) : base(dbContext)
	{
	}

	public async Task<TUser?> TryGetByEmailAsync(string email)
	{
		return await Set.SingleOrDefaultAsync(user => user.Email == email);
	}
}