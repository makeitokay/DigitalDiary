using DigitalDiary.AuthorizationAttributes;
using DigitalDiary.Controllers.Dto.Groups;
using Domain.Entities;
using Infrastructure.Extensions;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DigitalDiary.Controllers;

[Route("groups")]
[AuthorizeByRole(Role.SchoolAdmin | Role.Teacher)]
public class GroupsController : ControllerBase
{
	private readonly IRepository<Group> _groupRepository;
	private readonly IUserRepository _userRepository;

	public GroupsController(IRepository<Group> groupRepository, IUserRepository userRepository)
	{
		_groupRepository = groupRepository;
		_userRepository = userRepository;
	}

	[HttpGet]
	public async Task<IActionResult> GetGroupsAsync()
	{
		var role = User.Claims.GetRole();

		List<Group> groups;
		if (role == Role.SchoolAdmin)
		{
			var schoolId = User.Claims.GetSchoolId();
			groups = await _groupRepository
				.Items
				.Where(g => g.SchoolId == schoolId)
				.ToListAsync();
		}
		else
		{
			var user = await _userRepository.GetByEmailAndRoleAsync(User.Claims.GetEmail(), role);
			groups = user.GetUserGroups().ToList();
		}

		var dto = groups
			.Select(g => new GroupDto
			{
				Letter = g.Letter,
				Number = g.Number,
				Id = g.Id
			});

		return Ok(dto);
	}

	[HttpPost]
	[AuthorizeByRole(Role.SchoolAdmin)]
	public async Task<IActionResult> CreateGroupAsync([FromBody] CreateGroupDto dto)
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