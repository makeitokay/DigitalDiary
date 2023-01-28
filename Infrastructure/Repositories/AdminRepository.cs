using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Repositories;

public class AdminRepository : BaseUserRepository<Admin>, IAdminRepository
{
	public AdminRepository(ApplicationDbContext dbContext) : base(dbContext)
	{
	}
}