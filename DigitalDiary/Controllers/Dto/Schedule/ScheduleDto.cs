namespace DigitalDiary.Controllers.Dto.Schedule;

public class ScheduleDto
{
	public IEnumerable<DayScheduleDto> Items { get; set; } = default!;
}