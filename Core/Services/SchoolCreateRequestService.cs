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
	private readonly IEmailClient _emailClient;
	private readonly IPasswordManager _passwordManager;

	public SchoolCreateRequestService(
		ISchoolCreateRequestRepository schoolCreateRequestRepository,
		ISchoolRepository schoolRepository,
		IEmailClient emailClient,
		IPasswordManager passwordManager)
	{
		_schoolCreateRequestRepository = schoolCreateRequestRepository;
		_schoolRepository = schoolRepository;
		_emailClient = emailClient;
		_passwordManager = passwordManager;
	}

	public async Task ApproveRequestAsync(int requestId)
	{
		var request = await _schoolCreateRequestRepository.GetAsync(requestId);

		var password = _passwordManager.GenerateRandomPassword();
		var passwordHash = _passwordManager.GetPasswordHash(password, out var salt);
		var schoolCreator = new SchoolCreator
		{
			Email = request.CreatorEmail,
			FirstName = request.CreatorFirstName,
			LastName = request.CreatorLastName,
			PasswordHash = passwordHash,
			PasswordSalt = salt,
			Role = Role.SchoolCreator
		};

		var school = new School
		{
			Creator = schoolCreator,
			Name = request.SchoolName,
			City = request.City
		};

		await _schoolRepository.CreateAsync(school);

		await _emailClient.SendUserCreationEmailAsync(schoolCreator, password);

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