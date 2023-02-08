using Domain.Entities;

namespace Infrastructure.Repositories;

public interface IDigitalDiaryAdminRepository : IBaseUserRepository<DigitalDiaryAdmin>
{
	
}

public class DigitalDiaryAdminRepository : BaseUserRepository<DigitalDiaryAdmin>, IDigitalDiaryAdminRepository
{
	public DigitalDiaryAdminRepository(ApplicationDbContext dbContext) : base(dbContext)
	{
	}
}