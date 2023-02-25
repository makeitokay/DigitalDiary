using DigitalDiary.AuthorizationAttributes;
using DigitalDiary.Controllers.Dto.Announcements;
using Domain.Entities;
using Infrastructure.Extensions;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DigitalDiary.Controllers;

[Route("announcements")]
[AuthorizeByRole(Role.Teacher | Role.SchoolAdmin)]
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

		var user = await _userRepository.TryGetByEmailAndRoleAsync(User.Claims.GetEmail(), User.Claims.GetRole());

		var userGroups = user switch
		{
			Teacher teacher => teacher.Schedule.Select(s => s.Group).Distinct().ToArray(),
			Student student => new[] { student.Group },
			Parent parent => parent.Children.Select(c => c.Group).Distinct().ToArray(),
			_ => Array.Empty<Group>()
		};

		var announcements = await _announcementRepository
			.Items
			.Where(a => a.SchoolId == schoolId)
			.ToListAsync();

		var dto = announcements
			.Where(a =>
			{
				var inRoleScope = a.Scope.ForRoles != null
					? a.Scope.ForRoles!.Contains(user.Role.ToString())
					: true;

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
	public async Task<IActionResult> CreateAnnouncementAsync([FromBody] CreateAnnouncementDto dto)
	{
		var schoolId = User.Claims.GetSchoolId();
		
		var user = await _userRepository.TryGetByEmailAndRoleAsync(User.Claims.GetEmail(), User.Claims.GetRole());

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