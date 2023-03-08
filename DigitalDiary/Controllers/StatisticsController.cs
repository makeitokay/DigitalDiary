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

	public StatisticsController(IRepository<Mark> markRepository)
	{
		_markRepository = markRepository;
	}

	[HttpGet]
	public async Task<IActionResult> GetStatisticsAsync(
		[FromQuery] int? groupId,
		[FromQuery] int? teacherId,
		[FromQuery] int? subjectId,
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

		while (start < end)
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
}