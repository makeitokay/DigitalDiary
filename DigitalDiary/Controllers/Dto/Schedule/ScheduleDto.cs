namespace DigitalDiary.Controllers.Dto.Schedule;

public class ScheduleDto
{
	public int GroupId { get; set; }
	
	public IEnumerable<DayScheduleDto> Items { get; set; } = default!;
}