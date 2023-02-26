namespace DigitalDiary.Controllers.Dto.Journal;

public class LessonDto
{
	public Dictionary<int, MarkDto> Marks { get; set; } = default!;
	public string Homework { get; set; } = default!;
}

public class MarkDto
{
	public int? Mark { get; set; }
	public string? Attendance { get; set; } = default!;
}