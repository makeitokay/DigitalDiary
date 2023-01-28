using Core.Entities;
using Core.Interfaces;
using Core.Services;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Primitives;

namespace DigitalDiary.Admin.Pages;

[Authorize]
public class IndexModel : PageModel
{
	private readonly ISchoolCreateRequestRepository _schoolCreateRequestRepository;
	private readonly ISchoolCreateRequestService _schoolCreateRequestService;

	public ICollection<SchoolCreateRequest> SchoolCreateRequests { get; private set; }

	public IndexModel(ISchoolCreateRequestService schoolCreateRequestService, ISchoolCreateRequestRepository schoolCreateRequestRepository)
	{
		_schoolCreateRequestService = schoolCreateRequestService;
		_schoolCreateRequestRepository = schoolCreateRequestRepository;
	}

	public async Task OnGetAsync()
	{
		SchoolCreateRequests = await _schoolCreateRequestRepository.GetActiveSchoolCreateRequestsAsync();
	}

	public async Task<IActionResult> OnPostAsync()
	{
		if (Request.Form.TryGetValue("approveButton", out var approveRequestValues))
		{
			await _schoolCreateRequestService.ApproveRequestAsync(GetSchoolCreateRequestId(approveRequestValues));
		}
		else if (Request.Form.TryGetValue("rejectButton", out var rejectRequestValues))
		{
			await _schoolCreateRequestService.RejectRequestAsync(GetSchoolCreateRequestId(rejectRequestValues));
		}
		
		return LocalRedirect("/");
	}

	private static int GetSchoolCreateRequestId(StringValues requestValues)
	{
		return int.Parse(requestValues.FirstOrDefault()
		                 ?? throw new InvalidOperationException("String values are empty"));
	} 
}