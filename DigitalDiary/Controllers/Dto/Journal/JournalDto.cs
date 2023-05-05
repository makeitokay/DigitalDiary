namespace DigitalDiary.Controllers.Dto.Journal;

public class JournalDto
{
	public int SelectedMonth { get; set; }
	public IEnumerable<JournalItemDto> Items { get; set; }
}

public class JournalItemDto
{
	public DateOnly Date { get; set; }
	public int Order { get; set; }
	public Dictionary<int, string> Marks { get; set; } = default!;
}