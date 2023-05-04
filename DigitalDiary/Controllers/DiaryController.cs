using DigitalDiary.AuthorizationAttributes;
using DigitalDiary.Controllers.Dto;
using DigitalDiary.Controllers.Dto.Diary;
using DigitalDiary.Controllers.Dto.Journal;
using DigitalDiary.Controllers.Dto.Users;
using Domain.Entities;
using Infrastructure.Extensions;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DigitalDiary.Controllers;

[Route("diary")]
[AuthorizeByRole(Role.Student | Role.Parent)]
public class DiaryController : ControllerBase
{
	private readonly IUserRepository _userRepository;
	private readonly IRepository<Lesson> _lessonRepository;
	private readonly IRepository<Schedule> _scheduleRepository;

	public DiaryController(
		IUserRepository userRepository,
		IRepository<Lesson> lessonRepository,
		IRepository<Schedule> scheduleRepository)
	{
		_userRepository = userRepository;
		_lessonRepository = lessonRepository;
		_scheduleRepository = scheduleRepository;
	}

	[AuthorizeByRole(Role.Parent)]
	[HttpGet("children")]
	public async Task<IActionResult> GetChildrenAsync()
	{
		var parent = await _userRepository.GetAsync(User.Claims.GetUserId()) as Parent;
		return Ok(parent
			.Children
			.Select(student => student.MapStudentToDto()));
	}
	
	[HttpGet]
	public async Task<IActionResult> GetDiaryAsync([FromQuery] int? childId, [FromQuery(Name = "week")] int? weekNumber)
	{
		var role = User.Claims.GetRole();

		Student student;
		if (role == Role.Student)
		{
			if (childId is not null)
			{
				return BadRequest();
			}

			student = (Student)await _userRepository.GetAsync(User.Claims.GetUserId());
		}
		else
		{
			student = (Student)await _userRepository.GetAsync(childId.Value);
		}

		var availableWeeks = DateTimeHelper
			.GetAvailableWeeks()
			.ToList();
		weekNumber ??= DateTimeHelper.GetCurrentWeekNumber();
		var week = availableWeeks[weekNumber.Value - 1];
		
		var lessons = await _lessonRepository
			.Items
			.Where(l =>
				l.GroupId == student.GroupId
				&& week.Start <= l.Date && l.Date <= week.End)
			.ToListAsync();

		var results = Enum
			.GetValues<DayOfWeek>()
			.ToDictionary(dayOfWeek => dayOfWeek, _ => new List<DiaryLessonItemDto>());

		foreach (var lesson in lessons)
		{
			var mark = lesson
				.Marks
				.SingleOrDefault(mark => mark.StudentId == student.Id);
			results[lesson.Date.DayOfWeek].Add(new DiaryLessonItemDto
			{
				Homework = lesson.Homework,
				Mark = new MarkDto
				{
					Attendance = mark?.Attendance.ToString(),
					Mark = mark?.Value
				},
				Order = lesson.Order,
				Subject = lesson.Subject.Name
			});
		}

		var schedule = await _scheduleRepository
			.Items
			.Where(s =>
				s.GroupId == student.GroupId)
			.ToListAsync();

		foreach (var s in schedule)
		{
			if (results[s.DayOfWeek].Any(r => r.Order == s.Order))
			{
				continue;
			}
			
			results[s.DayOfWeek].Add(new DiaryLessonItemDto
			{
				Order = s.Order,
				Subject = s.Subject.Name
			});
		}

		var result = new DiaryDto
		{
			AvailableWeeks = Enumerable.Range(1, availableWeeks.Count).Select(i => availableWeeks[i - 1].MapToDto(i)),
			SelectedWeek = week.MapToDto(weekNumber.Value),
			Items = results
		};

		return Ok(result);
	}
}