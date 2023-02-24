using DigitalDiary.AuthorizationAttributes;
using DigitalDiary.Controllers.Dto.Subjects;
using Domain.Entities;
using Infrastructure.Extensions;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DigitalDiary.Controllers;

[Route("subjects")]
[AuthorizeByRole(Role.SchoolAdmin)]
public class SubjectsController : ControllerBase
{
	private readonly IRepository<Subject> _subjectRepository;

	public SubjectsController(IRepository<Subject> subjectRepository)
	{
		_subjectRepository = subjectRepository;
	}

	[HttpGet]
	public async Task<IActionResult> GetSubjectsAsync()
	{
		var schoolId = User.Claims.GetSchoolId();
		var subjects = await _subjectRepository
			.Items
			.Where(s => s.SchoolId == schoolId)
			.Select(s => s.Name)
			.ToListAsync();

		return Ok(subjects);
	}
	
	[HttpPost]
	public async Task<IActionResult> CreateSubjectAsync([FromBody] CreateSubjectDto dto)
	{
		var schoolId = User.Claims.GetSchoolId();

		var name = dto.Name;

		var subject = new Subject
		{
			Name = name,
			SchoolId = schoolId
		};

		await _subjectRepository.CreateAsync(subject);
		
		return Ok();
	}
}