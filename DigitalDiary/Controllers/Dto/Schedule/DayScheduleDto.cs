namespace DigitalDiary.Controllers.Dto.Schedule;

public class DayScheduleDto
{
	public DayOfWeek DayOfWeek { get; set; }
	
	public IEnumerable<DayScheduleItemDto> Items { get; set; } = default!;
}