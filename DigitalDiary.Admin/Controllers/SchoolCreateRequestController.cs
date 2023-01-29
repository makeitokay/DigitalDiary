using Core.Entities;
using Core.Interfaces;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace DigitalDiary.Admin.Controllers;

[Route("/school-request")]
public class SchoolCreateRequestController : ControllerBase
{
	private readonly ISchoolCreateRequestRepository _schoolCreateRequestRepository;

	public SchoolCreateRequestController(ISchoolCreateRequestRepository schoolCreateRequestRepository)
	{
		_schoolCreateRequestRepository = schoolCreateRequestRepository;
	}
	
	[HttpPost("create")]
	public async Task CreateSchoolCreateRequestAsync([FromBody] CreateSchoolCreateRequestDto dto)
	{
		await _schoolCreateRequestRepository.CreateAsync(new SchoolCreateRequest
		{
			SchoolName = dto.SchoolName,
			City = dto.SchoolCity,
			CreatorEmail = dto.CreatorEmail,
			CreatorFirstName = dto.CreatorFirstName,
			CreatorLastName = dto.CreatorLastName,
			IsActive = true
		});
	}
}