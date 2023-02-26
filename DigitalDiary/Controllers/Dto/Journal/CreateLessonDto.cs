namespace DigitalDiary.Controllers.Dto.Journal;

public class CreateLessonDto : LessonDto
{
	public int SubjectId { get; set; }
	public int GroupId { get; set; }
	public int Order { get; set; }
	public DateOnly Date { get; set; }
}