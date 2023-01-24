using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Repositories;

public class SchoolRepository : BaseRepository<School>, ISchoolRepository
{
	public SchoolRepository(ApplicationDbContext dbContext) : base(dbContext)
	{
	}
}