using DigitalDiary.AuthorizationAttributes;
using DigitalDiary.Controllers.Dto.Journal;
using Domain.Entities;
using Infrastructure.Extensions;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DigitalDiary.Controllers;

[Route("journal")]
[AuthorizeByRole(Role.SchoolAdmin | Role.Teacher)]
public class JournalController : ControllerBase
{
	private readonly IRepository<Schedule> _scheduleRepository;
	private readonly IRepository<Lesson> _lessonRepository;
	private readonly IUserRepository _userRepository;

	public JournalController(
		IRepository<Schedule> scheduleRepository,
		IRepository<Lesson> lessonRepository, IUserRepository userRepository)
	{
		_scheduleRepository = scheduleRepository;
		_lessonRepository = lessonRepository;
		_userRepository = userRepository;
	}

	[HttpGet("subjects-groups")]
	public async Task<IActionResult> GetPersonalScheduleAsync()
	{
		var schoolId = User.Claims.GetSchoolId();
		
		var schedule = _scheduleRepository
			.Items
			.Where(s => s.Group.SchoolId == schoolId);

		var user = await _userRepository.GetAsync(User.Claims.GetUserId());

		if (User.Claims.GetRole() != Role.SchoolAdmin)
		{
			schedule = schedule
				.Where(s => s.TeacherId == user.Id);
		}

		var items = await schedule
			.ToListAsync();

		var dto = items
			.GroupBy(s => new { s.Group, s.Subject })
			.Select(g => new SubjectsGroupsDto
		{
			GroupId = g.Key.Group.Id,
			SubjectId = g.Key.Subject.Id,
			Name = $"{g.Key.Subject.Name}, {g.Key.Group}"
		});

		return Ok(dto);
	}


	[HttpGet]
	public async Task<IActionResult> GetJournalAsync([FromQuery] int? groupId, [FromQuery] int? subjectId,
		[FromQuery] int? month)
	{
		if (groupId is null || subjectId is null)
		{
			return BadRequest();
		}

		month ??= DateTime.UtcNow.Month;

		var scheduleQuery = _scheduleRepository
			.Items
			.Where(s =>
				s.GroupId == groupId
				&& s.SubjectId == subjectId);

		var user = await _userRepository.GetAsync(User.Claims.GetUserId()); 
		
		var schedule = user.Role == Role.SchoolAdmin
			? await scheduleQuery.ToListAsync()
			: await scheduleQuery.Where(s => s.TeacherId == user.Id).ToListAsync();

		var lessonsQuery = _lessonRepository
			.Items
			.Where(l =>
				l.GroupId == groupId
				&& l.SubjectId == subjectId
				&& l.Date.Month == month);
		
		var lessons = user.Role == Role.SchoolAdmin
			? await lessonsQuery.ToListAsync()
			: await lessonsQuery.Where(s => s.TeacherId == user.Id).ToListAsync();

		var results = lessons
			.Where(l => DateTimeHelper.IsCurrentSchoolYear(l.Date))
			.Select(lesson => new JournalDto
			{
				Date = lesson.Date,
				Order = lesson.Order,
				Marks = lesson.Marks
					.ToDictionary(
						m => m.StudentId,
						m => m.Attendance is not null ? m.Attendance.Value.ToString() : m.Value.ToString())
			}).ToList();

		foreach (var lessonsInDay in schedule.GroupBy(s => s.DayOfWeek))
		{
			var daysInMonth = DateTimeHelper.GetDaysInMonthForDayOfWeek(lessonsInDay.Key, month.Value);
			foreach (var day in daysInMonth)
			{
				foreach (var lesson in lessonsInDay)
				{
					var any = results.Any(r => r.Order == lesson.Order && r.Date.Day == day);
					if (any)
					{
						continue;
					}
					
					results.Add(new JournalDto
					{
						Date = new DateOnly(DateTimeHelper.GetYearForMonth(month.Value), month.Value, day),
						Order = lesson.Order
					});
				}
			}
		}

		return Ok(results);
	}

	[HttpGet("lesson")]
	public async Task<IActionResult> GetLessonAsync([FromQuery] int? groupId, [FromQuery] int? subjectId,
		[FromQuery] DateOnly? date, [FromQuery] int? order)
	{
		if (groupId is null || subjectId is null || date is null || order is null)
		{
			return BadRequest();
		}

		var lesson = await _lessonRepository
			.Items
			.Where(l => l.GroupId == groupId && l.SubjectId == subjectId && l.Order == order && l.Date == date)
			.SingleOrDefaultAsync();

		if (lesson is not null)
		{
			return Ok(new LessonDto
			{
				Homework = lesson.Homework,
				Marks = lesson.Marks.ToDictionary(l => l.StudentId,
					m => new MarkDto
					{
						Attendance = m.Attendance?.ToString(),
						Mark = m.Value
					})
			});
		}

		return NotFound();
	}

	[HttpPost("lesson")]
	public async Task<IActionResult> CreateLessonAsync([FromBody] CreateLessonDto dto)
	{
		var lesson = await _lessonRepository
			.Items
			.Where(l => l.GroupId == dto.GroupId && l.SubjectId == dto.SubjectId && l.Order == dto.Order && l.Date == dto.Date)
			.SingleOrDefaultAsync();

		var schedule = await _scheduleRepository
			.Items
			.Where(s => s.GroupId == dto.GroupId && s.SubjectId == dto.SubjectId && s.Order == dto.Order &&
			            s.DayOfWeek == dto.Date.DayOfWeek)
			.SingleAsync();

		var user = await _userRepository.GetAsync(User.Claims.GetUserId());

		if (user.Role != Role.SchoolAdmin && user.Id != schedule.TeacherId)
		{
			return Forbid();
		}
		
		if (lesson is null)
		{
			lesson = new Lesson
			{
				Date = dto.Date,
				GroupId = dto.GroupId,
				Homework = dto.Homework,
				Order = dto.Order,
				SubjectId = dto.SubjectId,
				TeacherId = schedule.TeacherId,
				Marks = GetMarksFromDto()
			};
			await _lessonRepository.CreateAsync(lesson);
		}
		else
		{
			Console.WriteLine(lesson.Marks.Count());
			lesson.Marks = GetMarksFromDto();
			lesson.Homework = dto.Homework;
			await _lessonRepository.UpdateAsync(lesson);
		}

		return Ok();
		
		Mark GetMarkFromDto(KeyValuePair<int, MarkDto> m)
		{
			var mark = new Mark { StudentId = m.Key };
			if (m.Value.Attendance is not null)
			{
				Enum.TryParse<Attendance>(m.Value.Attendance, out var attendance);
				mark.Attendance = attendance;
			}

			if (m.Value.Mark is not null)
			{
				mark.Value = m.Value.Mark.Value;
			}

			return mark;
		}

		IEnumerable<Mark> GetMarksFromDto()
		{
			return dto.Marks
				.Select(GetMarkFromDto)
				.Where(m => m.Value is not null || m.Attendance is not null)
				.ToList();
		}
	}
}