using DigitalDiary.Controllers.Dto.Subjects;
using DigitalDiary.Controllers.Dto.Users;

namespace DigitalDiary.Controllers.Dto.Schedule;

public static class ScheduleDtoExtensions
{
	public static ScheduleDto MapScheduleToDto(this IEnumerable<Domain.Entities.Schedule> schedule, int groupId)
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
			GroupId = groupId,
			Items = daySchedule
		};
	}
}