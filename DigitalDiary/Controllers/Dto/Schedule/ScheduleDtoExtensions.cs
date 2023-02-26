namespace DigitalDiary.Controllers.Dto.Schedule;

public static class ScheduleDtoExtensions
{
	public static ScheduleDto MapScheduleToDto(this IEnumerable<Domain.Entities.Schedule> schedule)
	{
		var daySchedule = schedule
			.GroupBy(s => s.DayOfWeek)
			.Select(s => new DayScheduleDto
			{
				DayOfWeek = s.Key,
				Items = s
					.Select(item => new DayScheduleItemDto
					{
						Order = item.Order,
						SubjectId = item.SubjectId,
						TeacherId = item.TeacherId
					})
			});

		return new ScheduleDto
		{
			Items = daySchedule
		};
	}
}