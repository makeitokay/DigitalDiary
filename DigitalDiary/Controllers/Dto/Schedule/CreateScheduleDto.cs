namespace DigitalDiary.Controllers.Dto.Schedule;

public class CreateScheduleDto
{
	public int GroupId { get; set; }
	public int SubjectId { get; set; }
	public int TeacherId { get; set; }
	public int Order { get; set; }
	public DayOfWeek DayOfWeek { get; set; }
}