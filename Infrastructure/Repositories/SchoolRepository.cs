using Domain.Entities;

namespace Infrastructure.Repositories;

public interface ISchoolRepository : IBaseRepository<School>
{
}

public class SchoolRepository : BaseRepository<School>, ISchoolRepository
{
	public SchoolRepository(ApplicationDbContext dbContext) : base(dbContext)
	{
	}
}