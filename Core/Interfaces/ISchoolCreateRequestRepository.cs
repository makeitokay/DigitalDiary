using Core.Entities;

namespace Core.Interfaces;

public interface ISchoolCreateRequestRepository : IBaseRepository<SchoolCreateRequest>
{
	Task<ICollection<SchoolCreateRequest>> GetActiveSchoolCreateRequestsAsync();
}