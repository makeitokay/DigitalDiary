using DigitalDiary.AuthorizationAttributes;
using DigitalDiary.Controllers.Dto.Schedule;
using Domain.Entities;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DigitalDiary.Controllers;

[Route("schedule")]
[AuthorizeByRole(Role.Teacher | Role.SchoolAdmin)]
public class ScheduleController : ControllerBase
{
	private readonly IRepository<Schedule> _scheduleRepository;

	public ScheduleController(IRepository<Schedule> scheduleRepository)
	{
		_scheduleRepository = scheduleRepository;
	}

	[HttpGet]
	public async Task<IActionResult> GetScheduleAsync([FromQuery] int? groupId)
	{
		if (groupId is null)
		{
			return BadRequest();
		}

		var schedule = await _scheduleRepository
			.Items
			.Where(s => s.GroupId == groupId)
			.ToListAsync();

		var dto = schedule.MapScheduleToDto(groupId.Value);

		return Ok(dto);
	}

	[HttpPost]
	[AuthorizeByRole(Role.SchoolAdmin)]
	public async Task<IActionResult> CreateScheduleAsync([FromBody] CreateScheduleDto dto)
	{
		var collision = await _scheduleRepository
			.Items
			.Where(s =>
				s.DayOfWeek == dto.DayOfWeek
				&& s.TeacherId == dto.TeacherId
				&& s.Order == dto.Order
				&& s.GroupId != dto.GroupId)
			.ToListAsync();

		if (collision.Any())
		{
			var firstCollision = collision.First();
			return BadRequest(
				$"У этого учителя уже занят этот слот уроком \"{firstCollision.Subject.Name}\" у класса \"{firstCollision.Group}\"");
		}
		
		var existingSchedule = await _scheduleRepository
			.Items
			.Where(s => s.DayOfWeek == dto.DayOfWeek && s.GroupId == dto.GroupId && s.Order == dto.Order)
			.SingleOrDefaultAsync();

		if (existingSchedule is not null)
		{
			existingSchedule.SubjectId = dto.SubjectId;
			existingSchedule.TeacherId = dto.TeacherId;

			await _scheduleRepository.UpdateAsync(existingSchedule);
		}
		else
		{
			var schedule = new Schedule
			{
				DayOfWeek = dto.DayOfWeek,
				GroupId = dto.GroupId,
				SubjectId = dto.SubjectId,
				Order = dto.Order,
				TeacherId = dto.TeacherId
			};

			await _scheduleRepository.CreateAsync(schedule);
		}

		return Ok();
	}
}