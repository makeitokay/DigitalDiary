namespace DigitalDiary.Controllers.Dto.Journal;

public class JournalDto
{
	public DateOnly Date { get; set; }
	public int Order { get; set; }
	public Dictionary<int, string> Marks { get; set; } = default!;
}