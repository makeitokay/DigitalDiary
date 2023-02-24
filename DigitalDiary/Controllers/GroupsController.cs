using DigitalDiary.AuthorizationAttributes;
using DigitalDiary.Controllers.Dto.Groups;
using Domain.Entities;
using Infrastructure.Extensions;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DigitalDiary.Controllers;

[Route("groups")]
[AuthorizeByRole(Role.SchoolAdmin)]
public class GroupsController : ControllerBase
{
	private readonly IRepository<Group> _groupRepository;

	public GroupsController(IRepository<Group> groupRepository)
	{
		_groupRepository = groupRepository;
	}

	[HttpGet]
	public async Task<IActionResult> GetGroupsAsync()
	{
		var schoolId = User.Claims.GetSchoolId();
		var groups = await _groupRepository
			.Items
			.Where(g => g.SchoolId == schoolId)
			.Select(g => new GroupDto
			{
				Letter = g.Letter,
				Number = g.Number
			})
			.ToListAsync();

		return Ok(groups);
	}
	
	[HttpPost]
	public async Task<IActionResult> CreateGroupAsync([FromBody] GroupDto dto)
	{
		var schoolId = User.Claims.GetSchoolId();

		var group = new Group
		{
			Letter = dto.Letter,
			Number = dto.Number,
			SchoolId = schoolId
		};

		await _groupRepository.CreateAsync(group);
		
		return Ok();
	}
}