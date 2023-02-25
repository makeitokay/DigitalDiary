using Domain.Entities;

namespace DigitalDiary.Controllers.Dto.Announcements;

public class CreateAnnouncementDto
{
	public string Header { get; set; } = default!;
	public string Text { get; set; } = default!;
	public AnnouncementScope Scope { get; set; } = default!;
}