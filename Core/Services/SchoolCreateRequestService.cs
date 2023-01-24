using Core.Entities;
using Core.Interfaces;

namespace Core.Services;

public interface ISchoolCreateRequestService
{
	Task ApproveRequestAsync(int requestId);
	Task RejectRequestAsync(int requestId);
}

public class SchoolCreateRequestService : ISchoolCreateRequestService
{
	private readonly ISchoolCreateRequestRepository _schoolCreateRequestRepository;
	private readonly ISchoolRepository _schoolRepository;

	public SchoolCreateRequestService(ISchoolCreateRequestRepository schoolCreateRequestRepository,
		ISchoolRepository schoolRepository)
	{
		_schoolCreateRequestRepository = schoolCreateRequestRepository;
		_schoolRepository = schoolRepository;
	}

	public async Task ApproveRequestAsync(int requestId)
	{
		var request = await _schoolCreateRequestRepository.GetAsync(requestId);

		var school = new School();

		await _schoolRepository.CreateAsync(school);

		request.IsActive = false;
		await _schoolCreateRequestRepository.UpdateAsync(request);
	}

	public async Task RejectRequestAsync(int requestId)
	{
		var request = await _schoolCreateRequestRepository.GetAsync(requestId);

		request.IsActive = false;
		await _schoolCreateRequestRepository.UpdateAsync(request);
	}
}