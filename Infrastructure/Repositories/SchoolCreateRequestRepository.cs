﻿using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public interface ISchoolCreateRequestRepository : IBaseRepository<SchoolCreateRequest>
{
	Task<ICollection<SchoolCreateRequest>> GetActiveSchoolCreateRequestsAsync();
}

public class SchoolCreateRequestRepository : BaseRepository<SchoolCreateRequest>, ISchoolCreateRequestRepository
{
	public SchoolCreateRequestRepository(ApplicationDbContext dbContext) : base(dbContext)
	{
	}

	public async Task<ICollection<SchoolCreateRequest>> GetActiveSchoolCreateRequestsAsync()
	{
		return await Set
			.Where(request => request.IsActive)
			.ToListAsync();
	}
}