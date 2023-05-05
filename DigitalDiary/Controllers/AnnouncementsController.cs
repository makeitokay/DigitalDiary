using DigitalDiary.AuthorizationAttributes;
using DigitalDiary.Controllers.Dto.Announcements;
using Domain.Entities;
using Infrastructure.Extensions;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace DigitalDiary.Controllers;

[Route("announcements")]
[Authorize]
public class AnnouncementsController : ControllerBase
{
	private readonly IRepository<Announcement> _announcementRepository;
	private readonly IUserRepository _userRepository;

	public AnnouncementsController(IRepository<Announcement> announcementRepository, IUserRepository userRepository)
	{
		_announcementRepository = announcementRepository;
		_userRepository = userRepository;
	}

	[HttpGet]
	public async Task<IActionResult> GetScopeAnnouncementsAsync()
	{
		var schoolId = User.Claims.GetSchoolId();

		var user = await _userRepository.GetAsync(User.Claims.GetUserId());

		var userGroups = user
			.GetUserGroups()
			.ToArray();
		
		var announcements = await _announcementRepository
			.Items
			.Where(a => a.SchoolId == schoolId)
			.ToListAsync();

		var dto = announcements
			.Where(a =>
			{
				var inRoleScope = a.Scope.ForRoles.IsNullOrEmpty() || a.Scope.ForRoles!.Contains(user.Role.ToString());

				var inGroupParallelsScope = a.Scope.ForGroupParallels == null
				                            || userGroups.Any(group => a.Scope.ForGroupParallels.Contains(group.Number))
				                            || user.Role == Role.SchoolAdmin;

				var inGroupScope = a.Scope.ForGroups == null
				                   || userGroups.Any(group => a.Scope.ForGroups.Contains(group.Id))
				                   || user.Role == Role.SchoolAdmin;

				return inRoleScope && (inGroupScope || inGroupParallelsScope);
			})
			.Select(a => new AnnouncementDto
			{
				Header = a.Header,
				AuthorName = a.Author.FirstName + " " + a.Author.LastName,
				Text = a.Text,
				CreatedAtUtc = a.CreatedAtUtc.ToString("dddd, dd MMM HH:mm")
			});

		return Ok(dto);
	}
	
	[HttpGet("all")]
	[AuthorizeByRole(Role.SchoolAdmin)]
	public async Task<IActionResult> GetAllAnnouncementsAsync()
	{
		var schoolId = User.Claims.GetSchoolId();

		var announcements = await _announcementRepository
			.Items
			.Where(a => a.SchoolId == schoolId)
			.ToListAsync();

		var dto = announcements
			.Select(a => new AnnouncementDto
			{
				Header = a.Header,
				AuthorName = a.Author.FirstName + " " + a.Author.LastName,
				Text = a.Text,
				CreatedAtUtc = a.CreatedAtUtc.ToString("dddd, dd MMM HH:mm")
			});

		return Ok(dto);
	}

	[HttpPost]
	[AuthorizeByRole(Role.SchoolAdmin | Role.Teacher)]
	public async Task<IActionResult> CreateAnnouncementAsync([FromBody] CreateAnnouncementDto dto)
	{
		var schoolId = User.Claims.GetSchoolId();
		
		var user = await _userRepository.GetAsync(User.Claims.GetUserId());

		var announcement = new Announcement
		{
			Header = dto.Header,
			Author = user,
			Text = dto.Text,
			SchoolId = schoolId,
			Scope = dto.Scope
		};

		await _announcementRepository.CreateAsync(announcement);

		return Ok();
	}
}