namespace DigitalDiary.Controllers.Dto.Announcements;

public class AnnouncementDto
{
	public string Header { get; set; } = default!;
	public string Text { get; set; } = default!;
	public string AuthorName { get; set; } = default!;
	public string CreatedAtUtc { get; set; }
}