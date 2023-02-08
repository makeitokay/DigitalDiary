using Domain.Entities;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Primitives;

namespace DigitalDiary.Admin.Pages;

[Authorize]
public class IndexModel : PageModel
{
	private readonly ISchoolCreateRequestRepository _schoolCreateRequestRepository;
	private readonly IPasswordManager _passwordManager;
	private readonly ISchoolRepository _schoolRepository;
	private readonly IEmailClient _emailClient;

	public ICollection<SchoolCreateRequest> SchoolCreateRequests { get; private set; }

	public IndexModel(
		IPasswordManager passwordManager,
		ISchoolCreateRequestRepository schoolCreateRequestRepository,
		ISchoolRepository schoolRepository,
		IEmailClient emailClient)
	{
		_passwordManager = passwordManager;
		_schoolCreateRequestRepository = schoolCreateRequestRepository;
		_schoolRepository = schoolRepository;
		_emailClient = emailClient;
	}

	public async Task OnGetAsync()
	{
		SchoolCreateRequests = await _schoolCreateRequestRepository.GetActiveSchoolCreateRequestsAsync();
	}

	public async Task<IActionResult> OnPostAsync()
	{
		if (Request.Form.TryGetValue("approveButton", out var approveRequestValues))
		{
			var requestId = GetSchoolCreateRequestId(approveRequestValues);
			
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
		else if (Request.Form.TryGetValue("rejectButton", out var rejectRequestValues))
		{
			var requestId = GetSchoolCreateRequestId(rejectRequestValues);
			var request = await _schoolCreateRequestRepository.GetAsync(requestId);

			request.IsActive = false;
			await _schoolCreateRequestRepository.UpdateAsync(request);
		}
		
		return LocalRedirect("/");
	}

	private static int GetSchoolCreateRequestId(StringValues requestValues)
	{
		return int.Parse(requestValues.FirstOrDefault()
		                 ?? throw new InvalidOperationException("String values are empty"));
	} 
}