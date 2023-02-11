using Domain.Entities;

namespace Infrastructure.Repositories;

public interface ISchoolRepository : IRepository<School>
{
}

public class SchoolRepository : Repository<School>, ISchoolRepository
{
	public SchoolRepository(ApplicationDbContext dbContext) : base(dbContext)
	{
	}
}