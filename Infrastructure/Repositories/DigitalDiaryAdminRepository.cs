using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Repositories;

public class DigitalDiaryAdminRepository : BaseUserRepository<DigitalDiaryAdmin>, IDigitalDiaryAdminRepository
{
	public DigitalDiaryAdminRepository(ApplicationDbContext dbContext) : base(dbContext)
	{
	}
}