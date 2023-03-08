using DigitalDiary.AuthorizationAttributes;
using DigitalDiary.Controllers.Dto.Statistics;
using Domain.Entities;
using Infrastructure.Extensions;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DigitalDiary.Controllers;

[Route("statistics")]
[AuthorizeByRole(Role.SchoolAdmin)]
public class StatisticsController : ControllerBase
{
	private readonly IRepository<Mark> _markRepository;
	private readonly IUserRepository _userRepository;
	private readonly IRepository<Group> _groupRepository;

	public StatisticsController(
		IRepository<Mark> markRepository,
		IUserRepository userRepository,
		IRepository<Group> groupRepository)
	{
		_markRepository = markRepository;
		_userRepository = userRepository;
		_groupRepository = groupRepository;
	}

	[HttpGet("marks")]
	public async Task<IActionResult> GetMarksStatisticsAsync(
		[FromQuery(Name = "group")] int? groupId,
		[FromQuery(Name = "teacher")] int? teacherId,
		[FromQuery(Name = "subject")] int? subjectId,
		[FromQuery] DateOnly? start,
		[FromQuery] DateOnly? end)
	{
		var quarters = DateTimeHelper
			.GetAvailableQuarters()
			.ToList();

		if (start is null || end is null)
		{
			var currentQuarterNumber = DateTimeHelper.GetCurrentQuarterNumber();
			var currentQuarter = quarters[currentQuarterNumber - 1];
			start ??= currentQuarter.Start;
			end ??= currentQuarter.End;
		}

		if (start > end)
		{
			return BadRequest("Начало периода должно быть раньше окончания");
		}

		var schoolId = User.Claims.GetSchoolId();
		var marksQuery = _markRepository
			.Items
			.Where(m => m.Lesson.Subject.SchoolId == schoolId);

		if (groupId is not null)
		{
			marksQuery = marksQuery
				.Where(m => m.Lesson.GroupId == groupId);
		}

		if (teacherId is not null)
		{
			marksQuery = marksQuery
				.Where(m => m.Lesson.TeacherId == teacherId);
		}

		if (subjectId is not null)
		{
			marksQuery = marksQuery
				.Where(m => m.Lesson.SubjectId == subjectId);
		}

		var marks = await marksQuery
			.ToListAsync();

		var results = new Dictionary<DateOnly, double>();

		var marksBefore = marks
			.Where(m => m.Lesson.Date < start && m.Value is not null)
			.ToList();

		var sum = marksBefore.Sum(m => m.Value) ?? 0;
		var count = marksBefore.Count;

		while (start <= end)
		{
			var dayMarks = marks
				.Where(m => m.Lesson.Date == start && m.Value is not null)
				.ToList();

			if (!dayMarks.Any())
			{
				var yesterday = start.Value.AddDays(-1);
				results[start.Value] = results.TryGetValue(yesterday, out var value) ? value : 0;
				start = start.Value.AddDays(1);
				continue;
			}

			sum += dayMarks.Sum(m => m.Value) ?? 0;
			count += dayMarks.Count;
			
			results[start.Value] = Math.Round(1.0 * sum / count, 2);
			
			start = start.Value.AddDays(1);
		}

		return Ok(new StatisticsDto
		{
			MinimumStartDate = quarters.First().Start,
			MaximumEndDate = quarters.Last().End,
			Statistics = results
		});
	}

	[HttpGet("attendance")]
	public async Task<IActionResult> GetAttendanceStatisticsAsync(
		[FromQuery(Name = "attendance")] string? attendanceName,
		[FromQuery] int? groupId,
		[FromQuery] DateOnly? start,
		[FromQuery] DateOnly? end)
	{
		var quarters = DateTimeHelper
			.GetAvailableQuarters()
			.ToList();

		if (start is null || end is null)
		{
			var currentQuarterNumber = DateTimeHelper.GetCurrentQuarterNumber();
			var currentQuarter = quarters[currentQuarterNumber - 1];
			start ??= currentQuarter.Start;
			end ??= currentQuarter.End;
		}

		if (start > end)
		{
			return BadRequest("Начало периода должно быть раньше окончания");
		}

		Enum.TryParse<Attendance>(attendanceName, out var attendance);

		var schoolId = User.Claims.GetSchoolId();
		var marksQuery = _markRepository
			.Items
			.Where(m => m.Lesson.Subject.SchoolId == schoolId && m.Attendance == attendance)
			.Where(m => m.Lesson.Date >= start && m.Lesson.Date <= end);

		int totalStudents;
		List<Mark> marks;
		if (groupId is not null)
		{
			marks = await marksQuery
				.Where(m => m.Lesson.GroupId == groupId)
				.ToListAsync();
			totalStudents = (await _groupRepository
					.GetAsync(groupId.Value))
				.Students
				.Count();
		}
		else
		{
			marks = await marksQuery.ToListAsync();
			totalStudents = (await _userRepository.GetUsersInSchoolByRoleAsync(schoolId, Role.Student))
				.Count;
		}

		var results = new Dictionary<DateOnly, double>();

		while (start <= end)
		{
			var count = marks
				.Where(m => m.Lesson.Date == start)
				.GroupBy(m => m.StudentId)
				.Count();

			results[start.Value] = Math.Round(100.0 * count / totalStudents, 2);
			
			start = start.Value.AddDays(1);
		}

		return Ok(new StatisticsDto
		{
			MinimumStartDate = quarters.First().Start,
			MaximumEndDate = quarters.Last().End,
			Statistics = results
		});
	}
}