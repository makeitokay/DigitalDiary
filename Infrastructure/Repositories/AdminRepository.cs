using Core.Entities;

namespace Infrastructure.Repositories;

public interface IAdminRepository : IBaseUserRepository<Admin>
{
	
}

public class AdminRepository : BaseUserRepository<Admin>, IAdminRepository
{
	public AdminRepository(ApplicationDbContext dbContext) : base(dbContext)
	{
	}
}