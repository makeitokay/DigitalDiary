using DigitalDiary.AuthorizationAttributes;
using DigitalDiary.Controllers.Dto;
using DigitalDiary.Controllers.Dto.Reports;
using Domain.Entities;
using Infrastructure.Extensions;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DigitalDiary.Controllers;

[Route("reports")]
[AuthorizeByRole(Role.Parent | Role.Student)]
public class ReportsController : ControllerBase
{
	private readonly IUserRepository _userRepository;
	private readonly IRepository<Lesson> _lessonRepository;

	public ReportsController(
		IUserRepository userRepository,
		IRepository<Lesson> lessonRepository)
	{
		_userRepository = userRepository;
		_lessonRepository = lessonRepository;
	}

	public async Task<IActionResult> GetReportAsync([FromQuery] int? childId, [FromQuery(Name = "quarter")] int? quarterNumber)
	{
		var availableQuarters = DateTimeHelper
			.GetAvailableQuarters()
			.ToList();
		quarterNumber ??= DateTimeHelper.GetCurrentQuarterNumber();

		var quarter = availableQuarters[quarterNumber.Value - 1];
		
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
		
		var lessons = await _lessonRepository
			.Items
			.Where(l =>
				l.GroupId == student.GroupId
				&& quarter.Start <= l.Date && l.Date <= quarter.End)
			.ToListAsync();

		var results = new Dictionary<string, ReportSubjectDto>();

		foreach (var group in lessons.GroupBy(l => l.Subject))
		{
			var marks = Enumerable
				.Range(1, 5)
				.ToDictionary(i => i, i => 0);
			foreach (var markGroup in group
				         .SelectMany(g => g.Marks)
				         .Where(m => m.StudentId == student.Id)
				         .GroupBy(m => m.Value)
				         .Where(g => g.Key is not null))
			{
				marks[markGroup.Key!.Value] = markGroup.Count();
			}

			var totalMarks = marks.Values.Sum();
			var average = marks.Sum(m => 1.0 * m.Key * m.Value / totalMarks);

			results[group.Key.Name] = new ReportSubjectDto
			{
				MarksCount = marks,
				AverageMark = Math.Round(average, 2)
			};
		}

		return Ok(new ReportDto
		{
			AvailableQuarters = Enumerable.Range(1, availableQuarters.Count).Select(i => new DateOnlyRangeDto
			{
				Start = availableQuarters[i - 1].Start,
				End = availableQuarters[i - 1].End,
				Number = i
			}),
			Items = results
		});
	}
}